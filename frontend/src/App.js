import { useState, useEffect } from 'react'
import { TodoProvider } from './context/TodoContext'
import TodoList from './components/TodoList'
import TodoListHeading from './components/TodoListHeading'

const TodoApp = () => {
  const [todoList, setTodoList] = useState([])

  // const getTodoList = async () => {
  //   return fetch(process.env.REACT_APP_API_ENDPOINT)
  //     .then((res) => res.json())
  //     .then((data) => setTodoList(data))
  //     .catch((error) => {
  //       console.error(error)
  //       return []
  //     })
  // }

  // useEffect(() => {
  //   getTodoList()
  // }, [])
  
  console.log(todoList)
  return (
    <TodoProvider initialTodos={todoList}>
      <div className="container mx-auto max-w-3xl flex flex-col h-fit max-h-screen justify-center py-10 px-5 md:px-2">
        <TodoListHeading />
        <TodoList />
      </div>
    </TodoProvider>
  )
}

export default TodoApp
