import { Router, Request, Response } from "express";
const userRouter = Router()
userRouter.get('/users', (req: Request, res: Response) => {
    return res.status(200).json({ message: 'Users fetched' })
})
userRouter.post('/users', (req: Request, res: Response) => {
    return res.status(201).json({ message: 'User created' })
})
export default userRouter