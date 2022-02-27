import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Chart from 'react-google-charts';
import { Link as RouterLink, useParams } from 'react-router-dom';

import { Box, Heading, Slider, SliderTrack, SliderMark, SliderFilledTrack, SliderThumb, FormControl, Select, FormLabel, Input, Center, Link, Flex, Stack, SimpleGrid, VStack, Text, Button, IconButton, HStack } from "@chakra-ui/react";

import LoadingBox from '../../components/helpers/LoadingBox';
import MessageBox from '../../components/helpers/MessageBox';
import Rating from '../../components/helpers/Rating';
import { summaryPlea } from '../../Actions/pleaActions';
import { userAssetsList, userScreensList, userVideosList, userChannelsList, userItemsList, userShopsList, userFilmsList } from '../../Actions/userActions';

import { SCREEN_CREATE_RESET, SCREEN_DELETE_RESET } from '../../Constants/screenConstants';
import { ASSET_CREATE_RESET, ASSET_DELETE_RESET } from '../../Constants/assetConstants';
import { SHOP_CREATE_RESET, SHOP_DELETE_RESET } from '../../Constants/shopConstants';
import { CHANNEL_CREATE_RESET, CHANNEL_DELETE_RESET } from '../../Constants/channelConstants';
import { VIDEO_DELETE_RESET } from '../../Constants/videoConstants';
import { ITEM_DELETE_RESET } from '../../Constants/itemConstants';
import { FILM_DELETE_RESET } from '../../Constants/filmConstants';

import { createScreen, deleteScreen } from '../../Actions/screenActions';
import { createAsset, deleteAsset } from '../../Actions/assetActions';
import { createShop, deleteShop } from '../../Actions/shopActions';
import { createChannel, deleteChannel } from '../../Actions/channelActions';

import { deleteVideo } from '../../Actions/videoActions';
import { deleteItem } from '../../Actions/itemActions';
import { deleteFilm } from '../../Actions/filmActions';

import {AiOutlineDoubleLeft, AiOutlineArrowUp, AiOutlineArrowDown, AiOutlineDelete, AiFillDislike, AiFillLike, AiFillFlag, AiOutlineEdit, AiOutlineUpload } from 'react-icons/ai'
import {HiOutlineRefresh} from 'react-icons/hi';
import {CgUserlane} from 'react-icons/cg';
import {GiReceiveMoney} from 'react-icons/gi';
import { MdOutlineAddShoppingCart} from 'react-icons/md';
import { BsGear} from 'react-icons/bs';


