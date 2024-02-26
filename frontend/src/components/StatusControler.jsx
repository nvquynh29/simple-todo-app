'use client';
import { classNames } from '../utils/classname';
import { statuses } from '../utils/constants';
import { Listbox, Transition } from '@headlessui/react';
import { ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { Fragment, useState } from 'react';
import { useTodoContext } from '../context/TodoContext';

const updateStatusAPI = async (updatedTodo) => {
  const { id } = updatedTodo;

  return fetch(`${process.env.REACT_APP_API_ENDPOINT}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedTodo),
  })
    .then((res) => res.json())
    .then((res) => res)
    .catch((error) => {
      console.error(error);
      return {};
    });
};

const StatusControler = ({ todo }) => {
  const { updateTodo } = useTodoContext();
  const [selected, setSelected] = useState(
    statuses.find((status) => status.id === todo.status) || {
      id: '',
      name: '',
      className: '',
    }
  );

  const handleChangeStatus = (status) => {
    const updatedTodo = { ...todo, status: status.id };
    updateStatusAPI(updatedTodo).then(() => {
      setSelected(status);
      updateTodo && updateTodo(updatedTodo);
    });
  };
  return (
    <Listbox value={selected} onChange={handleChangeStatus}>
      {({ open }) => (
        <>
          <div className='relative'>
            <Listbox.Button className='relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left ring-1 ring-inset ring-transparent focus:outline-none focus:ring-2 focus:ring-transparent sm:text-sm sm:leading-6'>
              <span className='flex items-center'>
                <p
                  className={classNames(
                    'rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset ',
                    selected.className
                  )}
                >
                  {selected.name}
                </p>
                <span
                  sr-only
                  className='text-green-700 bg-green-50 ring-green-600/20'
                ></span>
                <span
                  sr-only
                  className='text-gray-600 bg-gray-50 ring-gray-500/10'
                ></span>
                <span
                  sr-only
                  className='text-yellow-800 bg-yellow-50 ring-yellow-600/20'
                ></span>
              </span>
              <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
                <ChevronUpDownIcon
                  className='h-5 w-5 text-gray-400'
                  aria-hidden='true'
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave='transition ease-in duration-100'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Listbox.Options className='absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                {statuses.map((status) => (
                  <Listbox.Option
                    key={status.id}
                    className={({ selected, active }) =>
                      classNames(
                        active ? 'bg-slate-50 text-white' : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-3 pr-9'
                      )
                    }
                    value={status}
                  >
                    <div className={classNames('flex items-center')}>
                      <p
                        className={classNames(
                          'rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset',
                          status.className
                        )}
                      >
                        {status.name}
                      </p>
                    </div>
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};

export default StatusControler