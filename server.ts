// l'ensemble des imports 

import express from 'express'
import { pool } from './db.js'

type UserType = {
    id: number
    name: string
    email: string
    username: string
}

const app = express()
const PORT: number = 4000

app.use(express.json())

const users: UserType[] = []
let nextId = 1

// logique métier
app.get('/users/:id', async (req, res) => {
    const id: number = Number(req.params.id)
    console.log('test route users')

    const [rows] = await pool.query(
        'SELECT id, email, name FROM users WHERE id = ?',
        [id]
    )

    res.status(200).json(rows)                         
})

app.get('/users', (req, res) => {
    const { username } = req.query

    if (!username || typeof username !== 'string') {
        return res.status(200).json(users)
    }

    const results = users.filter(user =>
        user.username.toLowerCase() === username.toLowerCase()
    )

    res.json(results)
})

    

app.post('/users', async (req, res) => {
    const { name } = req.body
    if (!name || typeof name !== 'string' || !name.trim()) {
        return res.status(400).json({ error: 'Le champ name est requis.' })
    }

    const result = await pool.query(
        'INSERT INTO users (name) VALUES (?)',
        [name.trim()]
    )                                                           
    res.status(201).json(result)                                             
})

// écouter sur un port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})