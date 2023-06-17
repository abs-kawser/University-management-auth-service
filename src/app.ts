/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'
import { UserRoutes } from './app/modules/user/user.route'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import { UserService } from './app/modules/user/user.service'
import ApiError from './errors/ApiError'
import { AcademicSemesterRoutes } from './app/modules/academicSemester/academicSemester.route'
import routes from './app/routes'
import httpStatus from 'http-status'

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

// app.use('/api/v1/users/', UserRoutes)
// app.use('/api/v1/academic-semester', AcademicSemesterRoutes)

app.use('/api/v1', routes)

//Testing
app.get('/', async (req: Request, res: Response, next: NextFunction) => {
  throw new Error('Testing error logger')

  //Promise.reject(new Error(`Unhandled Promise Rejection`))
  //throw new ApiError(400,'Testing Error logger')
})

//global err handlers
app.use(globalErrorHandler)

//handle not found
//handle not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  })
  next()
})

export default app
