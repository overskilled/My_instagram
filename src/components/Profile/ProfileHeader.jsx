import { Avatar, AvatarGroup, Button, Flex, Text, VStack, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import useUserProfileStore from '../../store/userProfileStore'
import useAuthStore from '../../store/authStore';
import EditProfile from '../../components/Profile/EditProfile'
import useFollowUser from '../../hooks/useFollowUser';


const ProfileHeader = () => {
    const { userProfile } = useUserProfileStore();
    const { user } = useAuthStore()
    const visitingOwnProfileAndAuth = user && user.username === userProfile.username;
    const visitingAnotherProfileandAuth = user && user.username !== userProfile.username;
    const { isOpen, onOpen, onClose } = useDisclosure()

    const { isUpdating, isFollowing, handleFollowUser } = useFollowUser(userProfile?.uid)

    return (
        <Flex gap={{ base: 4, sm: 10 }} py={10} direction={{ base: "column", sm: "row" }}>
            <AvatarGroup size={{ base: "xl", md: "2xl" }} justifySelf={"center"} alignSelf={"flex-start"} mx={"auto"}>
                <Avatar src={userProfile.profilePicURL} alt="Ouatedem Yvan" />
            </AvatarGroup>

            <VStack alignItems={"start"} gap={2} mx={"auto"} flex={1}>
                <Flex
                    gap={4}
                    direction={{ base: "column", sm: "row" }}
                    justifyContent={{ base: "center", sm: "flex-start" }}
                    alignItems={"center"}
                    w={"full"}
                >
                    <Text fontSize={{ base: "sm", md: "lg" }}>{userProfile.username}</Text>
                    {visitingOwnProfileAndAuth && (
                        <Flex gap={4} alignItems={"center"} justifyContent={"center"}>
                            <Button bg={"white"} color={'black'} _hover={{ bg: "whiteAlpha.800" }} size={{ base: "xs", md: "sm" }} onClick={onOpen}>
                                Edit Profile
                            </Button>
                        </Flex>
                    )}
                    {visitingAnotherProfileandAuth && (
                        <Flex gap={4} alignItems={"center"} justifyContent={"center"}>
                            <Button
                                bg={"blue.500"}
                                color={'white'}
                                _hover={{ bg: "blue.600" }}
                                size={{ base: "xs", md: "sm" }}
                                onClick={handleFollowUser}
                                isLoading={isUpdating}
                            >
                                {isFollowing ? "Unfollow" : "Follow"}
                            </Button>
                        </Flex>
                    )}
                </Flex>

                <Flex alignItems={"center"} gap={{ base: 2, sm: 4 }} mt={4}>
                    <Text fontSize={{ base: "xs", md: "sm" }}>
                        <Text as={"span"} fontWeight={"bold"} mr={1}>{userProfile.posts.length}</Text>
                        Posts
                    </Text>
                    <Text fontSize={{ base: "xs", md: "sm" }}>
                        <Text as={"span"} fontWeight={"bold"} mr={1}>{userProfile.followers.length}</Text>
                        Followers
                    </Text>
                    <Text fontSize={{ base: "xs", md: "sm" }}>
                        <Text as={"span"} fontWeight={"bold"} mr={1}>{userProfile.following.length}</Text>
                        Following
                    </Text>
                </Flex>
                <Flex justifyContent={"center"} gap={4} mt={2}>
                    <Text fontSize={"sm"} fontWeight={"bold"}>
                        {userProfile.fullName}
                    </Text>
                </Flex>
                <Text fontSize={"sm"}>{userProfile.bio}</Text>
            </VStack>

            {isOpen && <EditProfile isOpen={isOpen} onClose={onClose} />}
        </Flex>
    )
}

export default ProfileHeader