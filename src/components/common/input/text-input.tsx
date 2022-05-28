import { FC } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { InputType } from '~/common/enums/enums';
import { AppLocalizationKey } from '~/common/types/types';
import { FormattedMessage } from '../common';

type Props = {
  title: AppLocalizationKey;
  formRegisterValues: UseFormRegisterReturn;
  errorMessage?: string;
  className?: string;
};

export const TextInput: FC<Props> = ({
  formRegisterValues,
  errorMessage,
  title,
  className,
}) => {
  return (
    <label className={className}>
      <FormattedMessage as="span" message={title} />
      <input type={InputType.TEXT} {...formRegisterValues} />
      {Boolean(errorMessage) && (
        <FormattedMessage
          as="span"
          message={errorMessage as AppLocalizationKey}
        />
      )}
    </label>
  );
};
