import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC, useMemo } from 'react';
import { GameData, GameStatus } from '../../util/data-types';
import { Badge } from '../badge';
import { Loader } from '../loader';
import { PlayerList } from './player-list';

/**
 * Game informations component props.
 */
export interface GameInfoprops {
  game?: GameData;
  loading?: boolean;
}

/**
 * Game informations component.
 */
export const GameInfo: FC<GameInfoprops> = ({ game, loading }) => {
  const status = useMemo(() => {
    switch (game.status) {
      case GameStatus.INIT:
        return (
          <span><FontAwesomeIcon icon="circle" className="text-green-500"></FontAwesomeIcon> Open</span>
        );
      case GameStatus.IN_PROGRESS:
        return (
          <span><FontAwesomeIcon icon="circle" className="text-yellow-500"></FontAwesomeIcon> In progress</span>
        );
      case GameStatus.FINISHED:
        return (
          <span><FontAwesomeIcon icon="circle" className="text-red-500"></FontAwesomeIcon> Finished</span>
        );
      default:
        return (
          <span><FontAwesomeIcon icon="circle" className="text-gray-500"></FontAwesomeIcon> Unknown</span>
        );
    }
  }, [game.status]);

  return (
    <div className="grid grid-cols-3 gap-5 p-5 rounded-lg bg-light dark:bg-dark border-2 border-dark dark:border-light">
      <div className="col-span-3 flex justify-between font-bold">
        <h2>Game informations</h2>
        <Badge variant="info">{game.code}</Badge>
      </div>
      <div className="flex flex-col">
        <div>
          <FontAwesomeIcon icon="arrow-right" /> <span className="font-bold">Status</span> : {status}
        </div>
        <div>
          <FontAwesomeIcon icon="arrow-right" /> <span className="font-bold">Players</span> : {game.players.length}
        </div>
      </div>
      <div className="col-span-2">
        <PlayerList className="w-full text-center" players={game.players} />
      </div>
    </div>
  );
}

GameInfo.defaultProps = {
  game: {
    id: '-1',
    status: null,
    code: '000000',
    players: []
  },
  loading: false
}
