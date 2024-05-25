import Router from "express"
import {body, check, validationResult} from 'express-validator'

const authRouter = new Router()


authRouter.post('/register', [
    check('email', 'Некорректный e-mail').isEmail(),
    check('password', 'Некорректная длина пароля (мин. 7 символов)').isLength({min: 7}),
    check('lastname', 'Некорректная фамилия').exists(),
    check('firstname', 'Некорректное имя').exists()
], async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
            message: 'Некорректные данные при регистрации'
        })
    }

    const { email, password, firstname, lastname } = req.body

    return res.status(200).json({
        errors: Array.of()
    })
})


export default authRouter