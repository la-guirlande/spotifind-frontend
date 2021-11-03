import { useEffect, useState } from 'react';
import { Config } from '../util/configuration';
import { SpotifyPlayerData } from '../util/data-types';
import { LocalStorageKey } from '../util/local-storage';
import { SpotifyPlayerCallback, WebPlaybackError, WebPlaybackPlayer } from '../util/player-types';
import { Response, SpotifyPlayerResponse } from '../util/response-types';
import { Status, useQuery } from './query-hook';

export const usePlayer = () => {
  const [state, setState] = useState<SpotifyPlayerData>(null);
  const [player, setPlayer] = useState<WebPlaybackPlayer>(null);
  const [deviceId, setDeviceId] = useState<string>(null);
  const playerQuery = useQuery<SpotifyPlayerResponse>();
  const updatePlayerQuery = useQuery<Response>();

  useEffect(() => {
    if (!(window as any).onSpotifyWebPlaybackSDKReady) {
      (window as any).onSpotifyWebPlaybackSDKReady = initPlayer;
    } else {
      initPlayer();
    }
    loadPlayer();
    return () => {
      if (player != null) {
        player.disconnect();
      }
    }
  }, []);

  useEffect(() => {
    switch (playerQuery.status) {
      case Status.INIT:
        updateState();
        break;
      case Status.SUCCESS:
        setState(playerQuery.response);
        break;
      case Status.ERROR:
        console.error('Could not get Spotify player :', playerQuery.errorResponse.errors);
        break;
    }
  }, [playerQuery.status]);

  useEffect(() => {
    switch (updatePlayerQuery.status) {
      case Status.SUCCESS:
        updateState();
        break;
      case Status.ERROR:
        console.error(updatePlayerQuery.errorResponse);
        break;
    }
  }, [updatePlayerQuery.status]);

  const initPlayer = () => {
    const player = new (window as any).Spotify.Player({
      getOAuthToken: (cb: SpotifyPlayerCallback) => cb(localStorage.getItem(LocalStorageKey.SPOTIFY_ACCESS_TOKEN)),
      name: 'Spotifind',
      volume: 0
    }) as WebPlaybackPlayer;

    player.addListener('ready', ({ device_id }) => {
      setDeviceId(device_id);
      update('lead', device_id);
    });
    player.addListener('not_ready', console.log);
    player.addListener('player_state_changed', console.log);
    player.addListener('initialization_error', console.error);
    player.addListener('authentication_error', console.error);
    player.addListener('account_error', console.error);
    player.addListener('playback_error', console.error);

    player.connect();

    setPlayer(player);
  }

  const loadPlayer = (): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      const scriptTag = document.getElementById('spotify-player');
      if (scriptTag == null) {
        const script = document.createElement('script');
        script.id = 'spotify-player';
        script.type = 'text/javascript';
        script.async = false;
        script.defer = true;
        script.src = 'https://sdk.scdn.co/spotify-player.js';
        script.onload = () => resolve();
        script.onerror = err => reject(err);
        document.head.appendChild(script);
      } else {
        resolve();
      }
    });
  }

  const updateState = () => {
    playerQuery.get(`${Config.SPOTIFY_API_URL}/me/player`, { headers: { Authorization: `Bearer ${localStorage.getItem(LocalStorageKey.SPOTIFY_ACCESS_TOKEN)}` } });
  }

  const prepare = (playlistId: string) => {
    update('prepare', playlistId);
  }

  const play = async () => {
    await player.resume();
  }

  const pause = async () => {
    await player.pause();
  }

  const next = () => {
    // updatePlayerQuery.post(`${Config.SPOTIFY_API_URL}/me/player/next?device_id=${deviceId}`, {}, { headers: { Authorization: `Bearer ${localStorage.getItem(LocalStorageKey.SPOTIFY_ACCESS_TOKEN)}` } });
    player.resume();
  }

  const volume = async (volume?: number): Promise<number> => {
    if (volume != null) {
      player.setVolume(volume);
    }
    return await player.getVolume() as number;
  }

  const seek = async (position?: number): Promise<void> => {
    if (position != null) {
      await player.seek(position);
    }
  }

  const update = (type: 'lead' | 'prepare', ...args: unknown[]) => {
    switch (type) {
      case 'lead': // args[0] = device_id
        updatePlayerQuery.put(`${Config.SPOTIFY_API_URL}/me/player`, {
          device_ids: [args[0]],
          play: false
        }, { headers: { Authorization: `Bearer ${localStorage.getItem(LocalStorageKey.SPOTIFY_ACCESS_TOKEN)}` } });
        break;
      case 'prepare': // args[0] = playlistId
        updatePlayerQuery.put(`${Config.SPOTIFY_API_URL}/me/player/play`, {
          context_uri: `spotify:playlist:${args[0]}`
        }, { headers: { Authorization: `Bearer ${localStorage.getItem(LocalStorageKey.SPOTIFY_ACCESS_TOKEN)}` } });
        break;
    }
  }

  return { state, updateState, prepare, play, pause, next, volume, seek };
}
