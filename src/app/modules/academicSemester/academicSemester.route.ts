import express from 'express'
//import { Usercontroller } from './user.controller'
import validateRequest from '../../middlewares/validateRequest'
import { AcademicSemesterValidation } from './acdemicSemester.validation'
import { AcademicSemesterController } from './academicSemester.controller'
const router = express.Router()

router.post(
  '/create-semester',
  validateRequest(AcademicSemesterValidation.createAcademicSemisterZodeSchema),
  AcademicSemesterController.createSemester
)

router.get('/', AcademicSemesterController.getAllSemesters)

export const AcademicSemesterRoutes = router
