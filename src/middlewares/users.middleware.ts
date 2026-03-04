import { Request, Response, NextFunction } from "express"

// Valide que l'ID utilisateur est un nombre valide
export const validateUserId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  const id = Number(req.params.id)

  if (Number.isNaN(id)) {
    return res.status(400).json({
      error: "Paramètre id invalide"
    })
  }

  next()
}

// Valide les données pour la création d'un utilisateur
export const validateCreateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  const { name } = req.body

  if (!name || typeof name !== "string" || !name.trim()) {
    return res.status(400).json({
      error: "Le champ name est requis"
    })
  }

  next()
}

// Valide les données pour la mise à jour d'un utilisateur
export const validateUpdateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  const { username, firstname, lastname, birthday, age } = req.body

  if (!username) {
    return res.status(400).json({
      error: "username requis"
    })
  }

  if (!firstname) {
    return res.status(400).json({
      error: "firstname requis"
    })
  }

  if (!lastname) {
    return res.status(400).json({
      error: "lastname requis"
    })
  }

  next()
}

// Valide les données pour l'enregistrement d'un utilisateur
export const validateRegister = (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  const { username, email, password } = req.body

  if (!username) {
    return res.status(400).json({
      error: "username requis"
    })
  }

  if (!email) {
    return res.status(400).json({
      error: "email requis"
    })
  }

  if (!password || password.length < 6) {
    return res.status(400).json({
      error: "password doit contenir au moins 6 caractères"
    })
  }

  next()
}