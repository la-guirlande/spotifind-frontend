import _ from 'lodash';
import { FC, useContext, useEffect, useMemo, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { Button } from '../components/button';
import { JoinGameForm, JoinGameFormValues } from '../components/forms/join-game-form';
import { StartGameForm, StartGameFormValues } from '../components/forms/start-game-form';
import { GameInfo } from '../components/games/game-info';
import { AuthenticationContext } from '../contexts/authentication-context';
import { useGame } from '../hooks/game-hook';
import { useMediaQuery } from '../hooks/media-query-hook';
import { usePlayer } from '../hooks/player-hook';
import { Status, useQuery } from '../hooks/query-hook';
import { Config } from '../util/configuration';
import { GameStatus, SpotifyPlaylistData, WebsocketJoinServerToClientEvent, WebsocketStartServerToClientEvent } from '../util/data-types';
import { LocalStorageKey } from '../util/local-storage';
import { GamesResponse, SpotifyPlaylistsResponse } from '../util/response-types';

/**
 * Game container.
 * 
 */
export const GameContainer: FC = () => {
  const mediaQuery = useMediaQuery();
  const { authUser } = useContext(AuthenticationContext);
  const history = useHistory();
  const preloadGameQuery = useQuery<GamesResponse>();
  const playlistsQuery = useQuery<SpotifyPlaylistsResponse>();
  const player = usePlayer();
  const [loadedPlaylists, setLoadedPlaylists] = useState<SpotifyPlaylistData[]>([]);
  const gameHook = useGame(localStorage.getItem(LocalStorageKey.GAME_TOKEN));
  
  const preloaded = useMemo(() => preloadGameQuery.status === Status.SUCCESS && preloadGameQuery.response.games.length === 1, [preloadGameQuery.status]);

  useEffect(() => console.log('Update current game :', gameHook.game), [gameHook.game]);

  useEffect(() => {
    switch (preloadGameQuery.status) {
      case Status.SUCCESS:
        console.log(preloadGameQuery.response.games);
        break;
      case Status.ERROR:
        console.error('Could not preload game :', preloadGameQuery.errorResponse.errors);
        break;
    }
  }, [preloadGameQuery.status]);

  useEffect(() => {
    switch (gameHook.game?.status) {
      case GameStatus.INIT:
        switch (playlistsQuery.status) {
          case Status.INIT:
            handleFetchMorePlaylists();
            break;
          case Status.SUCCESS:
            setLoadedPlaylists(oldState => [...oldState, ...playlistsQuery.response.items]);
            break;
          case Status.ERROR:
            console.error(playlistsQuery.errorResponse.errors);
            break;
        }
        break;
      case GameStatus.TIMER_BETWEEN:
        player.prepare(gameHook.game.playlistId);
        player.volume(1);
        player.togglePlay();
        break;
    }
  }, [gameHook.game?.status, playlistsQuery.status]);

  const handleCreateGame = () => {
    gameHook.create(authUser.display_name);
  }

  const handlePreloadGame = (code: string) => {
    preloadGameQuery.get(`${Config.API_URL}/games?code=${code}`);
  }

  const handleJoinGame = (data: JoinGameFormValues) => {
    gameHook.join(data.code);
  }

  const handleFetchMorePlaylists = () => {
    const limit =
      mediaQuery === 'sm' ? 10 :
      mediaQuery === 'xl' ? 25 : 15;
    playlistsQuery.get(`${Config.SPOTIFY_API_URL}/me/playlists?limit=${loadedPlaylists.length === 0 ? limit * 3 : limit}&offset=${loadedPlaylists.length}`, { headers: { Authorization: `Bearer ${localStorage.getItem(LocalStorageKey.SPOTIFY_ACCESS_TOKEN)}` } });
  }

  const handleLeaveGame = () => {
    gameHook.leave();
    localStorage.removeItem(LocalStorageKey.GAME_TOKEN);
    history.push('/');
  }

  const handleStartGame = (data: StartGameFormValues) => {
    gameHook.start(data.playlistId, data.shuffle);
  }
  
  return (
    <div className="flex flex-col px-4">
    {gameHook.game == null &&
      <>
        <div className="flex flex-row justify-between">
            <Button variant="dark" onClick={handleCreateGame}>Create new game</Button>
            <span className="text-xl font-bold">OR</span>
            <JoinGameForm preloaded={preloaded} onPreload={handlePreloadGame} onSubmit={handleJoinGame} onError={console.error} />
        </div>
      </>
    }
    {gameHook.game?.status === GameStatus.INIT &&
      <>
        <div className="flex flex-col space-y-2">
          <GameInfo game={gameHook.game} />
          <StartGameForm playlists={loadedPlaylists} totalPlaylists={playlistsQuery?.response?.total || 0} onSubmit={handleStartGame} onLeave={handleLeaveGame} onFetchMorePlaylists={handleFetchMorePlaylists} />
        </div>
      </>
    }
    {gameHook.game?.status === GameStatus.TIMER_BETWEEN &&
      <>IN PROGRESS
        <h3>{player.state && player.state.track_window.current_track.name}</h3>
        De
        <ul>
          {player.state && player.state.track_window.current_track.artists.map((artist, i) => <li key={i}>{artist.name}</li>)}
        </ul>
        <Button variant="warn" onClick={() => { player.next(); player.togglePlay(); }}>Next</Button>
      </>
    }
    {gameHook.game?.status === GameStatus.FINISHED &&
      <>FINISHED
        {/* Game finished (stats, leaderboard, ...) */}
      </>
    }
    </div>
  );
}
