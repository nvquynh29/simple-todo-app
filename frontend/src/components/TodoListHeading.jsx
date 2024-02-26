import React from 'react'
import AddTodoForm from './AddTodoForm';

const TodoListHeading = () => {
  return (
    <div className=' border rounded-t-md border-gray-200 bg-white px-4 py-5 sm:px-6'>
      <div className='-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap'>
        <div className='ml-4 mt-4'>
          <h3 className='text-base font-semibold leading-6 text-gray-900'>
            Todo List
          </h3>
          <p className='mt-1 text-sm text-gray-500'>
            Manage and organize your job list as easy as possible!
          </p>
        </div>
        <div className='ml-4 mt-4 flex-shrink-0'>
          <AddTodoForm />
        </div>
      </div>
    </div>
  );
}

export default TodoListHeading
