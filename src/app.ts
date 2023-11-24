import express, { Application, Request, Response } from 'express'
const app: Application = express()
import cors from 'cors'
import { UsersRoutes } from './app/modules/users/users.route'

// parser
app.use(express.json())
app.use(cors())

// *** application routes

app.use('/', UsersRoutes)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

export default app
