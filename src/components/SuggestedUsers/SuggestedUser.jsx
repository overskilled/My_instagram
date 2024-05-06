import { Avatar, Box, Button, Flex, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'

const SuggestedUser = ({ name, followers, avatar }) => {
    const  [isFollowed, setIsFollowed] = useState(false)

    return (
        <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
            <Flex alignItems={"center"} gap={2}>
                <Avatar src={avatar} name={name} size={"md"} />
                <VStack spacing={2}>
                    <Box fontSize={12} fontWeight={"bold"}>
                        {name}
                    </Box>
                    <Box fontSize={11} color={"gray.500"} alignSelf={"start"}>
                        {followers} followers
                    </Box>
                </VStack>
            </Flex>
            <Button fontSize={13} bg={"transparent"}
                p={0}
                h={"max-content"}
                color={"blue.400"}
                fontWeight={"medium"}
                cursor={'pointer'}
                _hover={{ color: "white"}}
                onClick={() => setIsFollowed(!isFollowed)}
            >
                {isFollowed ? "UnFollow" : "Follow"}
            </Button>
        </Flex>
    )
}

export default SuggestedUser