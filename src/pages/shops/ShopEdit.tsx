import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Heading, FormControl, Select, FormLabel, Input, Center, Link, Flex, Stack, SimpleGrid, VStack, Text, Button, IconButton, HStack } from "@chakra-ui/react";

import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import MapboxMap from "../../components/helpers/MapBoxMap";

import TagsInput from '../../components/helpers/TagsInput';
import LoadingBox from '../../components/helpers/LoadingBox';
import MessageBox from '../../components/helpers/MessageBox';
import { detailsShop, getShopPinDetails, updateShop } from '../../Actions/shopActions';
import { createShopGame, removeShopGame, getShopGameDetails } from '../../Actions/gameActions';
import { updatePin } from '../../Actions/pinActions';
import { SHOP_UPDATE_RESET } from '../../Constants/shopConstants';
import { PIN_UPDATE_RESET } from '../../Constants/pinConstants';

import {AiOutlineDoubleLeft, AiOutlineArrowUp, AiOutlineArrowDown, AiOutlineDelete, AiFillDislike, AiFillLike, AiFillFlag, AiOutlineEdit, AiOutlineUpload } from 'react-icons/ai'
import {BiToggleLeft, BiToggleRight} from 'react-icons/bi';

export function ShopEdit(props: any) {

  const shopId = props.match.params.id;

  const [name, setName] = useState<any>('');
  const [image, setImage] = useState<any>('');
  const [link, setLink] = useState<any>('');
  const [shopAddress, setShopAddress] = useState<any>('');
  const [stateUT, setStateUT] = useState<any>('');
  const [country, setCountry] = useState<any>('');
  const [shopCategory, setShopCategory] = useState<any>('');
  const [description, setDescription] = useState<any>('');
  const [shopTags, setShopTags] = useState<any>([]);
  const [shopType, setShopType] = useState<any>('');
  const [shopWorth, setShopWorth] = useState<any>('');
  const [districtCity, setDistrictCity] = useState<any>('');


  const [newPlaceId, setNewPlaceId] = useState<any>('');
  const [currentPlaceId, setCurrentPlaceId] = useState<any>('');

  const [loadingUpload, setLoadingUpload] = useState<any>(false);
  const [errorUpload, setErrorUpload] = useState<any>('');

  const userSignin = useSelector((state: any) => state.userSignin);
  const { userInfo } = userSignin;

  const shopDetails = useSelector((state: any) => state.shopDetails);
  const { loading, error, shop } = shopDetails;

  const shopPinDetails = useSelector((state: any) => state.shopPinDetails);
  const {
    loading: loadingShopPin,
    error: errorShopPin,
    shopPin,
  } = shopPinDetails;

  const shopUpdate = useSelector((state: any) => state.shopUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = shopUpdate;

  const pinUpdate = useSelector((state: any) => state.pinUpdate);
  const {
    loading: loadingPinUpdate,
    error: errorPinUpdate,
    success: successPinUpdate,
  } = pinUpdate;

  const shopGameCreate = useSelector((state: any) => state.shopGameCreate);
  const {
    loading: loadingShopGameCreate,
    error: errorShopGameCreate,
    success: successShopGameCreate,
    createdShopGame
  } = shopGameCreate

  const shopGameDetails = useSelector((state: any) => state.shopGameDetails);
  const {
    loading: loadingShopGameDetails,
    error: errorShopGameDetails,
    shopGameData
  } = shopGameDetails

  const shopGameRemove = useSelector((state: any) => state.shopGameRemove);
  const {
    loading: loadingShopGameRemove,
    error: errorShopGameRemove,
    success: successShopGameRemove
  } = shopGameRemove

  const walletDetails = useSelector((state: any) => state.walletDetails);
  const {
    loading: loadingWallet,
    error: errorWallet,
    wallet
  } = walletDetails;

  const [mapProps, setMapProps] = useState<any>({lat: 25.26 , lng: 82.98, zoom: 18})

  const [viewport, setViewport] = useState<any>({
    width: "80vw",
    height: "80vh",
    latitude: 25.26,
    longitude: 82.98,
    zoom: 10
  });

  const dispatch = useDispatch();

  useEffect(() => {

    if (!shop || shop._id !== shopId || successUpdate) {
      dispatch({
        type: SHOP_UPDATE_RESET
      });
      dispatch(detailsShop(shopId));
    } else {
      setName(shop.name);
      setImage(image || shop.image);
      setShopCategory(shop.shopCategory);
      setDescription(shop.description);
    }

    if (successUpdate) {
      window.alert('Screen Updated successfully');
    }

    if (!shopPin || successPinUpdate) {
      dispatch({
        type: PIN_UPDATE_RESET
      });
      dispatch(getShopPinDetails(shopId))
    }
    if (successPinUpdate) {
      window.alert('Screen Pin Updated successfully');
    }

    if(successShopGameCreate) {
      window.alert('Screen Game Created Successfully')
    }
    if(successShopGameRemove) {
      window.alert('Screen Game Removed Successfully')
    }

    dispatch(getShopGameDetails(shopId))
  }, [
    dispatch,
    shop, 
    userInfo, 
    shopId, 
    successUpdate, 
    successShopGameCreate,
    successShopGameRemove,
    image,
    successPinUpdate,
  ]);

  const selectedTags = (shopTags: any) => {
    console.log(shopTags);
    setShopTags(shopTags || shop.shopTags);
  };

  const handleAddPinClick = (e: any) => {
    const [long, lati] = e.lngLat;
    setNewPlaceId({
      long, lati
    })
  }

  const addGameContract = (e: any) => {
    e.preventDefault();
    window.alert('Please confirm your request to create shop game.')
    dispatch(createShopGame(shopId, {
      _id: shopId,
      name,
      image,
      description,
      shopCategory,
      shopType,
      shopWorth,
      shopTags,
      createdShopGame
    }))
  }

  const removeGameContract = (e: any) => {
    e.preventDefault();
    dispatch(removeShopGame(shopId))
  }

  const submitPinHandler = (e: any) => {
    e.preventDefault();
    setNewPlaceId(newPlaceId);
    dispatch(updatePin(shopId, {
      // lat: newPlaceId.lati || screenPin.lat,
      // lng: newPlaceId.long || screenPin.lng,
    }))
  }

  const submitHandler = (e: any) => {
    e.preventDefault();
    setNewPlaceId(null);
    dispatch(
      updateShop({
        _id: shopId,
        name,
        image,
        // category,
        description,
      })
    );
  };

  const handleMarkerClick = (id: any, lng: any, lat: any) => {
    setCurrentPlaceId(id);
    setViewport({
      ...viewport,
      longitude: lng,
      latitude: lat,
    })
  }


  return (
    <Stack>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
      <Flex justify="space-between">
        <Link width="20%" as={RouterLink} to={`/shop/${shopId}`}><AiOutlineDoubleLeft /></Link>
        <Heading width="60%" fontSize="20px" textAlign="center">Edit {shop.name}</Heading>
        <Text fontSize="">{!shop.activeGameContract ? (
          "No Active Game"
        ) : (
          <Link as={RouterLink} to={`/viewblock/tx/${shop.activeGameContract}`}>Game Active</Link>
        )}</Text>
      </Flex>
      )}
      <hr />
      {loadingUpdate && <LoadingBox></LoadingBox>}
      {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <SimpleGrid columns={[1, 2]} gap="2">
          <Stack p="10px" shadow="card">
            {/* <div>Current asset location: {shop.locationPin.lat}, {shop.locationPin.lng}</div> */}
            <FormControl id="name">
              <FormLabel>Name</FormLabel>
              <Stack direction="row" align="center">
                <Input 
                  id="name"
                  onChange={(e) => setName(e.target.value)} 
                  placeholder={name} 
                  value={name}
                  type="text"  
                />
              </Stack>
            </FormControl>
            <FormControl id="description">
              <FormLabel>Shop's Description</FormLabel>
              <Stack direction="row" align="center">
                <Input 
                  id="description"
                  onChange={(e) => setDescription(e.target.value)} 
                  placeholder={description} 
                  value={description}
                  type="text"  
                />
              </Stack>
            </FormControl>
            <FormControl id="tags">
              <FormLabel>Tags</FormLabel>
              <Stack direction="row" align="center">
                <Input 
                  id="tags"
                  onChange={(e) => setShopTags(e.target.value)} 
                  placeholder="nsfw,art,holiday, ...etc" 
                  value={shopTags}
                  />
              </Stack>
              <HStack>{Object.keys(shopTags).map((key) => [String(key), shopTags[key]]).map((t) => (
                <Text key={t[1]} fontSize="70%">{t[1]}</Text>
              ))}
              </HStack>
            </FormControl>
            {loadingWallet ? (
              <LoadingBox></LoadingBox>
            ) : errorWallet ? (
              <MessageBox variant="danger">{errorWallet}</MessageBox>
            ) : (
              <FormControl id="image">
                <FormLabel>Shop Image</FormLabel>
                <Stack direction="row" align="center">
                  <img 
                    src={image} 
                    className="popCard medium" 
                    alt="shop_image"
                  />
                  <select
                    title="image"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                  >{wallet.transactions.map((tx: any) => (tx.txType.type === "ANFT_CREATION") && (
                    
                    <option key={tx.txId} value={`https://arweave.net/${tx.txId}`}>
                      {tx.txId}
                    </option>
                  ))}
                  </select>
                </Stack>
              </FormControl>
            )}
            {!shop.activeGameContract ? (
              <Stack>
                <FormControl id="shopCategory">
                  <FormLabel>Shop Category</FormLabel>
                  <Stack direction="row" align="center">
                    <select
                      title="shopCategory"
                      placeholder={shopCategory}
                      value={shopCategory}
                      onChange={(e) => setShopCategory(e.target.value)}
                    >
                    <option value="">Select Category</option>
                    <option value="DOOH_SCREEN">Outdoor Shop</option>
                    <option value="TV_SCREEN">Indoor Shop</option>
                    <option value="MALL_SCREEN">Mall Shop</option>
                    <option value="WEB_SCREEN">Web Shop</option>
                    </select>
                  </Stack>
                </FormControl>
                <FormControl id="shop">
                  <FormLabel>Shop Type</FormLabel>
                  <Stack direction="row" align="center">
                    <select
                      title="shopType"
                      placeholder={shopType}
                      value={shopType}
                      onChange={(e) => setShopType(e.target.value)}
                    >
                    <option value="TOP_HORIZONTA">Select Type</option>
                    <option value="TOP_HORIZONTAL">Top</option>
                    <option value="LEFT_VERTICAL">Left</option>
                    <option value="MIDDLE_HORIZONTAL">Middle</option>
                    <option value="MIDDLE_VERTICAL">Inbetween</option>
                    <option value="RIGHT_VERTICAL">Right</option>
                    <option value="BOTTOM_HORIZONTAL">Bottom</option>
                    </select>
                  </Stack>
                </FormControl>
                <FormControl id="shopWorth">
                  <FormLabel>Shop's Worth</FormLabel>
                  <Stack direction="row" align="center">
                    <Input 
                      id="shopWorth"
                      onChange={(e) => setShopWorth(e.target.value)} 
                      placeholder={shopWorth} 
                      value={shopWorth}
                      type="number"  
                    />
                  </Stack>
                </FormControl>
              </Stack>
            ) : (
              <Stack>
                {loadingShopGameDetails ? (
                  <LoadingBox></LoadingBox>
                ) : errorShopGameDetails ? (
                  <MessageBox variant="danger">{errorShopGameDetails}</MessageBox>
                ) : (
                  <Stack>
                    <Heading fontSize="">Slot Time Period: {shopGameData.gameParams.slotTimePeriod} Sec</Heading>
                    <Heading fontSize="">Intial Rent per slot: {shopGameData.gameParams.initialRent} RAT</Heading>
                    <Heading fontSize="">Initial Shop Worth: {shopGameData.gameParams.initialWorth} RAT</Heading>
                  </Stack>
                )}
              </Stack>
            )}
            {shop.__v >= 1 ? (
              <Stack>
                {shop.activeGameContract ? (
                  <Flex>
                    {loadingShopGameRemove ? (
                      <LoadingBox></LoadingBox>
                    ) : errorShopGameRemove ? (
                      <MessageBox variant="danger">{errorShopGameRemove}</MessageBox>
                    ) : (
                      <Button onClick={removeGameContract}>Remove Game</Button>
                    )}
                  </Flex>
                ):(
                  <Flex>
                    {loadingShopGameCreate ? (
                      <LoadingBox></LoadingBox>
                    ) : errorShopGameCreate ? (
                      <MessageBox variant="danger">{errorShopGameCreate}</MessageBox>
                    ) : (
                      <Button onClick={addGameContract}>Create Game</Button>
                    )}
                  </Flex>
                )}
              </Stack>
            ) : (
              <Text fontSize="">Please update once with desired values to create shop game</Text>
            )}
          </Stack>
          <Stack shadow="card" p="10px">
            <FormControl id="shopAddress">
              <FormLabel>Shop's Address</FormLabel>
              <Stack direction="row" align="center">
                <Input 
                  id="shopAddress"
                  onChange={(e) => setShopAddress(e.target.value)} 
                  placeholder={shopAddress} 
                  value={shopAddress}
                  type="text"  
                />
              </Stack>
            </FormControl>
            <FormControl id="districtCity">
              <FormLabel>Shop's District/City</FormLabel>
              <Stack direction="row" align="center">
                <Input 
                  id="districtCity"
                  onChange={(e) => setDistrictCity(e.target.value)} 
                  placeholder={districtCity} 
                  value={districtCity}
                  type="text"  
                />
              </Stack>
            </FormControl>
            <FormControl id="stateUT">
              <FormLabel>Shop's State/UT</FormLabel>
              <Stack direction="row" align="center">
                <Input 
                  id="stateUT"
                  onChange={(e) => setStateUT(e.target.value)} 
                  placeholder={stateUT} 
                  value={stateUT}
                  type="text"  
                />
              </Stack>
            </FormControl>
            <FormControl id="country">
              <FormLabel>Screen's Country</FormLabel>
              <Stack direction="row" align="center">
                <Input 
                  id="country"
                  onChange={(e) => setCountry(e.target.value)} 
                  placeholder={country} 
                  value={country}
                  type="text"  
                />
              </Stack>
            </FormControl>
            <Flex>
              {loadingShopPin ? (
                <LoadingBox></LoadingBox>
              ) : errorShopPin ? (
                <MessageBox variant="danger">{errorShopPin}</MessageBox>
              ) : (
                <Box>
                  <HStack>
                      <FormControl id="longitude">
                      <FormLabel>Longitude</FormLabel>
                      <Stack direction="row" align="center">
                        <Input 
                          id="longitude"
                          onChange={(e) => setNewPlaceId(e.target.value)} 
                          placeholder={newPlaceId.lng} 
                          value={newPlaceId.lng}
                          type="coordinates"  
                        />
                      </Stack>
                    </FormControl>
                    <FormControl id="latitude">
                      <FormLabel>Latitude</FormLabel>
                      <Stack direction="row" align="center">
                        <Input 
                          id="latitude"
                          onChange={(e) => setNewPlaceId(e.target.value)} 
                          placeholder={newPlaceId.lat} 
                          value={newPlaceId.lat}
                          type="coordinates"  
                        />
                      </Stack>
                    </FormControl>
                  </HStack>
                  <MapboxMap props={mapProps} onClick={handleMarkerClick} onDblClick={handleAddPinClick}/>
                </Box>
              )}

            </Flex>
          
          </Stack>
        </SimpleGrid>
      )}
      <Button width="100%"  onClick={submitHandler} >Update</Button>
    
  </Stack>
  )
}
