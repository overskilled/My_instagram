import { Alert, AlertIcon, Box, Button, Flex, Image, Input, Text, VStack } from '@chakra-ui/react'
import React, { useRef, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

const AuthForm = () => {
    const [isLogin, setIslogin] = useState(true)
    const emailRef = useRef()
    const passwordRef = useRef()
    const confirmpasswordRef = useRef()
    const { login, signup } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()


    const handleAuth = () => {
        setError('')
        if (!emailRef.current.value || !passwordRef.current.value ){
            setError("Please fill all the fields")
            return;
        }

        navigate('/')
    }



    return (
        <>
            <Box border={"1px solid gray"} borderRadius={4} padding={5}>
                {error && <Alert status='error' justifyContent={'center'}>
                    <AlertIcon />
                    {error}
                </Alert>}
                <VStack spacing={4}>
                    <Image src='/logo.png' h={24} cursor={'pointer'} alt='Instagram' />
                    <Input
                        placeholder='Email'
                        fontSize={14}
                        type='email'
                        ref={emailRef}
                    />
                    <Input
                        placeholder='Password'
                        fontSize={14}
                        type='password'
                        ref={passwordRef}
                    />

                    {!isLogin ?
                        <Input
                            placeholder='Confirm Password'
                            fontSize={14}
                            type='password'
                            ref={confirmpasswordRef}
                        />
                        : null
                    }

                    {/** Submit button */}
                    <Button w={"full"} colorScheme='blue' size={"sm"} fontSize={14} onClick={handleAuth} disable={loading} >
                        {isLogin ? "Log In" : "Sign Up"}
                    </Button>

                    {/** Or text */}
                    <Flex alignItems={'center'} justifyContent={'center'} my={4} gap={1} w={'full'}>
                        <Box flex={2} h={'1px'} bg={"gray.400"} />
                        <Text mx={1} color={"white"}>OR</Text>
                        <Box flex={2} h={'1px'} bg={"gray.400"} />
                    </Flex>

                    {/** Google button */}
                    <Flex justifyContent={'center'} alignItems={'center'} cursor={'pointer'}>
                        <Image src='/google.png' w={6} alt='Google logo' />
                        <Text mx={2} color={"blue.500"}>
                            Log in with Google
                        </Text>
                    </Flex>
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