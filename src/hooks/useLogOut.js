import React from 'react'
import { useSignOut } from 'react-firebase-hooks/auth';
import useShowToast from './useShowToast';
import { auth } from '../firebase';

const useLogOut = () => {
    const [signOut, isLoggingOut, error] = useSignOut(auth);
    const showToast =  useShowToast()

    const handleLogout = async () => {
        try {
            await signOut()
            localStorage.removeItem('user-info')
        } catch (error) {
            showToast("Error", error.message, "error")
        }
    }

    return  { handleLogout, isLoggingOut, error }
}

export default useLogOut