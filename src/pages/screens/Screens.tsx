import React, { useState, useEffect } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
// import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { Box, Heading, SimpleGrid, Flex, Stack, HStack, VStack, Text, IconButton } from "@chakra-ui/react";

import MapboxMap from "../../components/helpers/MapBoxMap";
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';


import LoadingBox from '../../components/helpers/LoadingBox';
import MessageBox from '../../components/helpers/MessageBox';
import Screen from '../../components/helpers/Screen';
import { listScreens } from '../../Actions/screenActions';
import { listTopMasters } from '../../Actions/userActions';
import { getAllPins } from '../../Actions/pinActions';

export function Screens(props: any ) {

  const dispatch = useDispatch();
  const [currentPlaceId, setCurrentPlaceId] = useState<any>('');
  const [mapProps, setMapProps] = useState<any>({lat: 25.26 , lng: 82.98, zoom: 18})

  const screenList = useSelector((state: any) => state.screenList);
  const { loading, error, screens } = screenList;

  const pinsGet = useSelector((state: any) => state.pinsGet);
  const { 
    loading: loadingPins, 
    error: errorPins, 
    allPins 
  } = pinsGet;

  const userTopMastersList = useSelector((state: any) => state.userTopMastersList);
  const {
    loading: loadingMasters,
    error: errorMasters,
    users: masters,
  } = userTopMastersList;

  useEffect(() => {
    dispatch(listScreens({}));
    dispatch(listTopMasters());
    dispatch(getAllPins());
  }, [dispatch]);


  const [viewport, setViewport] = useState<any>({
    width: "50vw",
    height: "50vh",
    latitude: 25.26,
    longitude: 82.98,
    zoom: 6
  });

  const handleMarkerClick = (id: any, lng: any, lat: any) => {
    setCurrentPlaceId(id);
    setViewport({
      ...viewport,
      longitude: lng,
      latitude: lat,
    })
  }

  return (
    <Flex>
      <Stack align="center">
        <Heading align="center" fontSize="20px">Screens</Heading>
        <Box  shadow="card" p="10px" >
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <Carousel showArrows autoPlay showThumbs={false}>
            {screens.length === 0 && <MessageBox>No Screen Found</MessageBox>}
            {screens.map((screen: any) => (
              <VStack py="10px" key={screen._id} onClick={()=> props.history.push(`/screen/${screen._id}`)}>
                <HStack>
                  <img 
                    src={screen.image}
                    alt={screen.name}
                  />
                  <Stack>
                    <Heading fontSize="15px">Screen Name {screen.name}</Heading>
                    <Heading fontSize="15px">Screen Category {screen.category}</Heading>
                    <Heading fontSize="15px">From {screen.districtCity}</Heading>
                  </Stack>
                </HStack>
                  <Text fontSize="" className="legend">{screen.name}</Text>
              </VStack>
            ))}
          </Carousel>
        )}
        </Box>
        <hr />
        <SimpleGrid columns={[1, 2]} gap="2">
          {loadingPins ? (
            <LoadingBox></LoadingBox>
          ) : errorPins ? (
            <MessageBox variant="danger">{errorPins}</MessageBox>
          ) : (
            <Flex shadow="card" p="1px" >
                <MapboxMap props={mapProps} />
            </Flex>
          )}
          {loadingMasters ? (
            <LoadingBox></LoadingBox>
          ) : errorMasters ? (
            <MessageBox variant="danger">{errorMasters}</MessageBox>
          ) : (
            <Box shadow="card" p="10px">
              {masters.length === 0 && <MessageBox>No Master Found</MessageBox>}
              <Carousel showArrows autoPlay showThumbs={false}>
                {masters.map((master: any) => (
                  <Stack key={master._id} to={`/master/${master._id}`}>
                    <Box shadow="card" p="10px">
                      <img 
                        src={master.master.logo}
                        alt={master.master.name}
                      />
                    </Box>
                    <Text fontSize="" className="legend">{master.master.name}</Text>

                  </Stack>
                ))}
              </Carousel>
            </Box>
          )}
        </SimpleGrid>
       
        <Heading textAlign="center" fontSize="15px">All Screens</Heading>
        <hr />
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant='danger'>{error}</MessageBox>
        ) : (
          <HStack>
            {screens.length === 0 && <MessageBox>No Screen Found</MessageBox>}
            <SimpleGrid gap="8" columns={[1, 2, 4]}>
            {screens.map((screen: any) => (
              <Screen key={screen._id} screen={screen}></Screen>
            ))}
            </SimpleGrid>
          </HStack>      
        )}
      </Stack>
    </Flex>
  );
}
