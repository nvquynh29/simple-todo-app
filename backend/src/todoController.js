import * as todoService from './todoService.js'

function addTodo (req, res) {
  const { name, description } = req.body
  console.log({ name, description })
  todoService.addTodo(name, description)
    .then(result => res.status(201).json(result))
    .catch(err => res.status(500).json(err))
}

function getTodos (req, res) {
  todoService.getTodos()
    .then(result => res.status(200).json(result))
    .catch(err => res.status(500).json(err))
}

function getTodo (req, res) {
  const { id } = req.params
  todoService.getTodo(id)
    .then(result => res.status(result.statusCode ?? 200).json(result))
    .catch(err => res.status(500).json(err))
}

function updateTodo (req, res) {
  const { id } = req.params
  const { name, description, status } = req.body
  todoService.updateTodo(id, name, description, status)
    .then(result => res.status(200).json(result))
    .catch(err => res.status(500).json(err))
}

function deleteTodo (req, res) {
  const { id } = req.params
  todoService.deleteTodo(id)
    .then(result => res.status(200).json(result))
    .catch(err => res.status(500).json(err))
}

export { addTodo, getTodos, getTodo, updateTodo, deleteTodo }
