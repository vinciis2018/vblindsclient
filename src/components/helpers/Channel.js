import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Link, Heading, Flex, Stack, HStack, VStack, Text, IconButton } from "@chakra-ui/react";


import Rating from './Rating';


export default function Channel(props) {

  const { channel } = props;
  
  return (
    <Box shadow="card" p="10px" key={channel._id}  as={RouterLink} to={`/channel/${channel._id}`}>
      <img 
        src={channel.image} 
        alt={channel.name} 
        />
      <VStack >
        <Heading fontSize="70%">{channel.name}</Heading>
        <HStack>
          <Rating
            rating={channel.rating}
            numReviews={channel.numReviews}
          ></Rating>
        </HStack>
        <Text fontSize="70%">{channel.ally.ally.name}</Text>
      </VStack>
    </Box>
  )
};
