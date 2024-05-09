import { Avatar, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { BiComment } from 'react-icons/bi'

const Comment = ({ createdAt, username, profilepic, text }) => {
    return (
        <Flex gap={4} alignItems={"center"}>
            <Avatar src={profilepic} name={username} size={"sm"} />
            <Flex direction={"column"} justifyContent={"space-between"}>
                <Flex gap={2} alignItems={"center"}>
                    <Text fontWeight={"bold"} fontSize={12}>
                        {username}
                    </Text>
                    <Text fontSize={14}>{text}</Text>
                </Flex>
                <Flex>
                    <Text color={'gray.600'} fontSize={12}>{createdAt}</Text>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default Comment