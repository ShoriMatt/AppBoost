import { Router } from "express"
import { getUsers, getUserById, createUser, updateUser, deleteUser, registerUser }
from "../controllers/users.controller.js"

const userRouter = Router()

userRouter.get("/users", getUsers)
userRouter.get("/users/:id", getUserById)
userRouter.post("/users", createUser)
userRouter.put("/users/:id", updateUser)
userRouter.delete("/users/:id", deleteUser)
userRouter.post("/users/register", registerUser)

export default userRouter