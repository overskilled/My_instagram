import { Alert, AlertIcon, Box, Flex, Image, Text, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import Login from './Login'
import Signup from './Signup'
import GoogleAuth from './GoogleAuth'

const AuthForm = () => {
    const [isLogin, setIslogin] = useState(true)
    const [error, setError] = useState('')

    return (
        <>
            <Box border={"1px solid gray"} borderRadius={4} padding={5}>
                <VStack spacing={4}>
                    <Image src='/logo.png' h={24} cursor={'pointer'} alt='Instagram' />

                    {isLogin ? <Login /> : <Signup />}

                    {/** Or text */}
                    <Flex alignItems={'center'} justifyContent={'center'} my={4} gap={1} w={'full'}>
                        <Box flex={2} h={'1px'} bg={"gray.400"} />
                        <Text mx={1} color={"white"}>OR</Text>
                        <Box flex={2} h={'1px'} bg={"gray.400"} />
                    </Flex>

                    {/** Google button */}
                    <GoogleAuth prefix={isLogin ? "Log in" : "Sign up"} />
                </VStack>
            </Box>

            {/** Don't have an account box */}
            <Box border={'1px solid gray'} padding={5} borderRadius={4}>
                <Flex alignItems={'center'} justifyContent={'center'}>
                    <Box mx={2} fontSize={14}>
                        {isLogin ? "Don't have an account?" : "Already have an account?"}
                    </Box>
                    <Box onClick={() => setIslogin(!isLogin)} color={"blue.500"} fontSize={14} cursor={'pointer'}>
                        {isLogin ? "Sign up" : "Log in"}
                    </Box>
                </Flex>
            </Box>
        </>
    )
}

export default AuthForm