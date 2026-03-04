import { Router } from "express"
import { getUsers, getUserById, createUser, updateUser, deleteUser }
from "../controllers/users.controller.js"

const userRouter = Router()

userRouter.get("/users", getUsers)
userRouter.get("/users/:id", getUserById)
userRouter.post("/users", createUser)
userRouter.put("/users/:id", updateUser)
userRouter.delete("/users/:id", deleteUser)

export default userRouter