import { User } from "../models/User.js";


const getFormattedFriends = async (user) => {
    const friends = await Promise.all(
        user.friends.map((id) => User.findById(id))
    )
    const formattedFriends = friends.map((
        _id, firstName, lastName, occupation, location, picturePath
    ) => { return { _id, firstName, lastName, occupation, location, picturePath } })
    return formattedFriends
}

export const getUser = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findById(id)
        res.status(200).json({ message: "User Fetched", result: true, payload: user })

    } catch (e) {
        res.status(500).json({ error: e.message, result: false })
    }
}

export const getUserFriends = async (req, res) => {
    try {

        const { id } = req.params

        const user = await User.findById(id)

        const formattedFriends = await getFormattedFriends(user)

        return res.status(200).json({ message: "result fetched", result: true, payload: formattedFriends })
    } catch (e) {
        return res.status(500).json({ error: e.message, result: false })
    }
}

export const addRemoveFriend = async (req, res) => {
    try {
        const { id, friendId } = req.params
        const user = await User.findById(id)
        const friend = await User.findById(friendId)
        if (user.friends.includes(friendId)) {
            user.friends = user.friends.filter((id) => id !== friendId)
            friend.friends = friend.friends.filter((id) => id !== id)
        } else {
            user.friends.push(friendId)
            friend.friends.push(id)
        }
        await user.save()
        await friend.save()
        const friendsFormatted = await getFormattedFriends(user)

        return res.status(200).json({ message: "friends added", result: true, payload: friendsFormatted })

    } catch (e) {
        return res.status(500).json({ error: e.message, result: false })
    }
}