import { Request, Response, NextFunction } from 'express'
import { RowDataPacket, ResultSetHeader } from 'mysql2/promise'
import { pool } from '../../db.js'

type UserRow = RowDataPacket & {
  id: number
  name: string
  email: string | null
  username: string | null
}

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id)
    if (Number.isNaN(id)) {
      return res.status(400).json({ error: 'Paramètre id invalide' })
    }

    const [rows] = await pool.query<UserRow[]>(
      'SELECT id, email, name, username FROM users WHERE id = ?',
      [id]
    )

    if (!rows.length) {
      return res.status(404).json({ error: 'Utilisateur introuvable' })
    }

    return res.status(200).json(rows[0])
  } catch (err) {
    next(err)
  }
}

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username } = req.query

    if (!username) {
      const [rows] = await pool.query<UserRow[]>(
        'SELECT id, email, name, username FROM users'
      )
      return res.status(200).json(rows)
    }

    if (typeof username !== 'string') {
      return res.status(400).json({ error: 'Query param username invalide' })
    }

    const [rows] = await pool.query<UserRow[]>(
      'SELECT id, email, name, username FROM users WHERE LOWER(username) = LOWER(?)',
      [username]
    )

    return res.status(200).json(rows)
  } catch (err) {
    next(err)
  }
}

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name } = req.body as { name?: unknown }

    if (!name || typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({ error: 'Le champ name est requis' })
    }

    const cleanName = name.trim()

    const [result] = await pool.query<ResultSetHeader>(
      'INSERT INTO users (name) VALUES (?)',
      [cleanName]
    )

    return res.status(201).json({
      id: result.insertId,
      name: cleanName,
    })
  } catch (err) {
    next(err)
  }
}