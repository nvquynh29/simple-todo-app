'use client'
import { classNames } from '../utils/classname';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';

const editTodoAPI = async (id, todo) => {
  const updatedTodo = {
    name: todo.name,
    description: todo.description,
    status: todo.status,
  };
  return fetch(`${process.env.REACT_APP_API_ENDPOINT}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedTodo),
  })
    .then((result) => result.json())
    .then((data) => data)
    .catch((error) => {
      console.error(error);
      return {};
    });
};

const EditTodoForm = ({ todo, updateTodo }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editedTodo, setEditedTodo] = useState(todo);

  const handleEditTodo = (e) => {
    e.preventDefault();
    const { title, description } = e.target.elements;
    const updatedTodo = {
      ...editedTodo,
      name: title.value,
      description: description.value,
    };

    editTodoAPI(todo.id, updatedTodo).then((res) => {
      setEditedTodo(res);
      updateTodo && updateTodo(res);
      setIsOpen(false);
      document.getElementById('close-options').click(); // trig lỏ để đóng cái menu edit
    });
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={classNames(
          'block px-3 py-1 text-sm leading-6 text-gray-900 w-full text-left hover:bg-gray-50'
        )}
      >
        Edit
        <span className='sr-only'>, {todo.name}</span>
      </button>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as='div'
          className='relative z-10'
          onClose={() => setIsOpen(false)}
          static={true}
        >
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black/25' />
          </Transition.Child>
          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title
                    as='h3'
                    className='text-lg font-medium leading-6 text-gray-900'
                  >
                    Update Todo
                  </Dialog.Title>
                  <div>
                    <form
                      action='#'
                      onSubmit={handleEditTodo}
                      className='space-y-6'
                    >
                      <div>
                        <label
                          htmlFor='title'
                          className='block text-sm font-medium leading-6 text-gray-900'
                        >
                          Name
                        </label>
                        <div className='mt-2'>
                          <input
                            id='title'
                            name='title'
                            type='title'
                            autoComplete='title'
                            required
                            defaultValue={editedTodo.name}
                            className='px-2 block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor='description'
                          className='block text-sm font-medium leading-6 text-gray-900'
                        >
                          Description
                        </label>
                        <div className='mt-2'>
                          <textarea
                            id='description'
                            name='description'
                            type='description'
                            defaultValue={editedTodo.description}
                            autoComplete='current-description'
                            rows={5}
                            required
                            className='px-2 block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                          />
                        </div>
                      </div>

                      <div>
                        <button
                          type='submit'
                          className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                        >
                          Update Todo
                        </button>
                      </div>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default EditTodoForm;
