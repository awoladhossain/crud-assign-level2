import { Schema, model } from 'mongoose'
import { User, UserModeles, userMethod } from './users/users.interface'
import bcrypt from 'bcrypt'
import config from '../config'

const userSchema = new Schema<User, UserModeles, userMethod>({
  userId: { type: Number, required: true, unique: true },
  username: { type: String, required: true, maxlength: 20 },
  password: { type: String, required: true },
  fullName: {
    firstName: {
      type: String,
      required: true,
      maxlength: [20, 'firstName can not be more than 20'],
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      maxlength: [20, 'lastName can not be more than 20'],
      trim: true,
    },
  },
  age: { type: Number, required: true },
  email: { type: String, required: true },
  isActive: { type: Boolean, default: false },
  hobbies: [String],
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
  },
  orders: [
    {
      productName: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
    },
  ],
})

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const userM = this
  userM.password = await bcrypt.hash(
    userM.password,
    Number(config.bcrypt_salt_round),
  )
  next()
})

userSchema.post('save', function (doc, next) {
  doc.password = ' '
  next()
})

userSchema.pre('find', function (next) {
  next()
})

userSchema.methods.isUserExists = async function (userId: number) {
  const existingUser = await UserModel.findOne({ userId })
  return existingUser
}

export const UserModel = model<User, UserModeles>('UserM', userSchema)
