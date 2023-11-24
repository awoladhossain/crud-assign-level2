import express from 'express'
import { UserController } from './users.controller'

const router = express.Router()

router.post('/api/users', UserController.createUser)
router.get('/api/users', UserController.getAllUser)
router.get('/api/users/:userId', UserController.getSingleUser)

export const UsersRoutes = router