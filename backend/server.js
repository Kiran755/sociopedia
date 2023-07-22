import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import morgan from "morgan"
import path from "path"
import helmet from "helmet"
import multer from "multer"
import { fileURLToPath } from "url"
import { register } from "./controllers/auth.js"
import authRouter from "./routes/auth.js"
import userRouter from "./routes/users.js"
import { verifyToken } from "./middlewares/auth.js"
import postRouter from "./routes/posts.js"
import { createPost } from "./controllers/posts.js"
import { users, posts } from "./data/index.js"
import { User } from "./models/User.js"
import { Post } from "./models/Post.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config()

const app = express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))
app.use(morgan("common"))
app.use(cors())
app.use("/assets", express.static(path.join(__dirname, "/public/assets")))
console.log("firectory path :", __dirname)
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "H:/Kiran/FULLSTACK/SocialMedia/backend/public/assets")
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage })

app.post("/auth/register", upload.single("picture"), register)
app.post("/posts", upload.single("picture"), createPost)

app.use("/auth", authRouter)
app.use("/users", userRouter)
app.use("/posts", postRouter)

const PORT = process.env.PORT || 6001

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("Database connected")
        app.listen(PORT, () => {
            console.log(`Server is listening on PORT ${PORT}`)
        })
        // User.insertMany(users);
        // Post.insertMany(posts);
    })
    .catch((err) => {
        console.error(err.message)
    })
