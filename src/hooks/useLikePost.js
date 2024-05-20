import React, { useState } from 'react'
import useAuthStore from '../store/authStore';
import useShowToast from './useShowToast';
import { firestore } from '../firebase';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';

const useLikePost = (post) => {

    const [isUpdating, setIsUpdating] = useState(false);
    const [likes, setLikes] = useState(post.likes.length)
    const { user } = useAuthStore()
    const [isLiked, setIsLiked] = useState(post.likes.includes(user?.uid))
    const showToast = useShowToast()

    const handleLikePost = async () => {
        setIsUpdating(true)

        try {
            const postRef = doc(firestore, "posts", post.id)
            await updateDoc(postRef, {
                likes: isLiked ? arrayRemove(user.uid) : arrayUnion(user.uid)
            })

            setIsLiked(!isLiked)
            isLiked ? setLikes(likes - 1) : setLikes(likes + 1)
        } catch (error) {
            showToast("Error", error.message, "error")
        } finally {
            setIsUpdating(false)
        }
    }

    return { isLiked, likes, handleLikePost }
}

export default useLikePost