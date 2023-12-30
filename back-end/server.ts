import express from 'express'
import cors from 'cors'
import { Request, Response } from 'express'
import router from './src/routes'
import dotenv from 'dotenv'
import path from 'path'
dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())
app.use(router)

app.use(
    '/files',
    express.static(path.resolve(__dirname, '..', 'tmp'))
)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server is running: ${PORT}`))

