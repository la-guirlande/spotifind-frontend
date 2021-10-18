import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC } from 'react';

/**
 * Form error message component.
 */
export const ErrorMessage: FC = (props) => (
  <div className="text-error">
    <FontAwesomeIcon icon="exclamation-circle" /> <small>{props.children}</small>
  </div>
);
