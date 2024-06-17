import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import React, { useState } from 'react'
import useLogin from '../../hooks/useLogin';

const Login = () => {
    const [inputs, setInputs] = useState({
        email: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false)
    const { loading, error, login } = useLogin()

    return (
        <>
            <Input
                placeholder='Email'
                fontSize={14}
                type='email'
                value={inputs.email}
                size={"sm"}
                onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
            />
            <InputGroup h={"full"}>
                <Input
                    placeholder='Password'
                    fontSize={14}
                    type={showPassword ? 'text' : 'password'}
                    value={inputs.password}
                    size={"sm"}
                    onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                />
                <InputRightElement h={"full"}>
                    <Button variant={"ghost"} size={'sm'} onClick={(e) => setShowPassword(!showPassword)}>
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                </InputRightElement>
            </InputGroup>

            <Button w={"full"} colorScheme='blue' size={"sm"}
                fontSize={14}
                onClick={() => login(inputs)}
                isLoading={loading}
            >
                Log In
            </Button>
        </>
    )
}

export default Login