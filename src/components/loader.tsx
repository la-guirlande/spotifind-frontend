import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC, HTMLAttributes } from 'react';

/**
 * Loader component.
 */
export const Loader: FC<HTMLAttributes<HTMLOrSVGElement>> = ({ className, ...props }) => (
  <FontAwesomeIcon icon="spinner" className={`animate-spin ${className}`} {...props} />
);
