import bcrypt from "bcrypt"
import * as usersRepository from "../repositories/users.repository.js"

// Enregistre un nouvel utilisateur avec validation et hachage du mot de passe
export const register = async (userToCreate: any) => {

  const { username, email, password } = userToCreate

  const [existing]: any = await usersRepository.findUserByEmail(email)

  if (existing.length > 0) {
    throw new Error("Utilisateur déjà existant")
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const [result]: any = await usersRepository.createUser(username)

  return {
    id: result.insertId,
    username,
    email
  }
}

// Récupère tous les utilisateurs
export const getUsers = async () => {
  const [rows] = await usersRepository.getUsers()
  return rows
}

// Récupère un utilisateur par son ID
export const getUserById = async (id: number) => {
  const [rows]: any = await usersRepository.getUserById(id)
  return rows[0]
}

// Crée un nouvel utilisateur
export const createUser = async (name: string) => {
  const [result]: any = await usersRepository.createUser(name)

  return {
    id: result.insertId,
    name
  }
}

// Met à jour les informations d'un utilisateur
export const updateUser = async (
  id: number,
  username: string,
  firstname: string,
  lastname: string,
  birthday: string,
  age: number
) => {

  await usersRepository.updateUser(
    id,
    username,
    firstname,
    lastname,
    birthday,
    age
  )

  return {
    success: true,
    message: "Utilisateur mis à jour"
  }
}

// Supprime un utilisateur
export const deleteUser = async (id: number) => {

  await usersRepository.deleteUser(id)

  return {
    success: true,
    message: "Utilisateur supprimé"
  }
}