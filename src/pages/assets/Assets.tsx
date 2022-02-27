import React, { useState, useEffect } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { Box, Heading, Flex, Stack, SimpleGrid, HStack, VStack, Text, IconButton } from "@chakra-ui/react";

import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


import LoadingBox from '../../components/helpers/LoadingBox';
import MessageBox from '../../components/helpers/MessageBox';
import Asset from '../../components/helpers/Asset';
import { listAssets } from '../../Actions/assetActions';
import { listTopMasters } from '../../Actions/userActions';

export function Assets(props: any) {

  const dispatch = useDispatch();

  const assetList = useSelector((state: any) => state.assetList);
  const { loading, error, assets } = assetList;

  const userTopMastersList = useSelector((state: any) => state.userTopMastersList);
  const {
    loading: loadingMasters,
    error: errorMasters,
    users: masters,
  } = userTopMastersList;

  useEffect(() => {
    dispatch(listAssets({}));
    dispatch(listTopMasters());
  }, [dispatch]);


  const [viewport, setViewport] = useState({
    width: "50vw",
    height: "50vh",
    latitude: 25.26,
    longitude: 82.98,
    zoom: 6
  });

  return (
    <Flex >
      <Stack align="center">
        <Heading align="center" fontSize="20px" >Assets</Heading>
        <Box shadow="card" p="10px" >
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <Carousel showArrows autoPlay showThumbs={false}>
              {assets.length === 0 && <MessageBox>No Asset Found</MessageBox>}
              {assets.map((asset: any) => (
              <VStack py="10px" key={asset._id} onClick={()=> props.history.push(`/asset/${asset._id}`)}>
                <HStack>
                  <img 
                    src={asset.image}
                    alt={asset.name}
                  />
                  <Stack>
                    <Heading fontSize="15px">Asset Name {asset.name}</Heading>
                    <Heading fontSize="15px">Asset Category {asset.category}</Heading>
                    <Heading fontSize="15px">From {asset.districtCity}</Heading>
                  </Stack>
                </HStack>
                <Text fontSize="" className="legend">{asset.name}</Text>
              </VStack>
              ))}
            </Carousel>
          )}
        </Box>
        <Heading textAlign="center" fontSize="15px">All Assets</Heading>
        <hr />
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant='danger'>{error}</MessageBox>
        ) : (
          <HStack>
            {assets.length === 0 && <MessageBox>No Asset Found</MessageBox>}
            <SimpleGrid gap="8" columns={[1, 2, 4]}>
              {assets.map((asset: any) => (
                <Asset key={asset._id} asset={asset}></Asset>
              ))}
            </SimpleGrid>
          </HStack>      
        )}
      </Stack>
      <hr/>
    </Flex>
  );
}
