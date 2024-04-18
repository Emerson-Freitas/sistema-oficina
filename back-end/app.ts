import express from 'express'
import cors from 'cors'
import { Request, Response } from 'express'
import router from './src/routes'
import dotenv from 'dotenv'
import path from 'path'
dotenv.config()

const app = express()
app.use(cors({
	origin: 'http://localhost:5173',
    exposedHeaders: ['Content-Disposition'],
}))
app.use(express.json())
app.use(router)

app.use(
    '/files',
    express.static(path.resolve(__dirname, 'tmp'))
)

app.get('/running', (req: Request, res: Response) => {
   return res.json({ running: true })
})

export { app } 