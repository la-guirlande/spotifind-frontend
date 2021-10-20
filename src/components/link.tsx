import { AnchorHTMLAttributes, FC } from 'react';
import { Link as ReactRouterLink, LinkProps as ReactRouterLinkProps } from 'react-router-dom';
import { VariantProps } from '../util/prop-types';

/**
 * Link props.
 */
export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement>, ReactRouterLinkProps, VariantProps {}

/**
 * Link component. 
 */
export const Link: FC<LinkProps> = ({ variant, children, ...props }) => {
  let className;
  switch (variant) {
    default:
    case 'primary':
      className = 'text-primary hover:text-primary-light';
      break;
    case 'secondary':
      className = 'text-secondary hover:text-secondary-light';
      break;
    case 'light':
    case 'dark':
      className = 'text-dark dark:text-light';
      break;
    case 'info':
      className = 'text-info hover:text-info-light';
      break;
    case 'warn':
      className = 'text-warn hover:text-warn-light';
      break;
    case 'error':
      className = 'text-error hover:text-error-light';
      break;
  }
  return <ReactRouterLink className={`rounded-full font-gotham-bold transform hover:scale-105 focus:scale-100 transition duration-50 ${className}`} {...props}>{children}</ReactRouterLink>
}

Link.defaultProps = {
  variant: 'primary'
}
