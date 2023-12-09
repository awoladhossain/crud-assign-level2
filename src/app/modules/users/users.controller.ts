import { Request, Response } from 'express'
import { UserServices } from './users.service'
import { orderValidationSchema, userSchemaZod } from './users.validation'



const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body

    // *** creating a validation using ZOD
    const zodData = userSchemaZod.parse(user)

    // *** service function called to send
    const result = await UserServices.createUserToDB(zodData);
    const modifiedResultData = JSON.parse(JSON.stringify(result));

    delete modifiedResultData.password
    delete modifiedResultData.orders
    

    
    // *** send response
    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: modifiedResultData,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    })
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
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    })
  }
}
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId)
    const result = await UserServices.getSingleUserFromDB(userId);

    const modifiedResultData = JSON.parse(JSON.stringify(result))
   delete modifiedResultData.orders

    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: modifiedResultData,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    })
  }
}
const deleteSingleUser = async (req: Request, res: Response) => {
  try {
    const  userId  = parseInt(req.params.userId)
    const result = await UserServices.deleteSingleUserFromDB(userId);

   

    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: result,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    })
  }
}
const updateSingleUser = async (req: Request, res: Response) => {
  try {
    const  userId  = parseInt(req.params.userId)
  

    const zodParseData = userSchemaZod.parse(req.body);
    const result = await UserServices.updateSingleUserFromDB(userId, zodParseData);


    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: result,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    })
  }
}


const addOrder = async (req: Request, res: Response) => {

 try {

   const userId = parseInt(req.params.userId)

   const zodParseData = orderValidationSchema.parse(req.body)
   await UserServices.addOrderIntoDB(userId, [zodParseData]);

   res.status(200).json({
     success: true,
     message: 'Order created successfully!',
     data: null,
   })
  
 } catch (error) {
   res.status(500).json({
     status: 'fail',
     message: 'something went wrong',
   })
 }
  
}


export const UserController = {
  createUser,
  getAllUser,
  getSingleUser,
  deleteSingleUser,
  updateSingleUser,
  addOrder
}
