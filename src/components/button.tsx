import { ButtonHTMLAttributes, FC } from 'react';
import { VariantProps } from '../util/prop-types';

/**
 * Button props.
 */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps {
  outline?: boolean;
}

/**
 * Button component. 
 */
export const Button: FC<ButtonProps> = ({ className, variant, outline, children, ...props }) => {
  let variantClassName;
  switch (variant) {
    default:
    case 'primary':
      if (outline) {
        variantClassName = 'text-primary hover:bg-primary-light hover:border-primary-light hover:text-light';
      } else {
        variantClassName = 'bg-primary text-light hover:bg-opacity-70';
      }
      break;
    case 'secondary':
      if (outline) {
        variantClassName = 'text-secondary hover:bg-secondary-light hover:border-secondary-light hover:text-dark';
      } else {
        variantClassName = 'bg-secondary text-dark hover:bg-opacity-70';
      }
      break;
    case 'light':
      if (outline) {
        variantClassName = 'text-dark dark:border-light dark:text-light';
      } else {
        variantClassName = 'bg-light text-dark hover:bg-opacity-70'
      }
      break;
    case 'dark':
      if (outline) {
        variantClassName = 'text-dark dark:border-light dark:text-light';
      } else {
        variantClassName = 'bg-dark text-light hover:bg-opacity-70'
      }
      break;
    case 'info':
      if (outline) {
        variantClassName = 'text-info hover:bg-info-light hover:border-info-light hover:text-light';
      } else {
        variantClassName = 'bg-info text-light hover:bg-opacity-70';
      }
      break;
    case 'warn':
      if (outline) {
        variantClassName = 'text-warn hover:bg-warn-light hover:border-warn-light hover:text-light';
      } else {
        variantClassName = 'bg-warn text-light hover:bg-opacity-70';
      }
      break;
    case 'error':
      if (outline) {
        variantClassName = 'text-error hover:bg-error-light hover:border-error-light hover:text-light';
      } else {
        variantClassName = 'bg-error text-light hover:bg-opacity-70';
      }
      break;
  }
  return <button className={`px-8 py-1 rounded-sm transform hover:scale-105 focus:scale-100 transition duration-50 disabled:scale-100 disabled:bg-gray-700 disabled:bg-opacity-50 disabled:cursor-not-allowed ${variantClassName} ${className || ''}`} {...props}>{children}</button>
}

Button.defaultProps = {
  variant: 'primary',
  outline: false
}
