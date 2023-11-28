import express from 'express'
import cors from 'cors'
import { Request, Response } from 'express'
import router from './src/routes'

const app = express()
app.use(cors())
app.use(express.json())
app.use(router)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server is running: ${PORT}`))

