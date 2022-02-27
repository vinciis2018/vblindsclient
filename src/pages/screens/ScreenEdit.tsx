import React, { useEffect, useState } from 'react';
import { Link as RouterLink} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Heading, FormControl, Select, FormLabel, Input, Center, Link, Flex, Stack, SimpleGrid, VStack, Text, Button, IconButton, HStack } from "@chakra-ui/react";

import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import MapboxMap from "../../components/helpers/MapBoxMap";

import TagsInput from '../../components/helpers/TagsInput';
import LoadingBox from '../../components/helpers/LoadingBox';
import MessageBox from '../../components/helpers/MessageBox';
import { detailsScreen, getScreenPinDetails, updateScreen } from '../../Actions/screenActions';
import {getWalletDetails} from '../../Actions/walletActions';
import {getScreenCalender} from '../../Actions/calenderActions';
import { createScreenGame, removeScreenGame, getScreenGameDetails } from '../../Actions/gameActions';
import { updatePin } from '../../Actions/pinActions';
import { SCREEN_UPDATE_RESET } from '../../Constants/screenConstants';
import { PIN_UPDATE_RESET } from '../../Constants/pinConstants';

import {AiOutlineDoubleLeft, AiOutlineArrowUp, AiOutlineArrowDown, AiOutlineDelete, AiFillDislike, AiFillLike, AiFillFlag, AiOutlineEdit, AiOutlineUpload } from 'react-icons/ai'
import {BiToggleLeft, BiToggleRight} from 'react-icons/bi';


