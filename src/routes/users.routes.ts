import { Router } from "express"
import * as usersController from "../controllers/users.controller.js"
import * as usersMiddleware from "../middlewares/users.middleware.js"

const userRouter = Router()

userRouter.get("/", usersController.getUsers)

userRouter.get("/:id",usersMiddleware.validateUserId,usersController.getUserById)

userRouter.post("/",usersMiddleware.validateCreateUser,usersController.createUser)

userRouter.put("/:id",usersMiddleware.validateUserId,usersMiddleware.validateUpdateUser,usersController.updateUser)

userRouter.delete("/:id",usersMiddleware.validateUserId,usersController.deleteUser)

userRouter.post("/register",usersMiddleware.validateRegister,usersController.registerUser)

export default userRouter