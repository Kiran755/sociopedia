import express from "express"
import { verifyToken } from "../middlewares/auth.js"
import { getFeedPosts, getUserPosts, likePost } from "../controllers/posts.js"


const postRouter = express.Router()

// postRouter.post("/posts")
postRouter.get("/", verifyToken, getFeedPosts)
postRouter.get("/:userId/posts", verifyToken, getUserPosts)

postRouter.patch("/:id/like", verifyToken, likePost)

export default postRouter

