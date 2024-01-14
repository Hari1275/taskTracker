import { deleteBoard } from '@/actions/deleteBoard';
import { FormDeleteButton } from './form-delete';

interface BoardProps {
  id: string;
  title: string;
}

export const Board = ({ id, title }: BoardProps) => {
  const deleteAction = deleteBoard.bind(null, id);
  return (
    <form action={deleteAction} className='flex items-center px-2 gap-2'>
      <div className='space-y-2'>
        Board Title: <span>{title}</span>
      </div>
      <FormDeleteButton />
    </form>
  );
};
