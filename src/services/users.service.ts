import { pool } from "../../db.js"
import bcrypt from "bcrypt"

export const register = async (userToCreate: any) => {

  const { username, email, password } = userToCreate

  const [existing] = await pool.query(
    "SELECT id FROM users WHERE email = ? OR username = ?",
    [email, username]
  )

  if ((existing as any[]).length > 0) {
    throw new Error("Utilisateur déjà existant")
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const [result] = await pool.query(
    "INSERT INTO users (username,email,password) VALUES (?,?,?)",
    [username, email, hashedPassword]
  )

  console.log("Mail envoyé à :", email)

  return {
    id: (result as any).insertId,
    username,
    email
  }
}