export function ScreenEdit(props: any) {

  const screenId = props.match.params.id;

  const [name, setName] = useState<any>('');
  const [rentPerSlot, setRentPerSlot] = useState<any>('');
  const [image, setImage] = useState<any>('');
  const [screenCategory, setScreenCategory] = useState<any>('');
  const [screenType, setScreenType] = useState<any>('');
  const [screenWorth, setScreenWorth] = useState<any>('');
  const [slotsTimePeriod, setSlotsTimePeriod] = useState<any>('');
  const [description, setDescription] = useState<any>('');
  const [screenTags, setScreenTags] = useState<any>([]);
  const [screenAddress, setScreenAddress] = useState<any>('');
  const [districtCity, setDistrictCity] = useState<any>('');
  const [stateUT, setStateUT] = useState<any>('');
  const [country, setCountry] = useState<any>('India');
  const [screenLength, setScreenLength] = useState<any>('');
  const [screenWidth, setScreenWidth] = useState<any>('');
  const [measurementUnit, setMeasurementUnit] = useState<any>('ft');


  const [newPlaceId, setNewPlaceId] = useState<any>('');
  const [currentPlaceId, setCurrentPlaceId] = useState<any>('');

  const userSignin = useSelector((state: any) => state.userSignin);
  const { userInfo } = userSignin;

  const screenDetails = useSelector((state: any) => state.screenDetails);
  const { loading, error, screen } = screenDetails;

  const screenPinDetails = useSelector((state: any) => state.screenPinDetails);
  const {
    loading: loadingScreenPin,
    error: errorScreenPin,
    screenPin,
  } = screenPinDetails;

  const screenUpdate = useSelector((state: any) => state.screenUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = screenUpdate;

  const pinUpdate = useSelector((state: any) => state.pinUpdate);
  const {
    loading: loadingPinUpdate,
    error: errorPinUpdate,
    success: successPinUpdate,
  } = pinUpdate;

  const walletDetails = useSelector((state: any) => state.walletDetails);
  const {
    loading: loadingWallet,
    error: errorWallet,
    wallet
  } = walletDetails;


  const screenCalender = useSelector((state: any) => state.screenCalender);
  const {
    loading: loadingScreenCalender,
    error: errorScreenCalender,
    calender
  } = screenCalender;

  const screenGameCreate = useSelector((state: any) => state.screenGameCreate);
  const {
    loading: loadingScreenGameCreate,
    error: errorScreenGameCreate,
    success: successScreenGameCreate,
    createdScreenGame
  } = screenGameCreate

  const screenGameDetails = useSelector((state: any) => state.screenGameDetails);
  const {
    loading: loadingScreenGameDetails,
    error: errorScreenGameDetails,
    screenGameData
  } = screenGameDetails

  const screenGameRemove = useSelector((state: any) => state.screenGameRemove);
  const {
    loading: loadingScreenGameRemove,
    error: errorScreenGameRemove,
    success: successScreenGameRemove
  } = screenGameRemove


  const [mapProps, setMapProps] = useState<any>({lat: 25.26 , lng: 82.98, zoom: 18})

  const [viewport, setViewport] = useState<any>({
    width: "60vw",
    height: "60vh",
    latitude: 25.26,
    longitude: 82.98,
    zoom: 10
  });

  const dispatch = useDispatch();

  useEffect(() => {

    if (!screen || screen._id !== screenId || successUpdate) {
      dispatch({
        type: SCREEN_UPDATE_RESET
      });
      dispatch(detailsScreen(screenId));
  
    } else {
      setName(screen.name);
      setRentPerSlot(screen.rentPerSlot);
      setImage(image || screen.image);
      setScreenCategory(screen.category);
      setScreenType(screen.screenType)
      setScreenWorth(screen.scWorth);
      setSlotsTimePeriod(screen.slotsTimePeriod);
      setDescription(screen.description);
      setScreenAddress(screen.screenAddress);
      setDistrictCity(screen.districtCity);
      setStateUT(screen.stateUT);
      setCountry(screen.country);
      setScreenTags(screen.screenTags);
      setScreenLength(screen.size.length);
      setScreenWidth(screen.size.width);
      setMeasurementUnit(screen.size.measurementUnit)
    }
    if (successUpdate) {
      window.alert('Screen Updated successfully');
    }

    if ((!screenPin || successPinUpdate) && screenCategory === 'DOOH_SCREEN') {
      dispatch({
        type: PIN_UPDATE_RESET
      });
      dispatch(getScreenPinDetails(screenId))
    }
    if (successPinUpdate) {
      window.alert('Screen Pin Updated successfully');
    }

    if(successScreenGameCreate) {
      window.alert('Screen Game Created Successfully')
    }
    if(successScreenGameRemove) {
      window.alert('Screen Game Removed Successfully')
    }
    // dispatch(getWalletDetails(userInfo.defaultWallet))
    dispatch(getScreenCalender(screenId))
    dispatch(getScreenGameDetails(screenId))

  }, [
    dispatch, 
    screen, 
    userInfo, 
    screenId, 
    successUpdate, 
    successScreenGameCreate,
    successScreenGameRemove,
    image,
    successPinUpdate,
  ]);

  const selectedTags = (screenTags: any) => {
    console.log(screenTags);
    setScreenTags(screenTags || screen.screenTags);
  };

  const handleAddPinClick = (e: any) => {
    const [long, lati] = e.lngLat;
    setNewPlaceId({
      long, lati
    })
    setMapProps({
      lat: lati, lng: long
    })
  };

  const addGameContract = (e: any) => {
    e.preventDefault();
    window.alert('Please confirm your request to create screen game.')
    dispatch(createScreenGame(screenId, {
      _id: screenId,
      name,
      image,
      description,
      rentPerSlot,
      screenCategory,
      screenType,
      screenWorth,
      slotsTimePeriod,
      screenTags,
      createdScreenGame
    }))
  }

  const removeGameContract = (e: any) => {
    e.preventDefault();
    dispatch(removeScreenGame(screenId))
  }

  const submitPinHandler = (e: any) => {
    e.preventDefault();
    setNewPlaceId(newPlaceId);
    dispatch(updatePin(screenId, {
      lat: newPlaceId.lati || screenPin.lat,
      lng: newPlaceId.long || screenPin.lng,
    }))
  }

  const submitHandler = (e: any) => {
    dispatch(
      updateScreen({
        _id: screenId,
        name,
        rentPerSlot,
        image,
        screenCategory,
        screenType,
        screenWorth,
        slotsTimePeriod,
        description,
        screenAddress,
        districtCity,
        stateUT,
        country,
        screenTags,
        screenLength,
        measurementUnit,
        screenWidth
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
      <Flex>
        <Link width="20%" as={RouterLink} to={`/screen/${screenId}`}><AiOutlineDoubleLeft /></Link>
        <Heading width="60%" fontSize="90%">Edit {screen.name}</Heading>
        {loadingScreenCalender ? (
          <LoadingBox></LoadingBox>
        ) : errorScreenCalender ? (
          <MessageBox variant="danger">{errorScreenCalender}</MessageBox>
        ) : (
          <Text width="20%">{!calender.activeGameContract ? (
            "No Active Game"
          ) : (
            <Link as={RouterLink} to={`/viewblock/tx/${calender.activeGameContract}`}>Game Active</Link>
          )}</Text>
        )}
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
        <SimpleGrid gap="2" columns={[1, 2]}>
          <Stack shadow='card' p="10px">
              {/* <div>Current asset location: {screen.locationPin.lat}, {screen.locationPin.lng}</div> */}
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
                <FormLabel>Screen's Description</FormLabel>
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
                    onChange={(e) => setScreenTags(e.target.value)} 
                    placeholder="nsfw,art,holiday, ...etc" 
                    value={screenTags}
                    />
                </Stack>
                <HStack>{Object.keys(screenTags).map((key) => [String(key), screenTags[key]]).map((t) => (
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
                  <FormLabel>Screen Image</FormLabel>
                  <Stack direction="row" align="center">
                    <img 
                      src={image} 
                      className="popCard medium" 
                      alt="screen_image"
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
              {loadingScreenCalender ? (
                <LoadingBox></LoadingBox>
              ) : errorScreenCalender ? (
                <MessageBox variant="danger">{errorScreenCalender}</MessageBox>
              ) : (
              <Stack>
                {!calender.activeGameContract ? (
                  <Stack>
                    <FormControl id="screenCategory">
                      <FormLabel>Screen Category</FormLabel>
                      <Stack direction="row" align="center">
                        <select
                          title="screenCategory"
                          placeholder={screenCategory}
                          value={screenCategory}
                          onChange={(e) => setScreenCategory(e.target.value)}
                        >
                          <option value="">Select Category</option>
                          <option value="DOOH_SCREEN">Outdoor Screen</option>
                          <option value="TV_SCREEN">Indoor Screen</option>
                          <option value="MALL_SCREEN">Mall Screen</option>
                          <option value="WEB_SCREEN">Web Screen</option>
                        </select>
                      </Stack>
                    </FormControl>
                    <FormControl id="screenType">
                      <FormLabel>Screen Type</FormLabel>
                      <Stack direction="row" align="center">
                        <select
                          title="screenType"
                          placeholder={screenType}
                          value={screenType}
                          onChange={(e) => setScreenType(e.target.value)}
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
                    <FormControl id="screenWorth">
                      <FormLabel>Screen's Worth</FormLabel>
                      <Stack direction="row" align="center">
                        <Input 
                          id="screenWorth"
                          onChange={(e) => setScreenWorth(e.target.value)} 
                          placeholder={screenWorth} 
                          value={screenWorth}
                          type="number"  
                        />
                      </Stack>
                    </FormControl>
                    <FormControl id="slotsTimePeriod">
                      <FormLabel>Slots Time Period</FormLabel>
                      <Stack direction="row" align="center">
                        <select
                          title="slotsTimePeriod"
                          placeholder={slotsTimePeriod}
                          value={slotsTimePeriod}
                          onChange={(e) => setSlotsTimePeriod(e.target.value)}
                        >
                          <option value={20}>Select Slot's Time Period</option>
                          <option value={10}>10 sec slot</option>
                          <option value={20}>20 sec slot</option>
                          <option value={30}>30 sec slot</option>
                          <option value={60}>60 sec slot</option>
                        </select>
                      </Stack>
                    </FormControl>
                    <FormControl id="rentPerSlot">
                      <FormLabel>Screen's Worth</FormLabel>
                      <Stack direction="row" align="center">
                        <Input 
                          id="rentPerSlot"
                          onChange={(e) => setRentPerSlot(e.target.value)} 
                          placeholder={rentPerSlot} 
                          value={rentPerSlot}
                          type="number"  
                        />
                      </Stack>
                    </FormControl>
                  </Stack>
                ) : (
                  <Stack>
                    {loadingScreenGameDetails ? (
                      <LoadingBox></LoadingBox>
                    ) : errorScreenGameDetails ? (
                      <MessageBox variant="danger">{errorScreenGameDetails}</MessageBox>
                    ) : (
                      <Stack>
                        <Heading fontSize="">{screenType} Type Screen</Heading>
                        <Heading fontSize="">Slot Time Period: {screenGameData.gameParams.slotTimePeriod} Sec</Heading>
                        <Heading fontSize="">Intial Rent per slot: {screenGameData.gameParams.initialRent} RAT</Heading>
                        <Heading fontSize="">Initial Screen Worth: {screenGameData.gameParams.initialWorth} RAT</Heading>
                      </Stack>
                    )}
                  </Stack>
                )}
                {screen.__v >= 1 ? (
                  <Stack>
                    {calender.activeGameContract ? (
                      <Flex>
                        {loadingScreenGameRemove ? (
                          <LoadingBox></LoadingBox>
                        ) : errorScreenGameRemove ? (
                          <MessageBox variant="danger">{errorScreenGameRemove}</MessageBox>
                        ) : (
                          <Button onClick={removeGameContract}>Remove Game</Button>
                        )}
                      </Flex>
                    ):(
                      <Flex>
                        {loadingScreenGameCreate ? (
                          <LoadingBox></LoadingBox>
                        ) : errorScreenGameCreate ? (
                          <MessageBox variant="danger">{errorScreenGameCreate}</MessageBox>
                        ) : (
                          <Button className="primary block" onClick={addGameContract}>Create Game</Button>
                        )}
                      </Flex>
                    )}
                  </Stack>
                ) : (
                  <Text fontSize="70%">Please update once with desired values to create screen game</Text>
                )}
              </Stack>
              )}
          </Stack>
          <Stack shadow="card" p="10px">
            <FormControl id="screenAddress">
              <FormLabel>Screen's Address</FormLabel>
              <Stack direction="row" align="center">
                <Input 
                  id="screenAddress"
                  onChange={(e) => setScreenAddress(e.target.value)} 
                  placeholder={screenAddress} 
                  value={screenAddress}
                  type="text"  
                />
              </Stack>
            </FormControl>
            <FormControl id="districtCity">
              <FormLabel>Screen's District/City</FormLabel>
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
              <FormLabel>Screen's State/UT</FormLabel>
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
            <HStack>
              <FormControl id="screenLength">
                <FormLabel>Screen's Length</FormLabel>
                <Stack direction="row" align="center">
                  <Input 
                    id="screenLength"
                    onChange={(e) => setScreenLength(e.target.value)} 
                    placeholder={screenLength} 
                    value={screenLength}
                    type="number"  
                  />
                </Stack>
              </FormControl>
              <FormControl id="screenWidth">
                <FormLabel>Screen's Width</FormLabel>
                <Stack direction="row" align="center">
                  <Input 
                    id="screenWidth"
                    onChange={(e) => setScreenWidth(e.target.value)} 
                    placeholder={screenWidth} 
                    value={screenWidth}
                    type="number"  
                  />
                </Stack>
              </FormControl>
              <FormControl id="measurementUnit">
                <FormLabel>Measurement Unit</FormLabel>
                <Stack direction="row" align="center">
                  <select
                    title="measurementUnit"
                    placeholder={measurementUnit}
                    value={measurementUnit}
                    onChange={(e) => setMeasurementUnit(e.target.value)}
                  >
                    <option value="MT">Select Type</option>
                    <option value="FT">ft</option>
                    <option value="MT">m</option>
                    <option value="PX">px</option>
                  </select>
                </Stack>
              </FormControl>
            </HStack>
              {screen.category !== "WEB_SCREEN" ? (
              <Flex>
                {loadingScreenPin ? (
                  <LoadingBox></LoadingBox>
                ) : errorScreenPin ? (
                  <MessageBox variant="danger">{errorScreenPin}</MessageBox>
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
              ) : (
                <Heading>
                  WEB_SCREEN
                </Heading>
              )}
          </Stack>
        </SimpleGrid>
      )}
      <Button className="primary block"  onClick={submitHandler} >Update</Button>
    </Stack>
  )
}