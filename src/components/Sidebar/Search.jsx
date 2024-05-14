import { Box, Button, Flex, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Tooltip, background, useDisclosure } from '@chakra-ui/react'
import React, { useRef } from 'react'
import { SearchLogo } from '../../assets/constants'
import useSearchUser from '../../hooks/useSearchUser'
import SuggestedUser from '../SuggestedUsers/SuggestedUser'

const Search = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const searchRef = useRef()
    const { user, isLoading, getUserProfile, setUser } = useSearchUser()

    const handleSearchUser = (e) => {
        e.preventDefault();

        getUserProfile(searchRef.current.value)

    }
    console.log(user)

    return (
        <>
            <Tooltip
                hasArrow
                label={"Search"}
                placement='right'
                ml={1}
                openDelay={500}
                display={{ base: "block", md: "none" }}
            >
                <Flex
                    alignItems={"center"}
                    gap={4}
                    _hover={{ bg: "whiteAlpha.400" }}
                    borderRadius={6}
                    p={2}
                    w={{ base: 10, md: "full" }}
                    justifyContent={{ base: "center", md: "flex-start" }}
                    onClick={onOpen}
                >
                    <SearchLogo />
                    <Box display={{ base: "none", md: "block" }}>Search</Box>
                </Flex>
            </Tooltip>

            <Modal isOpen={isOpen} onClose={onClose}  >
                <ModalOverlay />
                <ModalContent bg={"black"} boxShadow={"xl"} border={"1px solid gray"} mx={3}>
                    <ModalHeader>Search User</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <form onSubmit={handleSearchUser}>
                            <FormControl>
                                <FormLabel>Username</FormLabel>
                                <Input type="text" placeholder='Search for a user' ref={searchRef} />
                            </FormControl>
                            <Flex w={"full"} justifyContent={"end"}>
                                <Button type='submit' ml={"auto"} size={"sm"} my={4} isLoading={isLoading} >
                                    Search
                                </Button>
                            </Flex>
                        </form>
                        {user && <SuggestedUser user={user} setUser={setUser} />}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default Search