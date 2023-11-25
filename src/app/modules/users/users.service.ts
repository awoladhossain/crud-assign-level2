import { UserModel } from '../users.model'
import { User } from './users.interface'

const createUserToDB = async (user: User) => {
  // const result = await UserModel.create(user) //**built in static method */
  const userInstance = new UserModel(user)
  if (await userInstance.isUserExists(user.userId)) {
    throw new Error('User Already exists')
  }
  const result = await userInstance.save() //built in instance method provied by mongooes
  return result
}

const getAllUserFromDB = async () => {
  const result = await UserModel.find()
  return result
}
const getSingleUserFromDB = async (userId: number) => {
  const result = await UserModel.findOne({ userId })
  return result
}
const deleteSingleUserFromDB = async (userId: number) => {
  const result = await UserModel.deleteOne({ userId })
  return result
}
const updateSingleUserFromDB = async (userId: number) => {
  const result = await UserModel.updateOne({ userId })
  return result
}

export const UserServices = {
  createUserToDB,
  getAllUserFromDB,
  getSingleUserFromDB,
  deleteSingleUserFromDB,
  updateSingleUserFromDB,
}
