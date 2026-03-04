import express from "express"
import userRouter from "./src/routes/users.routes.js"

const app = express()
const PORT = 4000

app.use(express.json())

app.use("/users", userRouter)

app.get("/", (req, res) => {
  res.send("Bienvenue sur l'API AppBoost de Shori_Matt !")
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})