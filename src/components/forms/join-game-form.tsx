import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { Config } from '../../util/configuration';
import { Button } from '../button';
import { ErrorMessage } from './error-message';

/**
 * Join game form component props.
 */
export interface JoinGameFormProps {
  preloaded?: boolean;
  onPreload?: (code: string) => void;
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
    <form className="flex flex-row space-x-2" onSubmit={handleSubmit(data => console.log(data), data => console.error(data))}>
      <input
        type="text"
        className="w-18 appearance-none rounded-lg outline-none bg-white dark:bg-black text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-600 border-2 border-transparent focus:border-primary-light transition-border"
        placeholder="Code"
        maxLength={Number(Config.CODE_LENGTH)}
        {...codeRest}
        onChange={(e) => {
          onCodeChange(e);
          props.onPreload(e.target.value);
        }}
      />
      {errors.code && <ErrorMessage>{errors.code.message}</ErrorMessage>}
      <Button type="submit" disabled={!props.preloaded}>Join game</Button>
    </form>
  );
}

JoinGameForm.defaultProps = {
  preloaded: false,
  onPreload: () => {}
}
