import { Request, Response } from 'express'
import { UserServices } from './users.service'

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body
    // *** service function called to send
    const result = await UserServices.createUserToDB(user)
    // *** send response
    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    })
  } catch (error) {
    console.log(error)
  }
}

const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUserFromDB()
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    })
  } catch (error) {
    console.log(error)
  }
}
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const result = await UserServices.getSingleUserFromDB(userId)
    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: result,
    })
  } catch (error) {
    console.log(error)
  }
}

export const UserController = {
  createUser,
  getAllUser,
  getSingleUser,
}
