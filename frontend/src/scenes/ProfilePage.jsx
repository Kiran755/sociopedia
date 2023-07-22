import React from 'react'
import { Box, useMediaQuery } from '@mui/material'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from "react-router-dom"
import Navbar from './Navbar'
import FriendList from './widgets/FriendList'
import MyPostWidget from './widgets/MyPostWidget'
import PostsWidget from './widgets/PostsWidget'
import UserWidgets from './widgets/UserWidgets'

const ProfilePage = () => {
    const [user, setUser] = useState(null)
    const { userId } = useParams()
    const token = useSelector((state) => state.token)
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)")

    const getUser = async () => {
        const response = await fetch(`http://localhost:5000/users/${userId}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` }

        })
        const data = await response.json()
        setUser(data)
    }
    useEffect(() => {
        getUser()
    }, [])
    if (!user) return null
    return (
        <Box>
            <Navbar />
            <Box
                width="100%"
                padding="2rem 6%"
                display={isNonMobileScreens ? "flex" : "block"}
                gap="2rem"
                justifyContent="center"
            >
                <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
                    <UserWidgets userId={userId} picturePath={user.picturePath} />
                    <Box m="2rem 0" />
                    <FriendList userId={userId} />
                </Box>
                <Box flexBasis={isNonMobileScreens ? "42%" : undefined}
                    mt={isNonMobileScreens ? undefined : "2rem"}>
                    <MyPostWidget picturePath={user.picturePath} />
                    <Box m="2rem 0" />
                    <PostsWidget userId={userId} />
                </Box>

            </Box>
        </Box>
    )
}

export default ProfilePage