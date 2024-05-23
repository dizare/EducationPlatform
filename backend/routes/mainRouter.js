import Router from "express"
import authRouter from "./auth.js"
import tasksRouter from "./tasks.js"

const router = new Router()

router.use('/auth', authRouter)
router.use('/tasks', tasksRouter)

export default router