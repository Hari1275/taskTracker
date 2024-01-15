'use client';

import { create } from '@/actions/createBoard';

import { useFormState } from 'react-dom';
import { FormInput } from './form-input';
import { FormButton } from './form-button';

export const Form = () => {
  const initialState = { message: '', errors: {} };
  const [state, dispatch] = useFormState(create, initialState);
  return (
    <form action={dispatch} className='flex gap-2 flex-col'>
      <FormInput errors={state?.errors} />
      <FormButton />
    </form>
  );
};
