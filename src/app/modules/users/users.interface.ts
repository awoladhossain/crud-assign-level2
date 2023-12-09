import { Model } from 'mongoose'

export type User = {
  userId: number
  username: string
  password: string
  fullName: {
    firstName: string
    lastName: string
  }
  age: number
  email: string
  isActive: boolean
  hobbies: string[]
  address: {
    street: string
    city: string
    country: string
  }
  orders?: {
    productName: string
    price: number
    quantity: number
  }[]
}

export type userMethod = {
  isUserExists(userId: number): Promise<User | null>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  calcOdersTotal(userId: number): Promise<{ result: any; totalPrice:number}>
}

export type UserModeles = Model<User, Record<string, never>, userMethod>
