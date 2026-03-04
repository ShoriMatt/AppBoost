import bcrypt from "bcrypt"
import * as usersRepository from "../repositories/users.repository.js"

// Enregistre un nouvel utilisateur avec validation et hachage du mot de passe
export const register = async (userToCreate: any) => {

  const { username, email, password } = userToCreate

  // Vérifie si l'utilisateur existe déjà
  const [existing] = await usersRepository.findUserByEmail(email)

  if ((existing as any[]).length > 0) {
    throw new Error("Utilisateur déjà existant")
  }

  // Hache le mot de passe pour la sécurité
  const hashedPassword = await bcrypt.hash(password, 10)

  // Crée le nouvel utilisateur en base de données
  const [result] = await usersRepository.createUser(
    username,
    email,
    hashedPassword
  )

  return {
    id: (result as any).insertId,
    username,
    email
  }
}