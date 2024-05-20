import { Avatar, Flex, Skeleton, SkeletonCircle, Text } from '@chakra-ui/react'
import React from 'react'
import useGetUserProfileById from '../../hooks/useGetUserProfileById'
import { Link } from 'react-router-dom'
import { timeAgo } from '../../utils/timeAgo'

const Comment = ({ comment }) => {
    const { isLoading, userProfile } = useGetUserProfileById(comment.createdBy)

    if (isLoading) return <CommentSkeleton />

    return (
        <Flex gap={4} alignItems={"center"}>
            <Link to={`/${userProfile.username}`}>
                <Avatar src={userProfile.profilePicURL} size={"sm"} />
            </Link>
            <Flex direction={"column"} justifyContent={"space-between"}>
                <Flex gap={2} alignItems={"center"}>
                    <Link to={`/${userProfile.username}`}>
                        <Text fontWeight={"bold"} fontSize={12}>
                            {userProfile.username}
                        </Text>
                    </Link>
                    <Text fontSize={14}>{comment?.comment}</Text>
                </Flex>
                <Flex>
                    <Text color={'gray.600'} fontSize={12}>
                        {timeAgo(comment.createAt)}
                    </Text>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default Comment


const CommentSkeleton = () => {
    return (
        <Flex gap={4} w={"full"} alignItems={"center"}>
            <SkeletonCircle h={10} w={10} />
            <Flex gap={1} flex={"column"}>
                <Skeleton width={100} height={2} />
                <Skeleton width={50} height={2} />
            </Flex>
        </Flex>
    )
}