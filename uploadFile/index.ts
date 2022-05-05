import multer from "multer";
import express from "express"
import {Router} from "express/ts4.0";
const router: Router = express.Router()
import {nanoid} from "nanoid";

const uploader = multer({
    storage: multer.diskStorage({
        destination: function (_, __, cb) {
            cb(null, "http://localhost:3000/public/avatars")
        },
        filename: function (_, file, cb) {
            cb(null, file.fieldname + '-' + nanoid(6) + "." + file.mimetype.split('/').pop())
        }
    })
})
router.post("/upload", uploader.single("photo"), (req , res) => {
    res.send(req.file)
})
