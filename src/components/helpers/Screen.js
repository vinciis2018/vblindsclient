import React from 'react';
import {Link as RouterLink} from 'react-router-dom';
import { Box, Heading, Flex, Stack, HStack, VStack, Link, Text, IconButton } from "@chakra-ui/react";

import Rating from './Rating';


export default function Screen(props) {

  const { screen } = props;
  
  return (
    <Box shadow="card" p="10px" key={screen._id} as={RouterLink} to={`/screen/${screen._id}`}>
      <img 
        src={screen.image} 
        alt={screen.name} />
      <VStack>
          <Heading fontSize="70%">{screen.name}</Heading>
          <HStack>
            <Rating
              rating={screen.rating}
              numReviews={screen.numReviews}
            ></Rating>
          </HStack>
          <Text fontSize="70%">{screen.master.master.name}</Text>
      </VStack>
    </Box>
  )
};
