import Router from "express"
const authRouter = new Router()


authRouter.post('/', async (req, res) => {
    const { id, surname, name } = req.body
    console.log(id, name, surname)
    return res.status(200).json({
        errors: Array.of()
    })
})


export default authRouter