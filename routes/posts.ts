import express from "express"
import {Router} from "express/ts4.0";
const router: Router = express.Router()
import verify from "./verifyToken"

import Posts from "../model/posts"


router.get("/", verify,async (req, res) => {
    try {
        const posts = await Posts.find()
        res.json(posts)
    } catch (err) {
        res.json({message: err})
    }
})

router.get("/:postsId", async (req,res) => {
    try {
        const post = await Posts.findById(req.params.postsId)
        res.json(post)
    } catch (err) {
        res.json({message: err})
    }
})

router.post("/", async (req, res) => {
    const post = new Posts({
        title: req.body.title,
        description: req.body.description
    })
    try {
        const savePosts = await post.save()
        res.json(savePosts)
    } catch (err) {
         res.json({message: err})
    }
})

router.patch("/:postId", async (req, res) => {
    try {
        const updatePosts = await Posts.updateOne(
            {_id: req.params.postId},
            {$set: {
                    title: req.body.title,
                    description: req.body.description
                }}
            )
        res.json(updatePosts)
    } catch (err) {
        res.json({message: err})
    }
})

router.delete("/:postId", async (req, res) => {
    try {
        const postDelete = await Posts.remove({_id: req.params.postId})
        res.json(postDelete)
    } catch (err) {
        res.json({message: err})
    }
})


export default router;