import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Heading, FormControl, Select, FormLabel, Input, Center, Link, Flex, Stack, SimpleGrid, VStack, Text, Button, IconButton, HStack } from "@chakra-ui/react";

import { TextField } from '@material-ui/core';

import LoadingBox from '../../components/helpers/LoadingBox';
import MessageBox from '../../components/helpers/MessageBox';
import { signin } from '../../Actions/userActions';


export function Signin(props: any) {

  const [email, setEmail] = useState<any>('');
  const [password, setPassword] = useState<any>('');

  const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/';

  const userSignin = useSelector((state: any) => state.userSignin);
  const { userInfo, loading, error } = userSignin;

  const dispatch = useDispatch();

  const submitHandler = (e: any) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);

  return (
    <Stack>
      <Heading textAlign="center">
        GET INCENTIVISED FOR YOUR ATTENTION NOW
      </Heading>
      <hr />
      <Flex>
        <img 
          width="50%" 
          src="../../../images/sign_in_image.png" 
          alt="sign_up_image" 
          />
          <Stack width="50%">
            <Heading fontSize="" textAlign="center">
              Welcome Back Again
            </Heading>
            {loading && <LoadingBox></LoadingBox>}
            {error && <MessageBox variant="danger">{error}</MessageBox>}
            <FormControl id="email">
              <FormLabel>Email</FormLabel>
              <Stack direction="row" align="center">
                <Input 
                  id="email"
                  onChange={(e) => setEmail(e.target.value)} 
                  placeholder={email} 
                  value={email}
                  required
                  type="email"  
                />
              </Stack>
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Stack direction="row" align="center">
                <Input 
                  id="password"
                  onChange={(e) => setPassword(e.target.value)} 
                  placeholder={password} 
                  value={password}
                  required
                  type="password"  
                />
              </Stack>
            </FormControl>
            
            <Text fontSize="70%"> If you don't remember your password {' '}
              <Link to="/forgot_password"> click here to reset your password</Link>{' '}
            </Text>
            <Button fontSize="70%" type="submit" onClick={submitHandler}>
              By clicking on this LOGIN button, I agree to its all <Link as={RouterLink} to="/terms_and_conditions"> Terms and Conditions</Link>
            </Button>
            <Text>Not a registered user?
              <Link as={RouterLink} to={`/signup?redirect=${redirect}`}>Click here to register</Link>
            </Text>
          </Stack>
      </Flex>
      <hr />
      <Heading textAlign="center">
        GET INCENTIVISED FOR YOUR ATTENTION NOW
      </Heading>
      <hr />
    </Stack>
  )
}