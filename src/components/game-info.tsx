import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC, useMemo } from 'react';
import { GameData, GameStatus } from '../util/data-types';

/**
 * Game informations component props.
 */
export interface GameInfoprops {
  game: GameData;
}

/**
 * Game informations component.
 */
export const GameInfo: FC<GameInfoprops> = ({ game }) => {
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
      <div className="col-span-3 text-center font-bold">
        <h2>Game found : <span className="p-1 rounded-md bg-info-dark border-2 border-primary">{game.code}</span></h2>
      </div>
      <div className="flex flex-col">
        <div>
          <FontAwesomeIcon icon="arrow-right" /> <span className="font-bold">Status</span> : {status}
        </div>
      </div>
      <div className="col-span-2">
        <table className="w-full text-center">
          <thead>
            <tr>
              <th>Player</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
          {game.players.map((player, i) => (
            <tr key={i}>
              <td>{player.name}</td>
              <td>{player.score}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