export function Dashboard(props: any) {
  const { pageNumber = 1 } = useParams<any>();
  const masterMode = props.match.path.indexOf('/master') >= 0;
  const brandMode = props.match.path.indexOf('/brand') >= 0;
  const allyMode = props.match.path.indexOf('/ally') >= 0;


  const userSignin = useSelector((state: any) => state.userSignin);
  const { userInfo } = userSignin;

  const pleaSummary = useSelector((state: any) => state.pleaSummary);
  const { loading, summary, error } = pleaSummary;

  const userAssets = useSelector((state: any) => state.userAssets);
  const { 
    loading: loadingAssets, 
    error: errorAssets, 
    assets, 
    assetPage, 
    assetPages 
  } = userAssets;

  const userScreens = useSelector((state: any) => state.userScreens);
  const { 
    loading: loadingScreens, 
    error: errorScreens, 
    screens, 
    screenPage, 
    screenPages 
  } = userScreens;

  const userVideos = useSelector((state: any) => state.userVideos);
  const { 
    loading: loadingVideos, 
    error: errorVideos, 
    videos, 
    videoPage, 
    videoPages 
  } = userVideos;

  const userChannels = useSelector((state: any) => state.userChannels);
  const { 
    loading: loadingChannels, 
    error: errorChannels, 
    channels, 
    channelPage, 
    channelPages 
  } = userChannels;

  const userItems = useSelector((state: any) => state.userItems);
  const { 
    loading: loadingItems, 
    error: errorItems, 
    items, 
    itemPage, 
    itemPages 
  } = userItems;

  const userShops = useSelector((state: any) => state.userShops);
  const { 
    loading: loadingShops, 
    error: errorShops, 
    shops, 
    shopPage, 
    shopPages 
  } = userShops;

  const userFilms = useSelector((state: any) => state.userFilms);
  const { 
    loading: loadingFilms, 
    error: errorFilms, 
    films, 
    filmPage, 
    filmPages 
  } = userFilms;

  // const assetList = useSelector((state) => state.assetList);
  // const { 
  //   loading: loadingAssets, 
  //   error: errorAssets, 
  //   assets, 
  //   assetPage, 
  //   assetPages 
  // } = assetList;

  // const screenList = useSelector((state) => state.screenList);
  // const { 
  //   loading: loadingScreens, 
  //   error: errorScreens, 
  //   screens, 
  //   page, 
  //   pages 
  // } = screenList;

  // const shopList = useSelector((state) => state.shopList);
  // const { 
  //   loading: loadingShops, 
  //   error: errorShops, 
  //   shops, 
  //   shopPage, 
  //   shopPages 
  // } = shopList;

  // const channelList = useSelector((state) => state.channelList);
  // const { 
  //   loading: loadingChannels, 
  //   error: errorChannels, 
  //   channels, 
  //   channelPage, 
  //   channelPages 
  // } = channelList;

  const assetCreate = useSelector((state: any) => state.assetCreate);
  const {
    loading: loadingCreateAsset,
    error: errorCreateAsset,
    success: successCreateAsset,
    asset: createdAsset
  } = assetCreate;

  const screenCreate = useSelector((state: any) => state.screenCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    screen: createdScreen
  } = screenCreate;

  const shopCreate = useSelector((state: any) => state.shopCreate);
  const {
    loading: loadingCreateShop,
    error: errorCreateShop,
    success: successCreateShop,
    shop: createdShop
  } = shopCreate;

  const channelCreate = useSelector((state: any) => state.channelCreate);
  const {
    loading: loadingCreateChannel,
    error: errorCreateChannel,
    success: successCreateChannel,
    channel: createdChannel
  } = channelCreate;

  const assetDelete = useSelector((state: any) => state.assetDelete);
  const {
    loading: loadingDeleteAsset,
    error: errorDeleteAsset,
    success: successDeleteAsset,
  } = assetDelete;

  const screenDelete = useSelector((state: any) => state.screenDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = screenDelete;

  const shopDelete = useSelector((state: any) => state.shopDelete);
  const {
    loading: loadingDeleteShop,
    error: errorDeleteShop,
    success: successDeleteShop,
  } = shopDelete;

  const channelDelete = useSelector((state: any) => state.channelDelete);
  const {
    loading: loadingDeleteChannel,
    error: errorDeleteChannel,
    success: successDeleteChannel,
  } = channelDelete;

  const videoDelete = useSelector((state: any) => state.videoDelete);
  const {
    loading: loadingDeleteVideo,
    error: errorDeleteVideo,
    success: successDeleteVideo
  } = videoDelete;

  const itemDelete = useSelector((state: any) => state.itemDelete);
  const {
    loading: loadingDeleteItem,
    error: errorDeleteItem,
    success: successDeleteItem
  } = itemDelete;

  const filmDelete = useSelector((state: any) => state.filmDelete);
  const {
    loading: loadingDeleteFilm,
    error: errorDeleteFilm,
    success: successDeleteFilm
  } = filmDelete;

  const [resetIcons, setResetIcons] = useState<any>(false)

  const dispatch = useDispatch();
  useEffect(() => {
    if (successCreate) {
      dispatch({ type: SCREEN_CREATE_RESET });
      props.history.push(`/screen/${createdScreen._id}/edit`)
    }
    if (successCreateAsset) {
      dispatch({ type: ASSET_CREATE_RESET });
      props.history.push(`/asset/${createdAsset._id}/edit`)
    }
    if (successCreateShop) {
      dispatch({ type: SHOP_CREATE_RESET });
      props.history.push(`/shop/${createdShop._id}/edit`)
    }
    if (successCreateChannel) {
      dispatch({ type: CHANNEL_CREATE_RESET });
      props.history.push(`/channel/${createdChannel._id}/edit`)
    }

    if (successDeleteVideo) {
      dispatch({ type: VIDEO_DELETE_RESET });
      props.history.push(`/dashboard`)
    }
    if (successDeleteItem) {
      dispatch({ type: ITEM_DELETE_RESET });
      props.history.push(`/dashboard`)
    }
    if (successDeleteFilm) {
      dispatch({ type: FILM_DELETE_RESET });
      props.history.push(`/dashboard`)
    }

    if (successDelete) {
      dispatch({ type: SCREEN_DELETE_RESET });
      props.history.push(`/dashboard`)
    }
    if (successDeleteAsset) {
      dispatch({ type: ASSET_DELETE_RESET });
      props.history.push(`/dashboard`)
    }
    if (successDeleteShop) {
      dispatch({ type: SHOP_DELETE_RESET });
      props.history.push(`/dashboard`)
    }
    if (successDeleteChannel) {
      dispatch({ type: CHANNEL_DELETE_RESET });
      props.history.push(`/dashboard`)
    }

    // dispatch(
    //   listAssets({ master: masterMode ? userInfo._id : '', pageNumber })
    // );

    // dispatch(
    //   listScreens({ master: masterMode ? userInfo._id : '', pageNumber })
    // );

    // dispatch(
    //   listShops({ brand: brandMode ? userInfo._id : '', pageNumber })
    // );

    // dispatch(
    //   listChannels({ ally: allyMode ? userInfo._id : '', pageNumber })
    // );

    dispatch(summaryPlea());
    dispatch(userAssetsList({ master: masterMode ? userInfo._id : '', pageNumber }));
    dispatch(userScreensList({ master: masterMode ? userInfo._id : '', pageNumber }));
    dispatch(userVideosList(userInfo._id));
    dispatch(userChannelsList({ ally: allyMode ? userInfo._id : '', pageNumber }));
    dispatch(userItemsList(userInfo._id));
    dispatch(userShopsList({ brand: brandMode ? userInfo._id : '', pageNumber }));
    dispatch(userFilmsList(userInfo._id));


  }, [
    dispatch,
    props.history,
    masterMode,
    successCreate,
    successDelete,
    createdScreen,
    successCreateAsset,
    successDeleteAsset,
    createdAsset,
    brandMode,
    successCreateShop,
    successDeleteShop,
    createdShop,
    allyMode,
    successCreateChannel,
    successDeleteChannel,
    createdChannel,
    successDeleteVideo,
    successDeleteItem,
    successDeleteFilm,
    userInfo._id,
    pageNumber,
  ]);


  
  const deleteAssetHandler = (asset: any) => {
    if (window.confirm('Are you sure to delete?')) {
      try {
        dispatch(deleteAsset(asset._id));
      } catch (error: any) {
        dispatch({
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      }
    }
  };


  const deleteScreenHandler = (screen: any) => {
    if (window.confirm('Are you sure to delete?')) {
      try {
        dispatch(deleteScreen(screen._id));
      } catch (error: any) {
        dispatch({
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      }
    }
  };

  const deleteVideoHandler = (video: any) => {
    if (window.confirm('Are you sure to delete?')) {
      try {
        dispatch(deleteVideo(video._id));
      } catch (error: any) {
        dispatch({
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      }
    }
  }

  const deleteChannelHandler = (channel: any) => {
    if (window.confirm('Are you sure to delete?')) {
      try {
        dispatch(deleteChannel(channel._id));
      } catch (error: any) {
        dispatch({
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      }
    }
  }

  const deleteFilmHandler = (film: any) => {
    if (window.confirm('Are you sure to delete?')) {
      try {
        dispatch(deleteFilm(film._id));
      } catch (error: any) {
        dispatch({
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      }
    }
  }

  const deleteShopHandler = (shop: any) => {
    if (window.confirm('Are you sure to delete?')) {
      try {
        dispatch(deleteShop(shop._id));
      } catch (error: any) {
        dispatch({
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      }
    }
  }

  const deleteItemHandler = (item: any) => {
    if (window.confirm('Are you sure to delete?')) {
      try {
        dispatch(deleteItem(item._id));
      } catch (error: any) {
        dispatch({
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      }
    }
  }


  const createChannelHandler = () => {
    dispatch(createChannel());
  };

  const createShopHandler = () => {
    dispatch(createShop());
  };

  const createScreenHandler = () => {
    dispatch(createScreen());
  };

  const createAssetHandler = () => {
    dispatch(createAsset());
  };

  const openResetIcons = (user: any) => {
    setResetIcons(!resetIcons)
  }

  return (
    <Stack>
      <Flex justify="space-between">
        <Link width="40%" as={RouterLink} to={'/'}>
          <AiOutlineDoubleLeft />
        </Link>
        <Heading width="10%" fontSize="70%">Dashboard</Heading>
        <HStack width="40%">
          <Button fontSize="70%" onClick={createAssetHandler}>
            Create Asset
          </Button>
          <Button fontSize="70%" onClick={createScreenHandler}>
            Create Screen
          </Button>
          <Button fontSize="70%" Click={createShopHandler}>
            Create Shop
          </Button>
          <Button fontSize="70%" onClick={createChannelHandler}>
            Create Channel
          </Button>
        </HStack>
      </Flex>
      <hr />
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
      <Stack>
        <Flex justify="space-between">
            <Box>
              <CgUserlane />
              <Text>{summary.users[0].numUsers}  Users</Text>
            </Box>
            <Box>
              <MdOutlineAddShoppingCart />
              <Text>{summary.pleas[0] ? summary.pleas[0].numPleas : 0} Pleas</Text>
            </Box>
            <Box>
              <GiReceiveMoney />
              <Text>{/* INR {summary.pleas[0] ? summary.pleas[0].totalSales.toFixed(2)
              : 0} */} Sales</Text>
            </Box>
        </Flex>
        <hr />
        <Flex justify="space-between">
          <Box width="50%">
            <Heading fontSize="">Sales</Heading>
            {summary?.dailyPleas.length === 0 ? (
              <MessageBox>No Sale</MessageBox>
            ) : (
              <Chart
                width="100%"
                chartType="AreaChart"
                loader={<Box>Loading Chart</Box>}
                data={[
                  ['Date', 'Sales'],
                  ...summary?.dailyPleas?.map((x: any) => [x._id, x.sales]),
                ]}
              ></Chart>
            )}
          </Box>
          <Box width="50%">
            <Heading fontSize="">Categories</Heading>
            {summary?.screenCategories?.length === 0 ? (
              <MessageBox>No Category</MessageBox>
            ) : (
              <Chart
                width="100%"
                chartType="PieChart"
                loader={<Box>Loading Chart</Box>}
                data={[
                  ['Category', 'Screens'],
                  ...summary.screenCategories.map((x: any) => [x._id, x.count]),
                ]}
              ></Chart>
            )}
          </Box>
        </Flex>
        <hr />

        {loadingDeleteAsset && <LoadingBox></LoadingBox>}
        {errorDeleteAsset && <MessageBox variant="danger">{errorDeleteAsset}</MessageBox>}
        {loadingCreateAsset && <LoadingBox></LoadingBox>}
        {errorCreateAsset && <MessageBox variant="danger">{errorCreateAsset}</MessageBox>}

        {userInfo && (userInfo.isItanimulli || userInfo.isMaster) && (
          <Flex>
            {loadingAssets ? (
              <LoadingBox></LoadingBox>
            ) : errorAssets ? (
              <MessageBox variant="danger">{errorAssets}</MessageBox>
            ) : (
            <Stack>
              <Heading fontSize="">Assets</Heading>
              <hr />
              {assets.map((asset: any) => (
                <Box shadow="card" p="10px" key={asset._id}>
                  <Flex justify="space-between">
                    <img onClick={() => props.history.push(`/asset/${asset._id}`)} width="20%" className="iconSize" src={asset.image} alt={asset.name} />
                    <Heading as={RouterLink} to={`/asset/${asset._id}`} fontSize="70%">{asset.name}
                      <Rating
                        rating={asset.rating}
                        numReviews={asset.numReviews}
                      ></Rating>
                    </Heading>
                    <Text fontSize="70%">Worth: {asset.assetWorth} RATs</Text>
                      {resetIcons ? (
                        <Flex justify="space-between">
                          <AiOutlineEdit aria-label="hidden" onClick={() => props.history.push(`/asset/${asset._id}/edit`)} />
                          <AiOutlineDelete aria-label="hidden" onClick={() => deleteAssetHandler(asset)} />
                          <HiOutlineRefresh aria-label="hidden" onClick={() => openResetIcons(!resetIcons)} />
                        </Flex>
                      ) : (
                        <BsGear aria-label="hidden" onClick={() => openResetIcons(!resetIcons)} />
                      )}
                  </Flex>
                </Box>
              ))}
            </Stack>
            )}
          </Flex>
        )}
        <hr />

        {loadingDelete && <LoadingBox></LoadingBox>}
        {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
        {loadingCreate && <LoadingBox></LoadingBox>}
        {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
        
        {userInfo && (userInfo.isItanimulli || userInfo.isMaster) && (
          <SimpleGrid columns={[1, 2]} gap="4">
            {loadingScreens ? (
              <LoadingBox></LoadingBox>
            ) : errorScreens ? (
              <MessageBox variant="danger">{errorScreens}</MessageBox>
            ) : (
            <Stack>
              <Heading fontSize="">Screens</Heading>
              <hr />
              {screens.map((screen: any) => (
                <Box shadow="card" p="10px" key={screen._id}>
                  <Flex justify="space-between">
                    <img width="20%" onClick={() => props.history.push(`/screen/${screen._id}`)} src={screen.image} alt={screen.name} />
                    <Heading fontSize="70%" as={RouterLink} to={`/screen/${screen._id}`}>{screen.name}
                      <Rating
                        rating={screen.rating}
                        numReviews={screen.numReviews}
                      ></Rating>
                    </Heading>
                    <Text fontSize="70%">Worth: {screen.scWorth} RATs</Text>
                    {resetIcons ? (
                      <Flex justify="space-between">
                        <AiOutlineEdit aria-label="hidden" onClick={() => props.history.push(`/screen/${screen._id}/edit`)} />
                        <AiOutlineDelete aria-label="hidden" onClick={() => deleteScreenHandler(screen)} />
                        <HiOutlineRefresh aria-label="hidden" onClick={() => openResetIcons(!resetIcons)} />
                      </Flex>
                    ) : (
                      <BsGear aria-label="hidden" onClick={() => openResetIcons(!resetIcons)} />
                    )}
                  </Flex>
                </Box>
              ))}
            </Stack>
            )}

            {loadingDeleteVideo && <LoadingBox></LoadingBox>}
            {errorDeleteVideo && <MessageBox variant="danger">{errorDeleteVideo}</MessageBox>}

            <Stack>
              {loadingVideos ? (
                <LoadingBox></LoadingBox>
              ) : errorVideos ? (
                <MessageBox variant="danger">{errorVideos}</MessageBox>
              ) : (
                <Stack>
                  <Heading fontSize="">Adverts</Heading>
                  <hr />
                  {videos.map((video: any) => (
                    <Box shadow="card" p="10px" key={video._id}>
                      <Flex justify="space-between">
                        <img width="20%" onClick={() => props.history.push(`/video/${video._id}/${video.video.split('https://arweave.net/')[1]}`)} src={video.thumbnail} alt={video.name} />
                        <Heading fontSize="70%" as={RouterLink} to={`/video/${video._id}/${video.video.split('https://arweave.net/')[1]}`} >{video.title}
                          <Rating
                            rating={video.rating}
                            numReviews={video.numReviews}
                          ></Rating>
                        </Heading>
                        <Text fontSize="70%">Worth: {video.adWorth} RATs</Text>
                        {resetIcons ? (
                          <Flex justify="space-between">
                            <AiOutlineEdit aria-label="hidden" onClick={() => props.history.push(`/video/${video._id}/edit`)} />
                            <AiOutlineDelete aria-label="hidden" onClick={() => deleteVideoHandler(video)} />
                            <HiOutlineRefresh aria-label="hidden" onClick={() => openResetIcons(!resetIcons)} />
                          </Flex>
                        ) : (
                          <BsGear aria-label="hidden" onClick={() => openResetIcons(!resetIcons)} />
                        )}
                      </Flex>
                    </Box>
                  ))}
                </Stack> 
              )}
            </Stack>
          </SimpleGrid>
        )}
        <hr />

        {loadingDeleteShop && <LoadingBox></LoadingBox>}
        {errorDeleteShop && <MessageBox variant="danger">{errorDeleteShop}</MessageBox>}
        {loadingCreateShop && <LoadingBox></LoadingBox>}
        {errorCreateShop && <MessageBox variant="danger">{errorCreateShop}</MessageBox>}
        {loadingDeleteItem && <LoadingBox></LoadingBox>}
        {errorDeleteItem && <MessageBox variant="danger">{errorDeleteItem}</MessageBox>}
        
        {userInfo && (userInfo.isItanimulli || userInfo.isBrand) && (
          <SimpleGrid columns={[1, 2]} gap="4">
            {loadingShops ? (
              <LoadingBox></LoadingBox>
            ) : errorShops ? (
              <MessageBox variant="danger">{errorShops}</MessageBox>
            ) : (
              <Stack>
                <Heading fontSize="">Shops</Heading>
                <hr />
                {shops.map((shop: any) => (
                  <Box shadow="card" p="10px" key={shop._id}>
                    <Flex justify="space-between">
                      <img width="20%" onClick={() => props.history.push(`/shop/${shop._id}`)} src={shop.image} alt={shop.name} />
                      <Heading fontSize="70%"  as={RouterLink} to={`/shop/${shop._id}`}>{shop.name}
                        <Rating
                          rating={shop.rating}
                          numReviews={shop.numReviews}
                        ></Rating>
                      </Heading>
                      <Text fontSize="70%">Worth: {shop.shWorth} RATs</Text>
                      {resetIcons ? (
                          <Flex justify="space-between">
                            <AiOutlineEdit aria-label="hidden" onClick={() => props.history.push(`/shop/${shop._id}/edit`)} />
                            <AiOutlineDelete aria-label="hidden" onClick={() => deleteShopHandler(shop)} />
                            <HiOutlineRefresh aria-label="hidden" onClick={() => openResetIcons(!resetIcons)} />
                            <span />
                          </Flex>
                        ) : (
                          <BsGear aria-label="hidden" onClick={() => openResetIcons(!resetIcons)} />
                        )}
                    </Flex>
                  </Box>
                ))}
              </Stack>
            )}
            {loadingItems ? (
              <LoadingBox></LoadingBox>
            ) : errorItems ? (
              <MessageBox variant="danger">{errorItems}</MessageBox>
            ) : (
              <Stack>
                <Heading fontSize="">Items</Heading>
                <hr />
                {items.map((item: any) => (
                  <Box shadow="card" p="10px" key={item._id}>
                    <Flex justify="space-between">
                      <img width="20%" src={item.thumbnail} alt={item.name} />
                      <Heading fontSize="70%" as={RouterLink} to={`/item/${item._id}/${item.video.split('https://arweave.net/')[1]}`}>{item.title}
                        <Rating
                          rating={item.rating}
                          numReviews={item.numReviews}
                        ></Rating>
                      </Heading>
                      <Text fontSize="70%">Worth: {item.itWorth} RATs</Text>
                      {resetIcons ? (
                        <Flex justify="space-between">
                          <AiOutlineEdit aria-label="hidden" onClick={() => props.history.push(`/item/${item._id}/edit`)} />
                          <AiOutlineDelete aria-label="hidden" onClick={() => deleteItemHandler(item)} />
                          <HiOutlineRefresh aria-label="hidden" onClick={() => openResetIcons(!resetIcons)} />
                        </Flex>
                      ) : (
                        <BsGear aria-label="hidden" onClick={() => openResetIcons(!resetIcons)} />
                      )}
                    </Flex>
                  </Box>
                ))}
              </Stack> 
            )}
          </SimpleGrid>
        )} 
        <hr />

        {loadingDeleteChannel && <LoadingBox></LoadingBox>}
        {errorDeleteChannel && <MessageBox variant="danger">{errorDeleteChannel}</MessageBox>}
        {loadingCreateChannel && <LoadingBox></LoadingBox>}
        {errorCreateChannel && <MessageBox variant="danger">{errorCreateChannel}</MessageBox>}
        {loadingDeleteFilm && <LoadingBox></LoadingBox>}
        {errorDeleteFilm && <MessageBox variant="danger">{errorDeleteFilm}</MessageBox>}

        {userInfo && (userInfo.isItanimulli || userInfo.isAlly) && (
          <SimpleGrid columns={[1, 2]} gap="4">
            {loadingChannels ? (
              <LoadingBox></LoadingBox>
            ) : errorChannels ? (
              <MessageBox variant="danger">{errorChannels}</MessageBox>
            ) : (
              <Stack>
                <Heading fontSize="">Channels</Heading>
                <hr />
                {channels.map((channel: any) => (
                  <Box shadow="card" p="10px" key={channel._id}>
                    <Flex justify="space-between">
                      <img width="20%" src={channel.image} alt={channel.name} />
                      <Heading fontSize="70%" as={RouterLink} to={`/channel/${channel._id}`}>{channel.name}
                        <Rating
                          rating={channel.rating}
                          numReviews={channel.numReviews}
                        ></Rating>
                      </Heading>
                      <Text fontSize="70%" >Worth: {channel.chWorth} RATs</Text>
                      {resetIcons ? (
                        <Flex justify="space-between">
                          <AiOutlineEdit aria-label="hidden" onClick={() => props.history.push(`/channel/${channel._id}/edit`)} />
                          <AiOutlineDelete aria-label="hidden" onClick={() => deleteChannelHandler(channel)} />
                          <HiOutlineRefresh aria-label="hidden" onClick={() => openResetIcons(!resetIcons)} />
                        </Flex>
                      ) : (
                        <BsGear aria-label="hidden" onClick={() => openResetIcons(!resetIcons)} />
                      )}
                    </Flex>
                  </Box>
                ))}
              </Stack>
            )}

            {loadingFilms ? (
              <LoadingBox></LoadingBox>
            ) : errorFilms ? (
              <MessageBox variant="danger">{errorFilms}</MessageBox>
            ) : (
              <Stack>
                <Heading fontSize="">Films</Heading>
                <hr />
                {films.map((film: any) => (
                  <Box shadow="card" p="10px" key={film._id}>
                    <Flex justify="space-between">
                      <img width="20%" src={film.thumbnail} alt={film.name} />
                      <Heading fontSize="70%" as={RouterLink} to={`/film/${film._id}/${film.video.split('https://arweave.net/')[1]}`}>{film.title}
                        <Rating
                          rating={film.rating}
                          numReviews={film.numReviews}
                        ></Rating>
                      </Heading>
                      <Text fontSize="70%">Worth: {film.flWorth} RATs</Text>
                      {resetIcons ? (
                        <Flex justify="space-between">
                          <AiOutlineEdit aria-label="hidden" onClick={() => props.history.push(`/film/${film._id}/edit`)} />
                          <AiOutlineDelete aria-label="hidden" onClick={() => deleteFilmHandler(film)} />
                          <HiOutlineRefresh aria-label="hidden" onClick={() => openResetIcons(!resetIcons)} />
                        </Flex>
                      ) : (
                        <BsGear aria-label="hidden" onClick={() => openResetIcons(!resetIcons)} />
                      )}
                    </Flex>
                  </Box>
                ))}
            </Stack> 
            )}
          </SimpleGrid>
        )}
        
        {userInfo ? (
          <Text>Audience Dashboard Coming Soon...</Text>
        ) : (
          <Text>Please Signin to continue...</Text>
        )} 

      </Stack>
      )}
    </Stack>
  );
}
