import { Box, Container, Flex, Image, VStack } from '@chakra-ui/react'
import React from 'react'
import AuthForm from '../../components/AuthForm/AuthForm';

const Auth = () => {
    return (
        <Flex minH={"100vh"} justifyContent={"center"} alignItems={"center"} px={4}>
            <Container maxW={"container.md"} padding={0}>
                <Flex gap={10} justifyContent={"center"} alignItems={"center"}>
                    {/** Left side */}
                    <Box display={{ base: "none", md: "block" }}>
                        <Image src='/auth.png' h={650} alt='phone image' />
                    </Box>

                    {/** right side */}
                    <VStack spacing={4} align={"stretch"}>
                        <AuthForm />
                        <Box textAlign={"center"}>Get the app.</Box>
                        <Flex gap={5} justify={"center"}>
                            <Image src='/playstore.png' h={"10"} alt='Playstore logo' />
                            <Image src='/microsoft.png' h={"10"} alt='Microsoft logo' />
                        </Flex>
                    </VStack>
                </Flex>

            </Container>
        </Flex>
    );
};

export default Auth