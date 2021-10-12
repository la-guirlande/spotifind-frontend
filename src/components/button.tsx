import { ButtonHTMLAttributes, FC } from 'react';
import { Variant } from '../types/styles';

/**
 * Button props.
 */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  outline?: boolean;
}

/**
 * Button component. 
 */
export const Button: FC<ButtonProps> = ({ variant, outline, children, ...props }) => {
  let className;
  switch (variant) {
    default:
    case 'primary':
      if (outline) {
        className = 'border-primary text-primary hover:bg-primary-light hover:border-primary-light hover:text-light';
      } else {
        className = 'bg-primary text-light hover:bg-primary-light';
      }
      break;
    case 'secondary':
      if (outline) {
        className = 'border-secondary text-secondary hover:bg-secondary-light hover:border-secondary-light hover:text-dark';
      } else {
        className = 'bg-secondary text-dark hover:bg-secondary-light';
      }
      break;
    case 'light':
      if (outline) {
        className = 'border-dark text-dark dark:border-light dark:text-light';
      } else {
        className = 'bg-light text-dark'
      }
      break;
    case 'dark':
      if (outline) {
        className = 'border-dark text-dark dark:border-light dark:text-light';
      } else {
        className = 'bg-dark text-light'
      }
      break;
    case 'info':
      if (outline) {
        className = 'border-info text-info hover:bg-info-light hover:border-info-light hover:text-light';
      } else {
        className = 'bg-info text-light hover:bg-info-light';
      }
      break;
    case 'warn':
      if (outline) {
        className = 'border-warn text-warn hover:bg-warn-light hover:border-warn-light hover:text-light';
      } else {
        className = 'bg-warn text-light hover:bg-warn-light';
      }
      break;
    case 'error':
      if (outline) {
        className = 'border-error text-error hover:bg-error-light hover:border-error-light hover:text-light';
      } else {
        className = 'bg-error text-light hover:bg-error-light';
      }
      break;
  }
  return <button className={`px-8 py-1 rounded-full border-1 border-gray-400 font-gotham-bold transform hover:scale-105 focus:scale-100 transition duration-50 ${className}`} {...props}>{children}</button>
}

Button.defaultProps = {
  variant: 'primary',
  outline: false
}