import { Box, Container, Flex, Skeleton, SkeletonCircle, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import FeedPost from './FeedPost'

const FeedPosts = () => {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 2000);
    })


    return (
        <Container maxW={"container.sm"} py={10} px={2}>
            {loading && [0, 1, 2, 3].map((_, index) => (
                <VStack key={index} gap={4} alignItems={"flex-start"} mb={10} >
                    <Flex gap={2}>
                        <SkeletonCircle size={10} />
                        <VStack gap={2} alignItems={"flex-start"} >
                            <Skeleton height={5} w={"200px"} />
                            <Skeleton height={5} w={"100px"} />
                        </VStack>
                    </Flex>
                    <Skeleton w={"full"}>
                        <Box h={"500px"}>contents wrapped</Box>
                    </Skeleton>
                </VStack>
            ))}
            {!loading && (
                <>
                    <FeedPost img='img1.png' username='Theresa_BBL' avatar='img1.png' />
                    <FeedPost img='img2.png' username='King_Ted' avatar='img2.png' />
                    <FeedPost img='img3.png' username='Lucia lucian' avatar='img3.png' />
                    <FeedPost img='img4.png' username='Ewane Marius' avatar='img4.png' />
                </>
            )}

        </Container>
    )
}

export default FeedPosts