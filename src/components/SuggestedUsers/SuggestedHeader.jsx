import { Avatar, Flex, Link, Text } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import React from 'react'

const SuggestedHeader = () => {
    return (
        <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
            <Flex alignItems={"center"} gap={2}>
                <Avatar name='Yvan Ouatedem' size={"md"} src='/img2.png' />
                <Text fontSize={12} fontWeight={"bold"}>
                    Yvan Ouatedem
                </Text>
            </Flex>
            <Link as={RouterLink} to={"/auth"}
                color={"blue.500"}
                fontSize={14}
                fontWeight={"medium"}
                style={{ textDecoration: "none" }}
                cursor={"pointer"} 
            >
                Log out
            </Link>
        </Flex>
    )
}

export default SuggestedHeader