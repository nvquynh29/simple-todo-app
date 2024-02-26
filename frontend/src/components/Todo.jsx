'use client';
import ActionMenu from './ActionMenu';
import StatusControler from './StatusControler';

const Todo = (props) => {
  const { todo } = props;

  return (
    <li key={todo.id} className='flex items-center justify-between py-5 w-full'>
      <div className='min-w-0'>
        <div className='flex items-start gap-x-3'>
          <p className='text-sm font-semibold leading-6 text-gray-900'>
            {todo.name}
          </p>
        </div>
        <div className='mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500'>
          <p className='whitespace-nowrap'>{todo.description}</p>
        </div>
      </div>
      <div className='flex flex-none items-center gap-x-4'>
        <StatusControler todo={todo} />
        <ActionMenu todo={todo} />
      </div>
    </li>
  );
};

export default Todo;
