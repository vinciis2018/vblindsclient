import React from 'react';
import {Link as RouterLink} from 'react-router-dom';
import { Box, Heading, Flex, Stack, HStack, VStack, Link, Text, IconButton } from "@chakra-ui/react";


import Rating from './Rating';


export default function Shop(props) {

  const { shop } = props;
  
  return (
    <Box shadow="card" p="10px" as={RouterLink} to={`/shop/${shop._id}`} key={shop._id}>
      <img 
        src={shop.image} 
        alt={shop.name} />
      <VStack>
        <Heading fontSize="70%">{shop.name}</Heading>
        <HStack>
          <Rating
            rating={shop.rating}
            numReviews={shop.numReviews}
          ></Rating>
        </HStack>
        <Text fontSize="70%">{shop.brand.brand.name}</Text>
      </VStack>
    </Box>
  )
};
