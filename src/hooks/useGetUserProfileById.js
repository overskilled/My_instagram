import React, { useEffect, useState } from 'react'
import useShowToast from './useShowToast'
import { doc, getDoc } from 'firebase/firestore'
import { firestore } from '../firebase'

const useGetUserProfileById = (userId) => {
    const [isLoading, setIsLoading] = useState(false)
    const [userProfile, setUserProfile] = useState("")
    const showToast = useShowToast()

    useEffect(() => {
        const getUserProfileById = async () => {
            setIsLoading(true)
            setUserProfile("")
            try {
                const docRef = doc(firestore, "users", userId);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setUserProfile(docSnap.data())
                }
            } catch (error) {
                showToast("Error", error.message, "error")
            } finally {
                setIsLoading(false)
            }

        }

        getUserProfileById()
    }, [userId, showToast])

    return { isLoading, userProfile }
}

export default useGetUserProfileById