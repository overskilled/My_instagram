import { Box, Flex, Link, VStack } from '@chakra-ui/react'
import SuggestedHeader from './SuggestedHeader'
import SuggestedUser from './SuggestedUser'
import React from 'react'
import useGetSuggestedUsers from '../../hooks/useGetSuggestedUsers'

const SuggestedUsers = () => {
    const { isLoading, suggestedUsers } = useGetSuggestedUsers()

    if (isLoading) return null;
    return (
        <VStack py={8} px={6} gap={4}>
            <SuggestedHeader />

            {suggestedUsers.length !== 0 && (
                <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
                    <Box fontSize={12} fontWeight={"bold"} color={"gray.500"} >
                        Suggested for you
                    </Box>
                    <Box fontSize={12} fontWeight={"bold"} _hover={{ color: "gray.400" }} cursor={"pointer"} >
                        See All
                    </Box>
                </Flex>
            )}

            {suggestedUsers.map((user) => (
                <SuggestedUser user={user} key={user.id} />
            ))}


            <Box fontSize={12} color={"gray.500"} mt={5} alignSelf={"start"}>
                © Copyright 2024 built by{" "}
                <Link href='https://github.com/overskilled' target='_blank' color={"blue.500"} fontSize={14}>
                    Yvan Ouatedem
                </Link>
            </Box>

        </VStack>
    )
}

export default SuggestedUsers