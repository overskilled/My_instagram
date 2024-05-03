import { Button } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'



const Home = () => {
    const { currentUser, logout } = useAuth()
    const [error, setError] = useState('')
    const navigate = useNavigate()

    async function handleLogout() {
        setError('')

        try {
            await logout()
            navigate("/")
        } catch (error) {
            setError("Failed to log out")
        }
    }

    return (
        <>
            <div>Mother fuck the big 3 nigga is just big me! nigga bomb</div>
            <Button onClick={handleLogout}>Log out</Button>
        </>
    )
}

export default Home