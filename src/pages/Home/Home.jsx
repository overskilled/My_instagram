import { Box, Button, Container, Flex } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import FeedPosts from '../../components/FeedPosts/FeedPosts'



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
        <Container maxW={'container.lg'}>
            <Flex gap={20}>
                <Box flex={2} py={10} border={"1px solid blue"}>
                    <FeedPosts />
                </Box>
                <Box flex={3} mr={20} display={{ base: "none", lg: "block"}} maxW={"300px"} border={"1px solid red"}>
                    Suggestions
                </Box>
            </Flex>
        </Container>
    )
}

export default Home