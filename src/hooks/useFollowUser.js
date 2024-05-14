import React, { useEffect, useState } from 'react'
import useAuthStore from '../store/authStore'
import useShowToast from './useShowToast'
import { firestore } from '../firebase'
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore'
import useUserProfileStore from '../store/userProfileStore'

const useFollowUser = (userId) => {
    const [isUpdating, setIsUpdating] = useState(false)
    const [isFollowing, setIsFollowing] = useState(false)
    const { setUserProfile, userProfile } = useUserProfileStore()
    const { user, setUser } = useAuthStore()
    const showToast = useShowToast()

    const handleFollowUser = async () => {
        setIsUpdating(true)

        try {
            const currentUserRef = doc(firestore, "users", user.uid)
            const userToFollowOrUnFollowRef = doc(firestore, "users", userId)

            await updateDoc(currentUserRef, {
                following: isFollowing ? arrayRemove(userId) : arrayUnion(userId)
            })

            await updateDoc(userToFollowOrUnFollowRef, {
                followers: isFollowing ? arrayRemove(user.uid) : arrayUnion(user.uid)
            })

            if (isFollowing) {
                //if user is  following : unfollow
                setUserProfile({
                    ...userProfile,
                    followers: user.followers.filter(uid => uid !== user.uid)
                })
                setUser({
                    ...user,
                    following: user.following.filter(uid => uid !== userId)
                })

                localStorage.setItem("user-info", JSON.stringify({
                    ...user, 
                    following: user.following.filter(uid => uid !== userId)
                }))
                setIsFollowing(false)
            } else {
                //if user is not following : follow
                setUserProfile({
                    ...userProfile,
                    followers: [...userProfile.followers, user.uid]
                })
                setUser({
                    ...user,
                    following: [...userProfile.following, userId]
                })

                localStorage.setItem("user-info", JSON.stringify({
                    ...user, 
                    following: [...userProfile.following, userId]
                }))

                setIsFollowing(true)
            }

        } catch (error) {
            showToast("Error", error.message, "error")
        } finally {
            setIsUpdating(false)
        }

    }

    useEffect(() => {
        const isFollowing = user.following.includes(userId)
        setIsFollowing(isFollowing)
    }, [user, userId])

    return { isUpdating, isFollowing, handleFollowUser }

}

export default useFollowUser