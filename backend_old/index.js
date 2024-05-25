import express from "express"
import router from './routes/mainRouter.js'
import dotenv from 'dotenv'
import { establishConnection } from "./databaseConnectionEstablisher.js"

dotenv.config({path: ['.env.local', '.env']})
const app = express()
const port = process.env.SERVICE_PORT

app.use(express.json({ extended: true }))

app.use((req, res, next) => {
    let now = new Date()
    console.log(`${now.getHours()}:${now.getMinutes()}:${now.getSeconds()} ${req.method} ${req.url} request`)
    next()
})

//API requests
app.use('/api', router)

app.listen(port, () => {
    establishConnection()
    console.log(`Educational Platform listening on port ${port}`)
})