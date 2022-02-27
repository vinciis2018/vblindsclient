import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Box, Heading, Flex, Stack, HStack, Text, IconButton } from "@chakra-ui/react";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight} from 'react-icons/ai';

import LoadingBox from '../../components/helpers/LoadingBox';
import MessageBox from '../../components/helpers/MessageBox';
import Screen from '../../components/helpers/Screen';
import Channel from '../../components/helpers/Channel';
import Shop from '../../components/helpers/Shop';

import { listAllVideos } from '../../Actions/videoActions';
import { listScreens } from '../../Actions/screenActions';
import { listAllFilms } from '../../Actions/filmActions';
import { listChannels } from '../../Actions/channelActions';
import { listAllItems } from '../../Actions/itemActions';
import { listShops } from '../../Actions/shopActions';


export function Home({props}: any) {

  const videoListAll = useSelector((state: any) => state.videoListAll);
  const { allVideos, loading: loadingVideos, error: errorVideos } = videoListAll;

  const screenList = useSelector((state: any) => state.screenList);
  const { loading: loadingScreens, error: errorScreens, screens } = screenList;

  const filmListAll = useSelector((state: any) => state.filmListAll);
  const { allFilms, loading: loadingFilms, error: errorFilms } = filmListAll;

  const channelList = useSelector((state: any) => state.channelList);
  const { loading: loadingChannels, error: errorChannels, channels } = channelList;

  const itemListAll = useSelector((state: any) => state.itemListAll);
  const { allItems, loading: loadingItems, error: errorItems } = itemListAll;

  const shopList = useSelector((state: any) => state.shopList);
  const { loading: loadingShops, error: errorShops, shops } = shopList;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listAllVideos());
    dispatch(listScreens({ }));
    dispatch(listAllFilms());
    dispatch(listChannels({ }));
    dispatch(listAllItems());
    dispatch(listShops({ }));

  }, [dispatch]);

  function getIST(dateStr: any) {
    var theDate = new Date(Date.parse(
      dateStr));

    var IST = theDate.toLocaleString();
    return IST;
  }

  const [viewport, setViewport] = useState({
    width: "90vw",
    height: "25vh",
    latitude: 25.26,
    longitude: 82.98,
    zoom: 6
  });


  return (
    <Box py="4" px="4" color="black" bg="white">
      <Heading fontSize="20px" textAlign="center" className="row center">Trending Near You</Heading>
      <hr />
      <Flex align="center" justify="space-between">
        <Box width="33%">
          <Heading textAlign="center" fontSize="10px">Top Channels</Heading>
          {loadingChannels ? (
            <LoadingBox></LoadingBox>
          ) : errorChannels ? (
            <MessageBox variant="danger">{errorChannels}</MessageBox>
          ) : (
            <Stack align="center">
              {channels.length === 0 && <MessageBox>No Channel Found</MessageBox>}
              <Carousel showArrows autoPlay showThumbs={false}>
                {channels.map((channel: any) => (
                  <Flex key={channel._id}>
                    <Link to={`/channel/${channel._id}`}>
                      <Box >
                        <img 
                          src={channel.image}
                          alt={channel.name}
                        />
                        <p className="legend">{channel.name}</p>
                      </Box>
                    </Link>
                  </Flex>
                ))}
              </Carousel>
            </Stack>
          )}
        </Box>
        <Box width="33%">
          <Heading textAlign="center" fontSize="10px">Hot Screens</Heading>
          {loadingScreens ? (
            <LoadingBox></LoadingBox>
          ) : errorScreens ? (
            <MessageBox variant="danger">{errorScreens}</MessageBox>
          ) : (
            <Stack align="center">
              {screens.length === 0 && <MessageBox>No Screen Found</MessageBox>}
              <Carousel showArrows autoPlay showThumbs={false}>
                {screens.map((screen: any) => (
                  <Flex key={screen._id}>
                    <Link to={`/screen/${screen._id}`}>
                      <Box >
                        <img className="medium"
                          src={screen.image}
                          alt={screen.name}
                        />
                        <p className="legend">{screen.name}</p>
                      </Box>
                    </Link>
                  </Flex>
                ))}
              </Carousel>
            </Stack>
          )}
        </Box>
        <Box width="33%">
          <Heading textAlign="center" fontSize="10px">Trending Shops</Heading>
          {loadingShops ? (
            <LoadingBox></LoadingBox>
          ) : errorShops ? (
            <MessageBox variant="danger">{errorShops}</MessageBox>
          ) : (
            <Stack align="center">
              {shops.length === 0 && <MessageBox>No Shop Found</MessageBox>}
              <Carousel showArrows autoPlay showThumbs={false}>
                {shops.map((shop: any) => (
                  <Flex key={shop._id}>
                    <Link to={`/shop/${shop._id}`}>
                      <Box key={shop._id}>
                        <img className="medium"
                          src={shop.image}
                          alt={shop.name}
                        />
                        <p className="legend">{shop.name}</p>
                      </Box>
                    </Link>
                  </Flex>
                ))}
              </Carousel>
            </Stack>
          )}
        </Box>
      </Flex >
      <hr />
      <Flex py="10px" align="center" justify="space-between">
        <Box py="20px" px="10px" align="center" width="100%">
          <Heading fontSize="20px" textAlign="center">WANT TO EARN FROM ADS???</Heading>
          <HStack align="center" justify="space-between">
            <Box >
              <img className="medium"
                src="https://arweave.net/P4efd1dfbjUz8sgEv_kTQwDnawtVpaeUXgMVt3vNk_c" 
                alt="screen_image_1" 
                onClick={()=>window.location.replace("https://discord.gg/dh2uUeCh")}
              />
            </Box>
            <Box className="col-1">
              <HStack onClick={()=>window.location.replace("https://discord.gg/dh2uUeCh")}>
                <IconButton  as={Link} to={`/#`} bg="none" icon={<AiOutlineDoubleLeft size="20px" />} color="black" aria-label="Screen Master" />
                <Heading fontSize="15px">For Screens Owners</Heading>
              </HStack>
              <hr />
              <HStack onClick={()=>window.location.replace("https://discord.gg/dh2uUeCh")}>
                <Heading fontSize="15px">For Web-Developers</Heading>
                <IconButton  as={Link} to={`/#`} bg="none" icon={<AiOutlineDoubleRight size="20px" />} color="black" aria-label="Web Master" />
              </HStack>
            </Box>
            <Box className="col-1 right">
              <img className="medium"
                src="https://arweave.net/P4efd1dfbjUz8sgEv_kTQwDnawtVpaeUXgMVt3vNk_c" 
                alt="screen_image_1"
                onClick={()=>window.location.replace("https://discord.gg/dh2uUeCh")} 
              />
            </Box>
          </HStack>
          <Text fontSize="15px">"Enjoy the complete ownership of your content"</Text>
        </Box>
      </Flex>
      <hr />
      <Flex py="10px" align="center" justify="space-between">
        <Box py="20px" px="10px" align="center" width="100%">
          <Heading fontSize="20px" textAlign="center" >BUILT FOR ALL YOUR NEED</Heading>
          <HStack align="center" justify="space-between">
            <Box>
              <img className="medium"
                src="https://arweave.net/P4efd1dfbjUz8sgEv_kTQwDnawtVpaeUXgMVt3vNk_c" 
                alt="screen_image_1" 
                onClick={()=>window.location.replace("https://discord.gg/dh2uUeCh")}
              />
            </Box>
            <Box>
              <HStack onClick={()=>window.location.replace("https://discord.gg/dh2uUeCh")}>
                <IconButton  as={Link} to={`/#`} bg="none" icon={<AiOutlineDoubleLeft size="20px" />} color="black" aria-label="Ally" />
                <Heading fontSize="15px">For Digital Influencers</Heading>
              </HStack>
              <hr />
              <HStack className="row right" onClick={()=>window.location.replace("https://discord.gg/dh2uUeCh")}>
                <Heading fontSize="15px">For Advertising Brands</Heading>
                <IconButton  as={Link} to={`/#`} bg="none" icon={<AiOutlineDoubleRight size="20px" />} color="black" aria-label="Brand" />
              </HStack>
            </Box>
            <Box>
              <img className="medium"
                src="https://arweave.net/P4efd1dfbjUz8sgEv_kTQwDnawtVpaeUXgMVt3vNk_c" 
                alt="screen_image_1"
                onClick={()=>window.location.replace("https://discord.gg/dh2uUeCh")} 
              />
            </Box>
          </HStack>
          <Text fontSize="15px">"Connect directly without any intermediary"</Text>
        </Box>
      </Flex>
      <hr />
      <Flex py="10px" >
        <HStack align="center" justify="space-between" py="20px" px="10px" width="100%">
          <Box >
            <Heading textAlign="center" fontSize="20px">STAY TUNED...</Heading>
            <Text fontSize="15px">Democratize the advertising industry with blinds: <strong>Coming soon</strong></Text>
            <Text fontSize="15px">Enhance your lifestyle with blinds : <strong>Coming soon</strong></Text>
            <Text fontSize="15px">Move Around in your city with blinds : <strong>Coming soon</strong></Text>
            <Text fontSize="15px">Shop in your social and local markets with blinds : <strong>Coming soon</strong></Text>
            <Text fontSize="15px">Watch your favourite content with blinds : <strong>Coming soon</strong></Text>
          </Box>
          <Box >
            <img className="large"
              src="https://arweave.net/P4efd1dfbjUz8sgEv_kTQwDnawtVpaeUXgMVt3vNk_c"  
              alt="shop_image_1" 
            />
          </Box>
        </HStack>
      </Flex>
      <Heading textAlign="center" fontSize="15px">For more info. please contact at itisvinciis@gmail.com</Heading>
      <Text textAlign="center" fontSize="10px">It is beta version for initial testing, please contact for updates on final release...</Text>

    </Box>
  );
}
