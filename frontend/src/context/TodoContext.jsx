import React, { createContext, useState, useEffect } from 'react';
import useTodo from '../hooks/use-todo';

const TodoContext = createContext();

export const TodoProvider = ({ children, initialTodos = [] }) => {
  const [todoList, setTodoList] = useState([])
  const todoContextValues = useTodo(todoList) // Utilize your existing todo hook

  const getTodoList = async () => {
    return fetch(process.env.REACT_APP_API_ENDPOINT)
      .then((res) => res.json())
      .then((data) => {
        setTodoList(data)
        data && data.length && todoContextValues.addTodo(...data)
      })
      .catch((error) => {
        console.error(error)
        return []
      })
  }

  useEffect(() => {
    getTodoList()
  }, [])

  return <TodoContext.Provider value={todoContextValues}>{children}</TodoContext.Provider>
};

export const useTodoContext = () => React.useContext(TodoContext);
