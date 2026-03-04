import { Request, Response } from "express"
import * as usersService from "../services/users.service.js"

// Récupère tous les utilisateurs
export const getUsers = async (req: Request, res: Response) => {

  try {

    const users = await usersService.getUsers()

    return res.status(200).json(users)

  } catch (err) {

    return res.status(500).json({
      error: "Erreur lors de la récupération des utilisateurs"
    })

  }

}

// Récupère un utilisateur par son ID
export const getUserById = async (req: Request, res: Response) => {

  try {

    const id = Number(req.params.id)

    if (Number.isNaN(id)) {
      return res.status(400).json({
        error: "Paramètre id invalide"
      })
    }

    const user = await usersService.getUserById(id)

    if (!user) {
      return res.status(404).json({
        error: "Utilisateur introuvable"
      })
    }

    return res.status(200).json(user)

  } catch (err) {

    return res.status(500).json({
      error: "Erreur serveur"
    })

  }

}

// Crée un utilisateur
export const createUser = async (req: Request, res: Response) => {

  try {

    const { name } = req.body

    if (!name) {
      return res.status(400).json({
        error: "Le champ name est requis"
      })
    }

    const user = await usersService.createUser(name)

    return res.status(201).json(user)

  } catch (err) {

    return res.status(500).json({
      error: "Erreur lors de la création de l'utilisateur"
    })

  }

}

// Met à jour un utilisateur
export const updateUser = async (req: Request, res: Response) => {

  try {

    const id = Number(req.params.id)

    if (Number.isNaN(id)) {
      return res.status(400).json({
        error: "Paramètre id invalide"
      })
    }

    const { username, firstname, lastname, birthday, age } = req.body

    const result = await usersService.updateUser(
      id,
      username,
      firstname,
      lastname,
      birthday,
      age
    )

    return res.status(200).json(result)

  } catch (err) {

    return res.status(500).json({
      error: "Erreur lors de la mise à jour"
    })

  }

}

// Supprime un utilisateur
export const deleteUser = async (req: Request, res: Response) => {

  try {

    const id = Number(req.params.id)

    if (Number.isNaN(id)) {
      return res.status(400).json({
        error: "Paramètre id invalide"
      })
    }

    const result = await usersService.deleteUser(id)

    return res.status(200).json(result)

  } catch (err) {

    return res.status(500).json({
      error: "Erreur lors de la suppression"
    })

  }

}

// Register
export const registerUser = async (req: Request, res: Response) => {

  try {

    const user = await usersService.register(req.body)

    return res.status(201).json({
      success: true,
      data: user
    })

  } catch (err: any) {

    if (err.message === "Utilisateur déjà existant") {
      return res.status(409).json({
        error: err.message
      })
    }

    return res.status(500).json({
      error: "Erreur lors de l'inscription"
    })

  }

}