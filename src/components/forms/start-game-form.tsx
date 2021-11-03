import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { SpotifyPlaylistData } from '../../util/data-types';
import { Button } from '../button';
import { Slider } from './slider';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Loader } from '../loader';

export interface StartGameFormProps {
  playlists: SpotifyPlaylistData[];
  totalPlaylists: number;
  onSubmit?: (data: StartGameFormValues) => void;
  onLeave?: () => void;
  onFetchMorePlaylists?: () => void;
}

export interface StartGameFormValues {
  playlistId: string;
  shuffle: boolean;
}

export const StartGameForm: FC<StartGameFormProps> = ({ playlists, totalPlaylists, onSubmit, onLeave, onFetchMorePlaylists }) => {
  const { register, watch, handleSubmit, formState: { errors } } = useForm<StartGameFormValues>({
    defaultValues: { playlistId: '', shuffle: true }
  });
  const playlistIdRegister = register('playlistId', {
    required: { value: true, message: 'Playlist is required' }
  });
  const shuffleRegister = register('shuffle');
  const watchPlaylistId = watch('playlistId');
  const watchShuffle = watch('shuffle');

  return (
    <form onSubmit={handleSubmit(data => onSubmit(data))}>
      <Slider id="shuffle" label="Shuffle" checked={watchShuffle} {...shuffleRegister} />
      <InfiniteScroll
        dataLength={playlists.length}
        next={onFetchMorePlaylists}
        hasMore={playlists.length < totalPlaylists}
        loader={<Loader />}
      >
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
          {playlists.map((playlist, i) => (
            <div key={i} className="p-2">
              <input id={`${playlistIdRegister.name}${i}`} type="radio" value={playlist.id} {...playlistIdRegister} hidden />
              <label htmlFor={`${playlistIdRegister.name}${i}`}>
                <div className={`h-full rounded-md ${watchPlaylistId === playlist.id ? 'bg-green-500' : 'bg-dark'} transform hover:scale-105 transition-transform hover:cursor-pointer`}>
                  <div className="p-4 space-y-2">
                    <img src={playlist.images[0].url} className="w-full h-40 object-cover rounded-md pointer-events-none" />
                    <h3 className="text-base text-white font-bold">{playlist.name}</h3>
                  </div>
                </div>
              </label>
            </div>
          ))}
        </div>
      </InfiniteScroll>
      <div className="flex justify-between">
        <Button type="submit" variant="primary" className="w-1/3">Start</Button>
        <Button variant="error" outline className="w-1/3" onClick={onLeave}>Leave</Button>
      </div>
    </form>
  );
}

StartGameForm.defaultProps = {
  onSubmit: () => {},
  onLeave: () => {},
  onFetchMorePlaylists: () => {}
}
