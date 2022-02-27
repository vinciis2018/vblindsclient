import React, { useState, useEffect } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { Box, Heading, SimpleGrid, Flex, Stack, HStack, VStack, Text, IconButton } from "@chakra-ui/react";


import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


import LoadingBox from '../../components/helpers/LoadingBox';
import MessageBox from '../../components/helpers/MessageBox';
import Channel from '../../components/helpers/Channel';
import { listChannels } from '../../Actions/channelActions';
import { listTopAllies } from '../../Actions/userActions';

export function Channels(props: any) {

  const dispatch = useDispatch();

  const channelList = useSelector((state: any) => state.channelList);
  const { loading, error, channels } =channelList;

  const userTopAlliesList = useSelector((state: any) => state.userTopAlliesList);
  const {
    loading: loadingAllies,
    error: errorAllies,
    users: allies,
  } = userTopAlliesList;

  useEffect(() => {
    dispatch(listChannels({}));
    dispatch(listTopAllies());
  }, [dispatch]);

  const [viewport, setViewport] = useState<any>({
    width: "50vw",
    height: "50vh",
    latitude: 25.26,
    longitude: 82.98,
    zoom: 6
  });
  
  return (
    <Flex >
      <Stack align="center">
        <Heading align="center" fontSize="20px">Channels</Heading>
        <Box shadow="card" p="10px">
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <Carousel showArrows autoPlay showThumbs={false}>
            {channels.length === 0 && <MessageBox>No Channel Found</MessageBox>}
            {channels.map((channel: any) => (
              <VStack py="10px" key={channel._id} onClick={()=> props.history.push(`/channel/${channel._id}`)}>
                <HStack>
                  <img 
                    src={channel.image}
                    alt={channel.name}
                  />
                  <Stack>
                    <Heading fontSize="15px">Channel Name {channel.name}</Heading>
                    <Heading fontSize="15px">Channel Category {channel.category}</Heading>
                    <Heading fontSize="15px">From {channel.districtCity}</Heading>
                  </Stack>
                </HStack>
                <Text fontSize="" className="legend">{channel.name}</Text>
              </VStack>
            ))}
          </Carousel>
        )}
        </Box>
        <Heading textAlign="center" fontSize="15px">All Channels</Heading>
        <hr />
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant='danger'>{error}</MessageBox>
        ) : (
          <HStack>
            {channels.length === 0 && <MessageBox>No Channels Found</MessageBox>}
            <SimpleGrid gap="8" columns={[1, 2, 4]}>
              {channels.map((channel: any) => (
                <Channel key={channel._id} channel={channel}></Channel>
              ))}
            </SimpleGrid>
          </HStack>      
        )}
      </Stack>
      <hr />
    </Flex>
  );
}
