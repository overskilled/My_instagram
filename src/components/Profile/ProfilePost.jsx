import { Button, Divider, Flex, GridItem, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Text, VStack, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'
import { AiFillHeart } from 'react-icons/ai'
import { FaComment } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import Comment from '../Comment/Comment'
import PostFooter from '../FeedPosts/PostFooter'
import useUserProfileStore from '../../store/userProfileStore'
import { firestore, storage } from '../../firebase'
import { deleteObject, ref } from 'firebase/storage'
import useAuthStore from '../../store/authStore'
import { arrayRemove, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import useShowToast from '../../hooks/useShowToast'
import usePostStore from '../../store/postStore'
import Caption from '../Comment/Caption'
import useLikePost from '../../hooks/useLikePost'

const ProfilePost = ({ post }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { userProfile } = useUserProfileStore() 
    const { user } = useAuthStore()
    const showToast = useShowToast()
    const [isDeleting, setIsDeleting] = useState(false)
    const { deletePost } = usePostStore()
    const { likes } = useLikePost(post)
    const deletePostFromProfile = useUserProfileStore((state) => state.deletePost)
    console.log(post)

    const handleDeletePost = async () => {
        if (!window.confirm("Are you sure you want to delete this post?")) return;
        if (isDeleting) return;

        try {
            const imageRef = ref(storage, `posts/${post.id}`)
            await deleteObject(imageRef)
            const userRef = doc(firestore, "users", user.uid)
            await deleteDoc(doc(firestore, "posts", post.id))

            await updateDoc(userRef, {
                posts: arrayRemove(post.id)
            })

            deletePost(post.id)
            deletePostFromProfile(post.id)
            showToast("Success", "Post deleted successfull")

        } catch (error) {
            showToast("Error", error.message, "error")
        }
    }


    return (
        <>
            <GridItem
                cursor={"pointer"}
                borderRadius={4}
                overflow={"hidden"}
                border={"1px solid"}
                borderColor={"whiteAlpha.300"}
                position={"relative"}
                aspectRatio={1 / 1}
                onClick={onOpen}
            >

                <Flex
                    opacity={0}
                    _hover={{ opacity: 1 }}
                    position={"absolute"}
                    top={0}
                    left={0}
                    right={0}
                    bottom={0}
                    bg={"blackAlpha.700"}
                    transition={"all 0.3s ease"}
                    zIndex={1}
                    justifyContent={"center"}
                >
                    <Flex
                        alignItems={"center"} justifyContent={"center"} gap={50}
                    >
                        <Flex>
                            <AiFillHeart size={20} />
                            <Text fontWeight={"bold"} ml={2}>
                                {likes}
                            </Text>
                        </Flex>
                        <Flex>
                            <FaComment size={20} />
                            <Text fontWeight={"bold"} ml={2}>
                                {post.comments.length}
                            </Text>
                        </Flex>
                    </Flex>
                </Flex>

                <Image src={post.imageURL} alt='post image' objectFit={"cover"} w={"100%"} h={"100%"} />
            </GridItem>

            <Modal isOpen={isOpen} onClose={onClose}
                isCentered
                motionPreset='slideInBottom'
                size={{ base: "3xl", md: "5xl" }}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton />
                    <ModalBody bg={"black"} pb={5}>
                        <Flex
                            gap={4}
                            w={{ base: "90%", sm: "70%", md: "full" }}
                            mx={"auto"}
                            maxH={"90vh"}
                            minH={"60vh"}
                        >
                            <Flex
                                borderRadius={4}
                                overflow={"hidden"}
                                border={"1px solid"}
                                borderColor={"whiteAlpha.300"}
                                flex={1.5}
                                justifyContent={"center"}
                                alignItems={"center"}
                            >
                                <Image src={post.imageURL} alt='profile post' />
                            </Flex>
                            <Flex flex={1} flexDirection={"column"} px={10} display={{ base: "none", md: "flex" }}>

                                <Flex alignItems={"center"} justifyContent={"space-between"}>
                                    <Flex gap={4} alignItems={"center"}>
                                        {post.caption && (
                                            <Caption post={post} />
                                        )}
                                    </Flex>

                                    {user?.uid === userProfile.uid && (
                                        <Button
                                            _hover={{ bg: "whiteAlpha.300", color: "red.600" }}
                                            borderRadius={4}
                                            p={1}
                                            onClick={handleDeletePost}
                                            isLoading={isDeleting}
                                        >
                                            <MdDelete size={20} cursor={"pointer"} />
                                        </Button>
                                    )}
                                </Flex>
                                <Divider my={5} bg={"gray.500"} />
                                <VStack w={"full"} alignItems={"start"} maxH={"350px"} overflowY={"auto"}>
                                    //Post comments
                                    {post.comments.map((comment) => (
                                        <Comment key={comment.id} comment={comment} />
                                    ))}

                                </VStack>
                                <Divider my={4} bg={"gray.800"} />
                                <PostFooter isProfilePage post={post} />
                            </Flex>
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ProfilePost