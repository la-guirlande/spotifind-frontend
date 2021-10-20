import { FC } from 'react';
import { SubmitErrorHandler, useForm } from 'react-hook-form';
import { Config } from '../../util/configuration';
import { Button } from '../button';
import { ErrorMessage } from './error-message';

/**
 * Join game form component props.
 */
export interface JoinGameFormProps {
  preloaded?: boolean;
  onPreload?: (code: string) => void;
  onSubmit?: (data: JoinGameFormValues) => void;
  onError?: (data: any) => void;
}

/**
 * Join game form values.
 */
export interface JoinGameFormValues {
  code: string;
}

/**
 * Join game form component.
 */
export const JoinGameForm: FC<JoinGameFormProps> = (props) => {
  const { register, handleSubmit, formState: { errors } } = useForm<JoinGameFormValues>({
    defaultValues: { code: '' }
  });
  const { onChange: onCodeChange, ...codeRest } = register('code', {
    required: { value: true, message: 'Code is required' },
    maxLength: { value: Config.CODE_LENGTH, message: `Code has only ${Config.CODE_LENGTH} characters` },
    pattern: { value: /^\d+$/, message: 'Code can only contains digits' }
  });

  return (
    <form className="flex flex-row" onSubmit={handleSubmit(data => props.onSubmit(data), data => props.onError(data))}>
      <input
        type="text"
        className="w-18 appearance-none border-none rounded-l-sm outline-none bg-white text-black placeholder-gray-400 dark:placeholder-gray-600 border-2 border-transparent focus:border-primary-light transition-border"
        placeholder="Code"
        maxLength={Number(Config.CODE_LENGTH)}
        {...codeRest}
        onChange={(e) => {
          onCodeChange(e);
          props.onPreload(e.target.value);
        }}
      />
      {errors.code && <ErrorMessage>{errors.code.message}</ErrorMessage>}
      <Button type="submit" variant="dark" className="rounded-r-sm" disabled={!props.preloaded}>Join game</Button>
    </form>
  );
}

JoinGameForm.defaultProps = {
  preloaded: false,
  onPreload: () => {},
  onSubmit: () => {},
  onError: () => {}
}
