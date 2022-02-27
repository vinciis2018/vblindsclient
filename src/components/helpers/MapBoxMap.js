import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { Box, Heading, Flex, Stack, HStack, VStack, Text, IconButton } from "@chakra-ui/react";


const jsonData = 
{
  "features": [
    {
      "type": "Feature",
      "properties": {
        "title": "Lincoln Park",
        "description": "A northside park that is home to the Lincoln Park Zoo"
      },
      "geometry": {
        "coordinates": [-87.637596, 41.940403],
        "type": "Point"
      }
    },
    {
      "type": "Feature",
      "properties": {
        "title": "Burnham Park",
        "description": "A lakefront park on Chicago's south side"
      },
      "geometry": {
        "coordinates": [-87.603735, 41.829985],
        "type": "Point"
      }
    },
    {
      "type": "Feature",
      "properties": {
        "title": "Millennium Park",
        "description": "A downtown park known for its art installations and unique architecture"
      },
      "geometry": {
        "coordinates": [-87.622554, 41.882534],
        "type": "Point"
      }
    },
    {
      "type": "Feature",
      "properties": {
        "title": "Grant Park",
        "description": "A downtown park that is the site of many of Chicago's favorite festivals and events"
      },
      "geometry": {
        "coordinates": [-87.619185, 41.876367],
        "type": "Point"
      }
    },
    {
      "type": "Feature",
      "properties": {
        "title": "Humboldt Park",
        "description": "A large park on Chicago's northwest side"
      },
      "geometry": {
        "coordinates": [-87.70199, 41.905423],
        "type": "Point"
      }
    },
    {
      "type": "Feature",
      "properties": {
        "title": "Douglas Park",
        "description": "A large park near in Chicago's North Lawndale neighborhood"
      },
      "geometry": {
        "coordinates": [-87.699329, 41.860092],
        "type": "Point"
      }
    },
    {
      "type": "Feature",
      "properties": {
        "title": "Calumet Park",
        "description": "A park on the Illinois-Indiana border featuring a historic fieldhouse"
      },
      "geometry": {
        "coordinates": [-87.530221, 41.715515],
        "type": "Point"
      }
    },
    {
      "type": "Feature",
      "properties": {
        "title": "Jackson Park",
        "description": "A lakeside park that was the site of the 1893 World's Fair"
      },
      "geometry": {
        "coordinates": [-87.580389, 41.783185],
        "type": "Point"
      }
    },
    {
      "type": "Feature",
      "properties": {
        "title": "Columbus Park",
        "description": "A large park in Chicago's Austin neighborhood"
      },
      "geometry": {
        "coordinates": [-87.769775, 41.873683],
        "type": "Point"
      }
    }
  ],
  "type": "FeatureCollection"
}
mapboxgl.accessToken =
  'pk.eyJ1IjoidnZpaWNja2t5eTU1IiwiYSI6ImNrdW5vamExbjB2a3Qyb3Bmb2hncDRibXQifQ.WyAt-5e1QePiaKttOgRVUg';

const Tooltip = ({ coordinates }) => {
  const { id } = coordinates;

  return (
    <Box id={`tooltip-${id}`}>
      <Heading>Source Layer:</Heading> {coordinates}
    </Box>
  );
};

const MapBoxMap = (props) => {
  const mapContainerRef = useRef(null);
  const tooltipRef = useRef(new mapboxgl.Popup({ offset: 15 }));

  const [geoJson, setGeoJson] = useState(props?.props?.jsonData)
  const [lng, setLng] = useState(props?.props?.lng);
  const [lat, setLat] = useState(props?.props?.lat);
  const [zoom, setZoom] = useState(props?.props?.zoom);
  const [coordinates, setCoordinates] = useState({lng, lat})
  // Initialize map when component mounts
  useEffect(() => {
    if(props) {
      setGeoJson(props.jsonData);
      setCoordinates({lng, lat});
    }
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/vviicckkyy55/ckrepeyb63oe318q93w90ze3x",
      center: [lng, lat],
      zoom: zoom,
    });

    map.on('load', () => {
      map.addLayer({
        id: 'terrain-data',
        type: 'line',
        source: {
          type: 'vector',
          url: 'mapbox://mapbox.mapbox-terrain-v2'
        },
        'source-layer': 'contour'
      });
    });

    // Create default markers
    new mapboxgl.Marker().setLngLat(coordinates).addTo(map)

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    map.on('move', () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });

    map.on('mouseenter', e => {
      if (e.coordinates.length) {
        map.getCanvas().style.cursor = 'pointer';
      }
    });

    // reset cursor to default when user is no longer hovering over a clickable feature
    map.on('mouseleave', () => {
      map.getCanvas().style.cursor = '';
    });

    // add tooltip when users mouse move over a point
    map.on('mousemove', e => {
      const features = map.queryRenderedFeatures(e.point);
      if (features.length) {
        const feature = features[0];

        // Create tooltip node
        const tooltipNode = document.createElement('Box');
        ReactDOM.render(<Tooltip feature={feature} />, tooltipNode);

        // Set tooltip on map
        tooltipRef.current
          .setLngLat(e.lngLat)
          .setDOMContent(tooltipNode)
          .addTo(map);
      }
    });

    map.on('click', (event) => {
      // If the user clicked on one of your markers, get its information.

      const popup = new mapboxgl.Popup({ offset: [0, -15] })
        .setLngLat(event.lngLat)
        .setHTML(
        `<h3>${event.lngLat}</h3>`
        )
        .addTo(map);


    });

    // Clean up on unmount
    return () => map.remove();
  }, []);

 

  return (
    <Stack  p="2" width="100%">
      <HStack>
        <Heading fontSize="15px">
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </Heading>
      </HStack>
      <Box width="100%" height={props?.props?.height || "480px"} ref={mapContainerRef} />
    </Stack>
  );
};
export default MapBoxMap;