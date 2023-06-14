import express from 'express'
import { Usercontroller } from './user.controller'
const router = express.Router()

router.post('/create-user', Usercontroller.createUser)

export const UserRoutes = router
