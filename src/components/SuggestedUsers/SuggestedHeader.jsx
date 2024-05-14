import { Avatar, Button, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import useLogOut from '../../hooks/useLogOut'
import useAuthStore from '../../store/authStore'
import { Link } from 'react-router-dom'

const SuggestedHeader = () => {
    const { handleLogout, isLoggingOut } = useLogOut()
    const authUser = useAuthStore(state => state.user)

    if (!authUser) return null;

    return (
        <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
            <Flex alignItems={"center"} gap={2}>
                <Link to={`${authUser.username}`} >
                    <Avatar size={"md"} src={authUser.profilePicURL} referrerpolicy="no-referrer" />
                </Link>
                <Link to={`${authUser.username}`} >
                    <Text fontSize={12} fontWeight={"bold"}>
                        {authUser.username}
                    </Text>
                </Link>
            </Flex>
            <Button size={"sm"} background={"transparent"} _hover={{ background: "transparent" }}
                color={"blue.500"}
                fontSize={14}
                fontWeight={"medium"}
                onClick={handleLogout}
                isLoading={isLoggingOut}
                cursor={"pointer"}
            >
                Log out
            </Button>
        </Flex>
    )
}

export default SuggestedHeader