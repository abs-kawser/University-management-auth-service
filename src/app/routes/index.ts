import express from 'express'
import { UserRoutes } from '../modules/user/user.route'
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.route'
const router = express.Router()

const Moduleroutes = [
  {
    path: 'user',
    route: UserRoutes,
  },
  {
    path: '/academic-semesters',
    route: AcademicSemesterRoutes,
  },
]

Moduleroutes.forEach(route => router.use(route.path, route.route))

// router.use('/users/', UserRoutes)
// router.use('/academic-semester', AcademicSemesterRoutes)

export default router
