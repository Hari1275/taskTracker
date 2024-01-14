'use client';

import { Input } from '@/components/ui/input';
import { useFormStatus } from 'react-dom';

interface FormInputProps {
  errors?: {
    title?: string[];
  };
}

export const FormInput = ({ errors }: FormInputProps) => {
  const { pending } = useFormStatus();
  return (
    // npx shadcn-ui@latest add input
    <div>
      <Input
        type='text'
        id='title'
        name='title'
        disabled={pending}
        placeholder='Enter board title '
      />
      <div>
        {errors?.title ? (
          <div>
            {errors.title.map((error: string) => (
              <p key={error} className='text-rose-500'>
                {error}
              </p>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};
