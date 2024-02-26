import { Popover, Transition } from '@headlessui/react';
import React, { Fragment } from 'react'
import { useTodoContext } from '../context/TodoContext';
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';
import EditTodoForm from './EditTodoForm';
import { classNames } from '../utils/classname';
const deleteTodoAPI = async (id) => {
  return fetch(`${process.env.REACT_APP_API_ENDPOINT}/${id}`, {
    method: 'DELETE',
  }).then((result) => result.json());
};

const ActionMenu = ({ todo }) => {
  const { removeTodo, updateTodo } = useTodoContext();

  const handleRemoveTodo = (id) => {
    deleteTodoAPI(id).then((res) => {
      removeTodo && removeTodo(id);
    });
  };

  return (
    <Popover as='div' className='relative flex-none'>
      <Popover.Button
        id='close-options'
        className='-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900'
      >
        <EllipsisVerticalIcon className='h-5 w-5' aria-hidden='true' />
      </Popover.Button>
      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <Popover.Panel
          className='absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none'
          static={false}
        >
          <EditTodoForm updateTodo={updateTodo} todo={todo} />

          <button
            onClick={() => handleRemoveTodo(todo.id)}
            className={classNames(
              'block px-3 py-1 text-sm leading-6 text-gray-900 w-full text-left hover:bg-gray-50'
            )}
          >
            Delete
            <span className='sr-only'>, {todo.name}</span>
          </button>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default ActionMenu