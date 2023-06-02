import { Request, Response } from 'express'
import userService from './users.service'

const createUser = async (req: Request, res: Response) => {
  try {
    const { user } = req.body

    const result = await userService.createUser(user)
    res.status(200).json({
      success: true,
      message: 'hit successfully',
      data: result,
    })
  } catch (err) {
    console.log(err)

    res.status(404).json({
      success: false,
      message: 'faild to create user ',
    })
  }
}

export default {
  createUser,
}
