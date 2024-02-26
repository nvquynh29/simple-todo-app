import crypto from 'crypto'
import dbConnection from './config/database.js'

function addTodo (name, description) {
  const query = 'INSERT INTO todos (id, name, description) VALUES (?, ?, ?)'
  const id = crypto.randomUUID()
  description = description || ''
  return new Promise((resolve, reject) => {
    dbConnection.query(query, [id, name, description], (err, result) => {
      if (err) {
        console.log(err)
        reject({ message: 'Failed to add todo' })
      }
      resolve({ id, name, description, status: 0 })
    })
  })
}

function getTodos () {
  const query = 'SELECT * FROM todos'
  return new Promise((resolve, reject) =>
    dbConnection.query(query, (err, result) => {
      if (err) reject({ message: 'Failed to get todos' })
      resolve(result)
    })
  )
}

function getTodo (id) {
  const query = 'SELECT * FROM todos WHERE id = ?'
  return new Promise((resolve, reject) => {
    dbConnection.query(query, [id], (err, result) => {
      if (err) reject({ message: 'Failed to get todo' })
      if (result.length === 0) resolve({ message: 'Todo not found', statusCode: 404 })
      resolve(result[0])
    })
  })
}

function updateTodo (id, name, description, status) {
  description = description || ''
  const query = 'UPDATE todos SET name = ?, description = ?, status = ? WHERE id = ?'
  return new Promise((resolve, reject) => {
    dbConnection.query(query, [name, description, status, id], (err, result) => {
      if (err) reject({ message: 'Failed to update todo' })
      resolve({ id, name, description, status })
    })
  })
}

function deleteTodo (id) {
  const query = 'DELETE FROM todos WHERE id = ?'
  return new Promise((resolve, reject) => {
    dbConnection.query(query, [id], (err, result) => {
      if (err) reject({ message: 'Failed to delete todo' })
      resolve({ message: 'Todo deleted'})
    })
  })
}

export { addTodo, getTodos, getTodo, updateTodo, deleteTodo }
