import Router from "express"

const tasksRouter = new Router()

tasksRouter.post('/', async (req, res) => {
    const { id, surname, name } = req.body
    console.log(id, name, surname)
    return res.status(501).json({
        errors: Array.of('Not implemented')
    })
})

export default tasksRouter