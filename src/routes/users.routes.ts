import { Router } from "express"
import * as usersController from "../controllers/users.controller.js"
import * as usersMiddleware from "../middlewares/users.middleware.js"

const router = Router()

router.get("/users", usersController.getUsers)

router.get("/users/:id",usersMiddleware.validateUserId,usersController.getUserById)

router.post("/users",usersMiddleware.validateCreateUser,usersController.createUser)

router.put("/users/:id",usersMiddleware.validateUserId,usersMiddleware.validateUpdateUser,usersController.updateUser)

router.delete("/users/:id",usersMiddleware.validateUserId,usersController.deleteUser)

router.post("/users/register",usersMiddleware.validateRegister,usersController.registerUser)

export default router