import React from 'react'
import { useTodoContext } from '../context/TodoContext';
import Todo from './Todo';

const TodoList = () => {
  const { todos } = useTodoContext();

  return (
    <div className="overflow-auto min-h-[500px] border rounded-b-md border-gray-200 relative">
      <ul role="list" className="divide-y relative divide-gray-100 px-5 h-full">
        {todos.map((todo) => (
          <Todo key={todo.id} todo={todo} />
        ))}
      </ul>
      {!todos.length && (
        <div className="my-auto mt-1 text-gray-500 text-4xl text-center absolute top-1/2 -translate-y-1/2 -translate-x-1/2 left-1/2">
          Your todo list is empty
        </div>
      )}
    </div>
  )
}

export default TodoList