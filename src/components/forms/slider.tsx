import { forwardRef, InputHTMLAttributes } from 'react';

/**
 * Slider props.
 */
export interface SliderProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

/**
 * Slider component.
 */
export const Slider = forwardRef<HTMLInputElement, SliderProps>(({ id, label, checked, ...props }, ref) => (
  <>
    <input ref={ref} type="checkbox" {...props} hidden />
    <label htmlFor={id}>
      <div className="flex flex-row space-x-2">
        <div className={`w-16 h-6 p-0.5 rounded-full ${checked ? 'bg-green-500' : 'bg-dark'} cursor-pointer`}>
          <div className={`w-1/2 h-full rounded-full bg-white transform ${checked ? 'translate-x-full' : 'translate-x-0'} transition-transform`}></div>
        </div>
        {label && <div>{label}</div>}
      </div>
    </label>
  </>
));
