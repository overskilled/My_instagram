import { Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'

const GoogleAuth = () => {
    return (
        <>
            <Flex justifyContent={'center'} alignItems={'center'} cursor={'pointer'}>
                <Image src='/google.png' w={6} alt='Google logo' />
                <Text mx={2} color={"blue.500"}>
                    Log in with Google
                </Text>
            </Flex>
        </>
    )
}

export default GoogleAuth