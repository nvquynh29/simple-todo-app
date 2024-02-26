import { Router } from 'express'
import * as todoController from './todoController.js'

const todoRouter = Router()
todoRouter.get('/', todoController.getTodos)
todoRouter.post('/', todoController.addTodo)
todoRouter.get('/:id', todoController.getTodo)
todoRouter.put('/:id', todoController.updateTodo)
todoRouter.delete('/:id', todoController.deleteTodo)

export default todoRouter
