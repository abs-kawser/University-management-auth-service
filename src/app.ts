// eslint-disable-next-line @typescript-eslint/no-unused-vars
import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import usersService from './app/modules/users/users.service'
import UserRouter from './app/modules/users/users.route'

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
    role: 'student',
  })

  res.send('Hello   World!')
})

//Applicaton Route
app.use('/api/v1/users/', UserRouter)

export default app
