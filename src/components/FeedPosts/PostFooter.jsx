import { Box, Button, Flex, Input, InputGroup, InputRightElement, Text } from '@chakra-ui/react'
import React, { useRef, useState } from 'react'
import { CommentLogo, NotificationsLogo, UnlikeLogo } from '../../assets/constants'
import useUserProfileStore from '../../store/userProfileStore'
import usePostComment from '../../hooks/usePostComment'
import useLikePost from '../../hooks/useLikePost'

const PostFooter = ({ post, username, isProfilePage }) => {
    const commentRef = useRef()
    const { userProfile } = useUserProfileStore()
    const { isCommenting, handlePostComment } = usePostComment()
    const [comment, setComment] = useState("")
    const { isLiked, likes, handleLikePost } = useLikePost(post)

    const handleSubmitComment = async () => {
        await handlePostComment(post.id, comment)
        setComment("")
    }


    return (
        <Box mb={10} mt={"auto"}>
            <Flex alignItems={"center"} gap={4} w={"full"} pt={0} mb={2} mt={4}>
                <Box onClick={handleLikePost} cursor={'pointer'} fontSize={18}>
                    {!isLiked ? <NotificationsLogo /> : <UnlikeLogo />}
                </Box>
                <Box cursor={'pointer'} fontSize={18}
                    onClick={() => commentRef.current.focus()}
                >
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
                    <Input
                        variant={'flushed'}
                        placeholder={"Add a comment..."}
                        fontSize={14}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        ref={commentRef}
                    />
                    <InputRightElement>
                        <Button
                            fontSize={14}
                            color={"blue.400"}
                            fontWeight={600}
                            cursor={'pointer'}
                            _hover={{ color: "white" }}
                            bg={'transparent'}
                            isLoading={isCommenting}
                            onClick={handleSubmitComment}
                        >
                            Post
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </Flex>
        </Box>
    )
}

export default PostFooter