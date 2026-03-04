import { pool } from "../../db.js"

// Récupère tous les utilisateurs
export const getUsers = () => {
  return pool.query(
    "SELECT id, email, name, username FROM users"
  )
}

// Récupère un utilisateur par son ID
export const getUserById = (id: number) => {
  return pool.query(
    "SELECT id, email, name, username FROM users WHERE id = ?",
    [id]
  )
}

// Trouve un utilisateur par son email
export const findUserByEmail = (email: string) => {
  return pool.query(
    "SELECT id, email, username, password FROM users WHERE email = ?",
    [email]
  )
}

// Crée un nouvel utilisateur
export const createUser = (username: string, email: string, password: string) => {
  return pool.query(
    "INSERT INTO users (username,email,password) VALUES (?,?,?)",
    [username, email, password]
  )
}

// Met à jour les informations d'un utilisateur
export const updateUser = (id: number,username: string,firstname: string,lastname: string,birthday: string,age: number) => {
  return pool.query(
    "UPDATE users SET username=?, firstname=?, lastname=?, birthday=?, age=? WHERE id=?",
    [username, firstname, lastname, birthday, age, id]
  )
}

// Supprime un utilisateur par son ID
export const deleteUser = (id: number) => {
  return pool.query(
    "DELETE FROM users WHERE id = ?",
    [id]
  )
}