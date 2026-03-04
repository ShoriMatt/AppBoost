import express from 'express'
import userRouter from './src/routes/users.routes.js'

const app = express()
const PORT: number = 92050

app.use(express.json())
app.use(userRouter)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})