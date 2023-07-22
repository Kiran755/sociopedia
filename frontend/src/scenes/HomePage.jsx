import React from 'react'
import Navbar from './Navbar'
import { Box, useMediaQuery } from '@mui/material'
import { useSelector } from 'react-redux'
import UserWidgets from './widgets/UserWidgets'
import MyPostWidget from './widgets/MyPostWidget'
import PostsWidget from './widgets/PostsWidget'
import AdvertWidgets from './widgets/AdvertWidgets'
import FriendList from './widgets/FriendList'


const HomePage = () => {
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)")
    const { _id, picturePath } = useSelector((state) => state.user)
    return (
        <Box>
            <Navbar />
            <Box
                width="100%"
                padding="2rem 6%"
                display={isNonMobileScreens ? "flex" : "block"}
                gap="0.5rem"
                justifyContent="space-between"
            >
                <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
                    <UserWidgets userId={_id} picturePath={picturePath} />
                </Box>
                <Box flexBasis={isNonMobileScreens ? "42%" : undefined}
                    mt={isNonMobileScreens ? undefined : "2rem"}>
                    <MyPostWidget picturePath={picturePath} />
                    <PostsWidget userId={_id} />
                </Box>
                {isNonMobileScreens && <Box flexBasis="26%">
                    <AdvertWidgets />
                    <Box m="2rem 0" />
                    <FriendList userId={_id} />
                </Box>}
            </Box>
        </Box>
    )
}

export default HomePage