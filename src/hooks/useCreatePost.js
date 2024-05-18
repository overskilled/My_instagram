import React, { useState } from 'react'
import useShowToast from './useShowToast'
import useAuthStore from '../store/authStore'
import usePostStore from '../store/postStore'
import useUserProfileStore from '../store/userProfileStore'
import { useLocation } from 'react-router-dom'
import { addDoc, arrayUnion, collection, doc, updateDoc } from 'firebase/firestore'
import { firestore, storage } from '../firebase'
import { getDownloadURL, ref, uploadString } from 'firebase/storage'

const useCreatePost = () => {
    const showToast = useShowToast()
    const [isLoading, setIsLoading] = useState(false)
    const { user } = useAuthStore()
    const { createPost } = usePostStore()
    const { addPost } = useUserProfileStore()
    const { pathname } = useLocation()

    const handleCreatePost = async (selectedFile, caption) => {
        if(isLoading) return;
        if (!selectedFile) return showToast("Error", "Please select an image", "error");
        setIsLoading(true)
        const newPost = {
            caption: caption,
            likes: [],
            comments: [],
            createdAt: Date.now(),
            createdBy: user.uid,
        }

        try {
            const postDocRef = await addDoc(collection(firestore, "posts"), newPost)
            const userDocRef = doc(firestore, "users", user.uid)
            const imageRef = ref(storage, `posts/${postDocRef.id}`)

            await updateDoc(userDocRef, { posts: arrayUnion(postDocRef.id) })

            await uploadString(imageRef, selectedFile, "data_url")
            const downloadURL = await getDownloadURL(imageRef)

            await updateDoc(postDocRef, { imageURL: downloadURL })

            newPost.imageURL = downloadURL;

            createPost({ ...newPost, id: postDocRef.id })
            addPost({ ...newPost, id: postDocRef.id })

            showToast("Success", "Post published successfully", "success")

        } catch (error) {
            showToast("Error", error.message, "error");
        } finally {
            setIsLoading(false)
        }
    }
    return { isLoading, handleCreatePost }
}

export default useCreatePost