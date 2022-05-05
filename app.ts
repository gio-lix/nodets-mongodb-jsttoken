import express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv"

//import router
import PostRouters from "./routes/posts"
import RegisterRouter from "./routes/auth"

dotenv.config({path:".env"})
const {DB_CONNECTION}: any = process.env
const app = express()
app.use(express.json())

app.use("/posts", PostRouters)
app.use("/auth", RegisterRouter)




mongoose.connect(DB_CONNECTION, () => {
    console.log("mongoose connected")
})

app.listen("3001", () => {
    console.log("port is running")
})

