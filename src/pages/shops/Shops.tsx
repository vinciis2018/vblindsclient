import React, { useState, useEffect } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
// import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import { Box, Heading, Flex, Stack, HStack, VStack, Text, IconButton, SimpleGrid } from "@chakra-ui/react";

import MapboxMap from "../../components/helpers/MapBoxMap";
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';


import LoadingBox from '../../components/helpers/LoadingBox';
import MessageBox from '../../components/helpers/MessageBox';
import Shop from '../../components/helpers/Shop';
import { listShops } from '../../Actions/shopActions';
import { listTopBrands } from '../../Actions/userActions';
import { getAllPins } from '../../Actions/pinActions';

export function Shops(props: any) {

  const dispatch = useDispatch();
  const [currentPlaceId, setCurrentPlaceId] = useState<any>('');
  const [mapProps, setMapProps] = useState<any>({lat: 25.26 , lng: 82.98, zoom: 18})

  const shopList = useSelector((state: any) => state.shopList);
  const { loading, error, shops } =shopList;

  const pinsGet = useSelector((state: any) => state.pinsGet);
  const { 
    loading: loadingPins, 
    error: errorPins, 
    allPins 
  } = pinsGet;

  const userTopBrandsList = useSelector((state: any) => state.userTopBrandsList);
  const {
    loading: loadingBrands,
    error: errorBrands,
    users: brands,
  } = userTopBrandsList;

  useEffect(() => {
    dispatch(listShops({}));
    dispatch(listTopBrands());
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
    <Flex >
      <Stack align="center">
        <Heading align="center" fontSize="20px">Shops</Heading>
        <Box shadow="card" p="10px">
          <HStack py="10px" className="popCard">
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <Carousel showArrows autoPlay showThumbs={false}>
              {shops.length === 0 && <MessageBox>No Shop Found</MessageBox>}
              {shops.map((shop: any) => (
                <VStack py="10px" key={shop._id} onClick={()=> props.history.push(`/shop/${shop._id}`)}>
                  <HStack>
                    <img 
                      src={shop.image}
                      alt={shop.name}
                    />
                    <Stack>
                      <Heading fontSize="15px">Shop Name {shop.name}</Heading>
                      <Heading fontSize="15px">Shop Category {shop.category}</Heading>
                      <Heading fontSize="15px">From {shop.districtCity}</Heading>
                    </Stack>
                  </HStack>
                  <Text fontSize="" className="legend">{shop.name}</Text>
                </VStack>
              ))}
            </Carousel>
          )}
          </HStack>
        </Box>
        <hr />
        <SimpleGrid columns={[1, 2]} gap="2">
          {loadingPins ? (
            <LoadingBox></LoadingBox>
          ) : errorPins ? (
            <MessageBox variant="danger">{errorPins}</MessageBox>
          ) : (
            <Box shadow="card" p="1px">
              <MapboxMap props={mapProps} />
            </Box>
          )}
          {loadingBrands ? (
            <LoadingBox></LoadingBox>
          ) : errorBrands ? (
            <MessageBox variant="danger">{errorBrands}</MessageBox>
          ) : (
            <Box shadow="card" p="10px">
              {brands.length === 0 && <MessageBox>No Brand Found</MessageBox>}
              <Carousel showArrows autoPlay showThumbs={false}>
                {brands.map((brand: any) => (
                  <Stack shadow="card" p="10px" as={RouterLink} to={`/brand/${brand._id}`} key={brand._id}>
                    <Box>
                      <img
                        src={brand.brand.logo}
                        alt={brand.brand.name}
                      />
                    </Box>
                    <Text fontSize="" className="legend">{brand.brand.name}</Text>
                  </Stack>
                ))}
              </Carousel>
            </Box>
          )}
        </SimpleGrid>
        
        <Heading textAlign="center" fontSize="15px">All Shops</Heading>
        <hr />
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant='danger'>{error}</MessageBox>
        ) : (
          <HStack>
            {shops.length === 0 && <MessageBox>No Shops Found</MessageBox>}
            <SimpleGrid gap="8" columns={[1, 2, 4]}>
              {shops.map((shop: any) => (
                <Shop key={shop._id} shop={shop}></Shop>
              ))}
            </SimpleGrid>
          </HStack>      
        )}
      </Stack>
    </Flex>
  );
}
