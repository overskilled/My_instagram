import { Box, Button, Container, Flex } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import FeedPosts from '../../components/FeedPosts/FeedPosts'
import SuggestedUsers from '../../components/SuggestedUsers/SuggestedUsers'



const Home = () => {
    const { currentUser } = useAuth()

    return (
        <Container maxW={'container.lg'}>
            <Flex gap={20}>
                <Box flex={2} py={10} >
                    <FeedPosts />
                </Box>
                <Box flex={3} mr={20} display={{ base: "none", lg: "block"}} maxW={"300px"}>
                    <SuggestedUsers />
                </Box>
            </Flex>
        </Container>
    )
}

export default Home