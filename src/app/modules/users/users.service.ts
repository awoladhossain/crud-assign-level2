import { UserModel } from '../users.model'
import { User } from './users.interface'

const createUserToDB = async (user: User) => {
  const result = await UserModel.create(user)
  return result
}

const getAllUserFromDB = async () => {
  const result = await UserModel.find()
  return result
}
const getSingleUserFromDB = async (userId) => {
  const result = await UserModel.findOne({ userId })
  return result
}

export const UserServices = {
  createUserToDB,
  getAllUserFromDB,
  getSingleUserFromDB,
}
