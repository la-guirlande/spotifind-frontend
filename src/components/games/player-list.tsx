import { FC, TableHTMLAttributes } from 'react';
import { PlayerData } from '../../util/data-types';

/**
 * Players list component props.
 */
export interface PlayerListProps extends TableHTMLAttributes<HTMLTableElement> {
  players: PlayerData[];
}

/**
 * Players list component.
 * 
 */
export const PlayerList: FC<PlayerListProps> = ({ children, className, players, ...props }) => (
  <table className={className} {...props}>
    <thead>
      <tr>
        <th>Player</th>
        <th>Score</th>
      </tr>
    </thead>
    <tbody>
    {players.map((player, i) => (
      <tr key={i}>
        <td>{player.name}</td>
        <td>{player.score}</td>
      </tr>
    ))}
    </tbody>
  </table>
);
