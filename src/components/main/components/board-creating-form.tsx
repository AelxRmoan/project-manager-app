import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { board as boardActions } from '~/store/actions';
import { joiResolver } from '@hookform/resolvers/joi';
import { createBoard } from '~/validation-schemas/validation-schemas';
import { InputName } from '~/common/enums/enums';
import { TextInput } from '~/components/common/common';
import { CreateBoardDto } from '~/common/types/types';
import { useAppDispatch } from '~/hooks/hooks';

type Props = {
  isOpen: boolean;
  setIsOpen: (arg: boolean) => void;
};

export const BoardCreatingForm: FC<Props> = ({ isOpen, setIsOpen }) => {
  const { register, handleSubmit, formState, reset } = useForm<CreateBoardDto>({
    resolver: joiResolver(createBoard),
  });
  const { title: titleError } = formState.errors;
  const dispatch = useAppDispatch();

  const handleCreateForm = ({ title, description }: CreateBoardDto): void => {
    dispatch(boardActions.create({ title, description }));
    reset();
    setIsOpen(false);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <form onSubmit={handleSubmit(handleCreateForm)}>
      <h2>Board creating form</h2>
      <TextInput
        formRegisterValues={register(InputName.TITLE)}
        errorMessage={titleError?.message}
      />
      <TextInput formRegisterValues={register(InputName.DESCRIPTION)} />
      <button>Create board</button>
    </form>
  );
};
