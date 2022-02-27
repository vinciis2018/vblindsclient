import React, { useEffect, useState } from 'react';
import MapboxMap from "../../components/helpers/MapBoxMap";
import { Box, Heading, Flex, Stack, HStack, VStack, Text, IconButton } from "@chakra-ui/react";

export function MapBox(props: any) {
  const [mapProps, setMapProps] = useState<any>({lat: 25.26 , lng: 82.98, zoom: 18})

  useEffect(() => {
    setMapProps(mapProps)
  }, [])
  return (
    <Flex>
      <MapboxMap props={mapProps}/>
    </Flex>
    );
}
