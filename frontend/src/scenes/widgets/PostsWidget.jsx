import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget"

const PostsWidget = ({ userId, isProfile = false }) => {
    const dispatch = useDispatch()
    const posts = useSelector((state) => state.posts)
    const token = useSelector((state) => state.token)

    const getPosts = async () => {
        const response = await fetch("http://localhost:5000/posts", {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` }
        })
        const data = await response.json()
        console.log(data.payload)
        dispatch(setPosts({ posts: data.payload }))
    }

    const getUserPosts = async () => {
        const response = await fetch(`http://localhost:5000/${userId}/posts`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` }
        })
        const data = response.json().payload
        dispatch(setPosts({ posts: data }))
    }
    useEffect(() => {
        if (isProfile) {
            getUserPosts()
        }
        else {
            console.log("Awdawddwa")
            getPosts()
        }
    }, [])
    return (
        <>
            {posts && posts.map(
                ({
                    _id,
                    userId,
                    firstName,
                    lastName,
                    description,
                    location,
                    picturePath,
                    userPicturePath,
                    likes,
                    comments
                }) => {
                    return (<PostWidget
                        key={_id}
                        PostId={_id}
                        PostUserId={userId}
                        name={`${firstName} ${lastName}`}
                        description={description}
                        location={location}
                        picturePath={picturePath}
                        userPicturePath={userPicturePath}
                        likes={likes}
                        comments={comments}
                    />)
                }
            )}
        </>
    )
}

export default PostsWidget