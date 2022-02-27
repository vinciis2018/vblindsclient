import React from 'react';
import { Box, Heading, Flex, Stack, HStack, Text, IconButton } from "@chakra-ui/react";
import { StarIcon } from '@chakra-ui/icons'
export default function Rating(props) {
  const { rating, numReviews, caption } = props;
  return (
    <HStack className="rating">
        <StarIcon fontSize="10px"
          className={
            rating >= 1
              ? 'fa fa-heart'
              : rating >= 0.5
              ? 'fa fa-heart-half-o'
              : 'fa fa-heart-o'
          }
        />
        <StarIcon fontSize="10px"
          className={
            rating >= 2
              ? 'fa fa-heart'
              : rating >= 1.5
              ? 'fa fa-heart-half-o'
              : 'fa fa-heart-o'
          }
        />
        <StarIcon fontSize="10px"
          className={
            rating >= 3
              ? 'fa fa-heart'
              : rating >= 2.5
              ? 'fa fa-heart-half-o'
              : 'fa fa-heart-o'
          }
        />
        <StarIcon fontSize="10px"
          className={
            rating >= 4
              ? 'fa fa-heart'
              : rating >= 3.5
              ? 'fa fa-heart-half-o'
              : 'fa fa-heart-o'
          }
        />
        <StarIcon fontSize="10px"
          className={
            rating >= 5
              ? 'fa fa-heart'
              : rating >= 4.5
              ? 'fa fa-heart-half-o'
              : 'fa fa-heart-o'
          }
        />
      {caption ? (
        <Text fontSize="10px">{caption}</Text>
      ) : (
        <Text fontSize="10px">{numReviews + ' reviews'}</Text>
      )}
    </HStack>
  );
}