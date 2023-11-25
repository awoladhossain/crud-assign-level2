import express from 'express'
import { UserController } from './users.controller'

const router = express.Router()

router.post('/api/users', UserController.createUser)
router.get('/api/users', UserController.getAllUser)
router.get('/api/users/:userId', UserController.getSingleUser)
router.delete('/api/users/:userId', UserController.deleteSingleUser)
router.put('/api/users/:userId', UserController.updateSingleUser)

export const UsersRoutes = router
