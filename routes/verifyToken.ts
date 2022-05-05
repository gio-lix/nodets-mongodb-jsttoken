import {verify} from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({path:"./.env"})
const {TOKEN_SECRET}: any = process.env

export default function (req: any, res: any, next: any) {
    const token = req.header("auth-token")
    if (!token) return res.status(401).send("Access-Denied")

    try {
        const existToken = verify(token, TOKEN_SECRET)
        req.user = existToken
        next()
    } catch (err) {
        res.json({message: "Invalid User"})
    }
}