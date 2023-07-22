import { Router } from "express"
import { verifyToken } from "../middlewares/auth.js"
import { addRemoveFriend, getUser, getUserFriends } from "../controllers/Users.js"

const userRouter = Router()

userRouter.get("/:id", verifyToken, getUser)
userRouter.get("/:id/friends", verifyToken, getUserFriends)


userRouter.patch("/:id/:friendId", verifyToken, addRemoveFriend)


export default userRouter