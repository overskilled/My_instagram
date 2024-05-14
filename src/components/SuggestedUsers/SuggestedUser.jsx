import { Avatar, Box, Button, Flex, VStack } from '@chakra-ui/react'
import React from 'react'
import useFollowUser from '../../hooks/useFollowUser'
import useUserProfileStore from '../../store/userProfileStore'
import useAuthStore from '../../store/authStore'

const SuggestedUser = ({ user, setUser }) => {
    const { userProfile } = useUserProfileStore()
    const authUser = useAuthStore((state) => state.user)
    const { isUpdating, isFollowing, handleFollowUser } = useFollowUser(user?.uid)

    const onFollowUser = async () => {
        await handleFollowUser();
        setUser({
            ...user,
            followers: isFollowing
                ? user.followers.filter((follower) => follower.uid !== authUser.uid)
                : [...user.followers, authUser ]
        })
    }

    return (
        <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
            <Flex alignItems={"center"} gap={2}>
                <Avatar src={user.profilePicURL} size={"md"} />
                <VStack spacing={2}>
                    <Box fontSize={12} fontWeight={"bold"}>
                        {user.fullName}
                    </Box>
                    <Box fontSize={11} color={"gray.500"} alignSelf={"start"}>
                        {user.followers.length} followers
                    </Box>
                </VStack>
            </Flex>
            {authUser.uid !== user.uid && (
                <Button
                    fontSize={13}
                    bg={"transparent"}
                    p={0}
                    h={"max-content"}
                    fontWeight={"medium"}
                    color={"blue.400"}
                    cursor={"pointer"}
                    _hover={{ color: "white" }}
                    onClick={onFollowUser}
                    isLoading={isUpdating}
                >
                    {isFollowing ? "Unfollow" : "Follow"}
                </Button>
            )}
        </Flex>
    )
}

export default SuggestedUser