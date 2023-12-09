import { Schema, model } from 'mongoose'
import { User, UserModeles, userMethod } from './users/users.interface'
import bcrypt from 'bcrypt'
import config from '../config'

const userSchema = new Schema<User, UserModeles, userMethod>({
  userId: { type: Number, required: true, unique: true },
  username: { type: String, required: true, maxlength: 20 },
  password: { type: String, required: true, select: false },
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
  hobbies: {
    type: [String],
    required:true
  },
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

userSchema.pre('find', function (next) {
  this.find().projection({
    username: 1,
    fullName: 1,
    age: 1,
    email: 1,
    address:1,
  })
  next();
})


// eslint-disable-next-line @typescript-eslint/no-explicit-any
userSchema.methods.calcOrdersTotal = async function (userId: number): Promise<{ result: any; totalPrice: number }> {
  const result = await UserModel.aggregate([
    { $match: { userId: userId } },
    { $unwind: '$orders' },
    {
      $group: {
        _id: '$_id',
        totalPrice: {
          $sum: { $multiply: ['$orders.price', '$orders.quantity'] },
        },
      },
    },
  ]);

  const totalPrice = parseFloat(result[0].totalPrice.toFixed(2));
  return { result, totalPrice };
};

userSchema.methods.isUserExists = async function (userId: number) {
  const existingUser = await UserModel.findOne({ userId })
  return existingUser;
}


userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const userM = this
  userM.password = await bcrypt.hash(
    userM.password,
    Number(config.bcrypt_salt_round),
  )
  next()
})



export const UserModel = model<User, UserModeles>('UserM', userSchema)
