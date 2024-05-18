import { Box, Button, Flex, Input, InputGroup, InputRightElement, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { CommentLogo, NotificationsLogo, UnlikeLogo } from '../../assets/constants'
import useUserProfileStore from '../../store/userProfileStore'

const PostFooter = ({ username, isProfilePage }) => {
    const [liked, setLiked] = useState(false)
    const [likes, setLikes] = useState(1000)
    const { userProfile } = useUserProfileStore()

    const handleLike = () => {
        if (liked) {
            setLiked(false)
            setLikes(likes - 1)
        } else {
            setLiked(true)
            setLikes(likes + 1)
        }
    }

    return (
        <Box mb={10} mt={"auto"}>
            <Flex alignItems={"center"} gap={4} w={"full"} pt={0} mb={2} mt={4}>
                <Box onClick={handleLike} cursor={'pointer'} fontSize={18}>
                    {!liked ? <NotificationsLogo /> : <UnlikeLogo />}
                </Box>
                <Box cursor={'pointer'} fontSize={18}>
                    <CommentLogo />
                </Box>
            </Flex>
            <Text fontWeight={600} fontSize={"sm"}>
                {likes} Likes
            </Text>
            {!isProfilePage && (
                <>
                    <Text fontSize={'sm'} fontWeight={700}>
                        {username}_{" "}
                        <Text as='span' fontWeight={400}>feeling Good</Text>
                    </Text>
                    <Text fontSize={'sm'} color={"gray"}>
                        View all 1,000 comments
                    </Text>
                </>
            )}

            <Flex
                alignItems={"center"}
                gap={2}
                justifyContent={"space-between"}
                w={"full"}
            >
                <InputGroup>
                    <Input variant={'flushed'} placeholder={"Add a comment..."} fontSize={14} />
                    <InputRightElement>
                        <Button
                            fontSize={14}
                            color={"blue.400"}
                            fontWeight={600}
                            cursor={'pointer'}
                            _hover={{ color: "white" }}
                            bg={'transparent'}
                        >Post</Button>
                    </InputRightElement>
                </InputGroup>
            </Flex>
        </Box>
    )
}

export default PostFooter