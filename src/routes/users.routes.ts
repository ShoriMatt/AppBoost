import { Router } from 'express'
import { createUser, getUserById, getUsers } from '../controllers/users.controller.js'

const userRouter = Router()

userRouter.get('/users/:id', getUserById)
userRouter.get('/users', getUsers)
userRouter.post('/users', createUser)

export default userRouter