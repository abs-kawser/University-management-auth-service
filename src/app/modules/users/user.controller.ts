import { RequestHandler } from 'express'
import { UserService } from './user.service'

const createUser: RequestHandler = async (req, res, next) => {
  try {
    const { user } = req.body

    const result = await UserService.createUser(user)
    res.status(200).json({
      success: true,
      message: 'hit successfully',
      data: result,
    })
  } catch (err) {
    console.log(err)
    next(err)
    // res.status(404).json({
    //   success: false,
    //   message: 'faild to create user ',

    // })
  }
}

export const Usercontroller = {
  createUser,
}
