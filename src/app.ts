/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Application } from 'express'
import cors from 'cors'
import { UserRoutes } from './app/modules/users/user.route'
import globalErrorHandler from './app/modules/users/middlewares/globalErrorHandler'
import { UserService } from './app/modules/users/user.service'
import ApiError from './errors/ApiError'

const app: Application = express()

app.use(cors())
//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Testing server
// app.get('/', async (req, res) => {
//   await UserService.createUser({
//     id: '238925',
//     password: '12345',
//     role: 'student 1',
//   })

//   res.send('Hello   World!')
// })

//Applicaton Route
app.use('/api/v1/users/', UserRoutes)
//Testing
app.get('/', async (req: Request, res: Response, next: NextFunction) => {
  Promise.reject(new Error(`Unhandled Promise Rejection`))

  //throw new ApiError(400,'Testing Error logger')
})
//global err handlers

app.use(globalErrorHandler)
export default app
