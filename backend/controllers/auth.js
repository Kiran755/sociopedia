import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { User } from "../models/User.js"


export const register = async (req, res) => {
    try {

        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation,
        } = req.body

        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt)


        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10000)
        })

        const savedUser = await newUser.save()
        if (!savedUser) return res.status(400).json({ message: "Error occured", result: false })
        return res.status(201).json({ result: true, message: "Registeration done" })
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ error: err.message, result: false })
    }
}


export const login = async (req, res) => {
    try {

        const { email, password } = req.body
        const isUser = await User.findOne({ email: email })
        if (!isUser) return res.status(400).json({ message: "User does not exists", result: false })
        const hashed_pass = await bcrypt.compare(password, isUser.password)
        if (!hashed_pass) return res.status(400).json({ message: "Invalid credentials", result: false })
        const token = jwt.sign({ is: isUser._id }, process.env.jwt_secrect_key)
        delete isUser.password
        return res.status(200).json({ message: "User logged im", result: true, payload: token, user: isUser })

    } catch (err) {
        console.log(err.message)
        return res.status(500).json({ error: err.message, result: false })
    }
}