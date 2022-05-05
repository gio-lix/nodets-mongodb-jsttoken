import express from "express"
import bcrypt from "bcryptjs"
import dotenv from "dotenv"
import {sign} from "jsonwebtoken"
import {Router} from "express/ts4.0";
import {registerValidation, loginValidation} from "../validation"
const router: Router = express.Router()
dotenv.config({path:"./.env"})

const {TOKEN_SECRET}: any = process.env

import Users from "../model/users";

console.log("TOKEN_SECRET -> ", TOKEN_SECRET)
router.post("/register", async (req, res) => {
    const {error} = registerValidation(req.body)

    if (error) {
        return  res.json(error.details[0].message)
    }

    const emailExist = await Users.findOne({email: req.body.email})
    if (emailExist) {
        return res.json({message: `Email "${req.body.email}" already existed`})
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    const user = new Users({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })
    try {
        const data = await user.save()
        res.status(200).send({user: data})
    } catch (err) {
         res.status(400).json({message: err})
    }
})

router.post("/login", async (req, res) => {
    const {error} = loginValidation(req.body)
    if (error) {
        return  res.json(error.details[0].message)
    }

    const user = await Users.findOne({email: req.body.email})
    if (!user) {
        return res.json({message: `Email Invalid`})
    }
    const validPassword = await bcrypt.compare(req.body.password, user.password)

    if (!validPassword) {
        return  res.json("Invalid password")
    }

    const token = sign({_id: user.id}, TOKEN_SECRET)
    res.header("auth-token", token).json(token)

})


export default router