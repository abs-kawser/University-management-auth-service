/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Application } from 'express'
import cors from 'cors'
import usersService from './app/modules/users/users.service'
import UserRouter from './app/modules/users/users.route'
import globalErrorHandler from './app/modules/users/middlewares/globalErrorHandler'

const app: Application = express()

app.use(cors())
//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Testing server
app.get('/', async (req, res) => {
  await usersService.createUser({
    id: '238925',
    password: '12345',
    role: 'student 1',
  })

  res.send('Hello   World!')
})

//Applicaton Route
app.use('/api/v1/users/', UserRouter)

//global err handlers

app.use(globalErrorHandler)
export default app
