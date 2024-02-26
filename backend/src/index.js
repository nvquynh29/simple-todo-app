import express from 'express'
import { config } from 'dotenv'
import cors from 'cors'
import dbConnection from './config/database.js'
import todoRouter from './todoRouter.js'

config()

const app = express()
app.use(express.json())
app.use(cors())

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Todo API' })
})

app.get('/health', (req, res) => {
  res.json({ status: 'OK' })
})

app.use('/api/v1/todos', todoRouter)

dbConnection.connect((err) => {
  if (err) throw err
  console.log('Connected to the database')
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
  })
})
