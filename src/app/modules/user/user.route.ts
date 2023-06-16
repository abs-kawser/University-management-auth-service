import express from 'express'
import { Usercontroller } from './user.controller'
import { UserValidation } from './user.validation'
import validateRequest from '../../middlewares/validateRequest'
const router = express.Router()

router.post(
  '/create-user',
  validateRequest(UserValidation.createUserZodeSchema),
  Usercontroller.createUser
)

export const UserRoutes = router
