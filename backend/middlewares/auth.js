import jwt from "jsonwebtoken"

export const verifyToken = (req, res, next) => {
    try {
        let token = req.header("Authorization")
        if (!token)
            return res.status(403).json({ message: "Access Denied", result: false })
        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimLeft()
        }
        const verified = jwt.verify(token, process.env.jwt_secrect_key)
        req.user = verified
        next()
    } catch (e) {
        res.status(500).json({ error: e.message, result: false })
    }
}