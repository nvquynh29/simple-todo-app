import { useState } from 'react';

const useTodo = (initialTodos = []) => {
  const [todos, setTodos] = useState(initialTodos);

  const addTodo = (newTodo) => {
    setTodos([newTodo, ...todos]);
  };
  const toggleTodoStatus = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };


  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const updateTodo = (updatedTodo) => {
    setTodos(
      todos.map((todo) =>
        todo.id === updatedTodo.id ? { ...updatedTodo } : todo
      )
    );
  };

  return {
    todos,
    toggleTodoStatus,
    addTodo,
    removeTodo,
    updateTodo,
  };
};

export default useTodo;
