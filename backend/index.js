import express from "express"
import router from './routes/mainRouter.js'

const app = express()
const port = 8080

app.use(express.json({ extended: true }))

app.use((req, res, next) => {
    let now = new Date()
    console.log(`${now.getHours()}:${now.getMinutes()}:${now.getSeconds()} ${req.method} ${req.url} request`)
    next()
})

//API requests
app.use('/api', router)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})