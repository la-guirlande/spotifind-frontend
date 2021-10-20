import { FC, HTMLAttributes } from 'react';
import { VariantProps } from '../util/prop-types';

/**
 * Badge component props.
 */
export interface BadgeProps extends HTMLAttributes<HTMLSpanElement>, VariantProps {}

/**
 * Badge component.
 */
export const Badge: FC<BadgeProps> = ({ children, className, variant, ...props }) => (
  <span className={`p-1 rounded-md bg-${variant} text-white ${className}`} {...props}>{children}</span>
);
