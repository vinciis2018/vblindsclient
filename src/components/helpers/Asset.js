import React from 'react';
import {Link as RouterLink} from 'react-router-dom';
import Rating from './Rating';
import { Box, Heading, Flex, Stack, HStack, Link, VStack, Text, IconButton } from "@chakra-ui/react";

export default function Asset(props) {

  const { asset } = props;
  
  return (
    <Box shadow="card" p="10px" key={asset._id} as={RouterLink} to={`/asset/${asset._id}`}>
      <img 
        src={asset.image} 
        alt={asset.name} 
      />
      <VStack >
        <Heading fontSize="70%">{asset.name}</Heading>
        <HStack>
          <Rating
            rating={asset.rating}
            numReviews={asset.numReviews}
          ></Rating>
        </HStack>
        <Text fontSize="70%">{asset.master.master.name}</Text>
      </VStack>
    </Box>
  )
};
