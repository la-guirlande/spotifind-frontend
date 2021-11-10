import { useEffect, useState } from 'react';
import { Config } from '../util/configuration';
import { LocalStorageKey } from '../util/local-storage';
import { SpotifyPlayerCallback, WebPlaybackPlayer, WebPlaybackState } from '../util/player-types';
import { Response } from '../util/response-types';
import { Status, useQuery } from './query-hook';

export const usePlayer = () => {
  const [playerState, setPlayerState] = useState<WebPlaybackState>(null);
  const [player, setPlayer] = useState<WebPlaybackPlayer>(null);
  const [deviceId, setDeviceId] = useState<string>(null);
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
    switch (updatePlayerQuery.status) {
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
    player.addListener('not_ready', (err) => console.error('Player not ready :', err));
    player.addListener('player_state_changed', setPlayerState);
    player.addListener('initialization_error', (err) => console.error('Player not initialized :', err));
    player.addListener('authentication_error', (err) => console.error('Player not authenticated :', err));
    player.addListener('account_error', (err) => console.error('Player account ready :', err));
    player.addListener('playback_error', (err) => console.error('Player playback error :', err));

    player.connect();

    setPlayer(player);
  }

  const loadPlayer = async (): Promise<void> => {
    return await new Promise<void>((resolve, reject) => {
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
        document.body.appendChild(script);
      } else {
        resolve();
      }
    });
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

  const togglePlay = async () => {
    await player.togglePlay();
  }

  const next = async () => {
    // updatePlayerQuery.post(`${Config.SPOTIFY_API_URL}/me/player/next?device_id=${deviceId}`, {}, { headers: { Authorization: `Bearer ${localStorage.getItem(LocalStorageKey.SPOTIFY_ACCESS_TOKEN)}` } });
    await player.nextTrack();
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

  return { state: playerState, prepare, play, pause, togglePlay, next, volume, seek };
}
