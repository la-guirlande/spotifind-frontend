import { FC, HTMLAttributes } from 'react';

export interface FooterProps extends HTMLAttributes<HTMLDivElement> {}

/**
 * Footer component.
 */
export const Footer: FC<FooterProps> = ({ className, ...props }) => (
  <div className={className}>
    <p>Footer</p>
  </div>
);
