import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, FormControl, Input, Heading, Link, Flex, Stack, HStack, SimpleGrid, VStack, Text, Button, IconButton } from "@chakra-ui/react";

import MapboxMap from "../../components/helpers/MapBoxMap";

import LoadingBox from '../../components/helpers/LoadingBox';
import MessageBox from '../../components/helpers/MessageBox';
import Rating from '../../components/helpers/Rating';
import { getScreenParams, createReview, deleteScreenVideo, getScreenPinDetails, detailsScreen, likeScreen, screenVideosList, subscribeScreen, unlikeScreen, unsubscribeScreen, applyScreenAllyPlea, flagScreen } from '../../Actions/screenActions';
import { SCREEN_REVIEW_CREATE_RESET } from '../../Constants/screenConstants';
import { getScreenCalender } from '../../Actions/calenderActions';
import { getScreenGameDetails } from '../../Actions/gameActions';
import { listUsers } from '../../Actions/userActions';
import {uploadVideo} from '../../Actions/videoActions';

import {AiOutlineDoubleLeft, AiOutlineArrowUp, AiOutlineArrowDown, AiOutlineDelete, AiFillDislike, AiFillLike, AiFillFlag, AiOutlineEdit, AiOutlineUpload } from 'react-icons/ai'
import {BsGear} from 'react-icons/bs'
import {HiOutlineRefresh} from 'react-icons/hi';
import {BiToggleLeft, BiToggleRight} from 'react-icons/bi';


export function ScreenDetails(props: any) {

  const screenId = props.match.params.id;
  console.log("screenId", screenId);

  const [mapProps, setMapProps] = useState<any>({lat: 25.26 , lng: 82.98, zoom: 18})
  const [modalActive, setModalActive] = useState<any>(false);

  const [dateHere, setDateHere] = useState<any>(new Date());

  const screenVideos = useSelector((state: any) => state.screenVideos);
  const { videos, loading, error } = screenVideos;

  const screenDetails = useSelector((state: any) => state.screenDetails);
  const {
    loading: loadingScreen,
    error: errorScreen,
    screen
  } = screenDetails;

  const userSignin = useSelector((state: any) => state.userSignin);
  const { userInfo } = userSignin;

  const userList = useSelector((state: any) => state.userList);
  const { loading: loadingUsers, error: errorUsers, users } = userList;

  const screenReviewCreate = useSelector((state: any) => state.screenReviewCreate);
  const {
    loading: loadingReviewCreate,
    error: errorReviewCreate,
    success: successReviewCreate,
  } = screenReviewCreate;

  const screenLike = useSelector((state: any) => state.screenLike);
  const {
    success: successLikeScreen,
  } = screenLike;

  const screenUnlike = useSelector((state: any) => state.screenUnlike);
  const {
    success: successUnlikeScreen,
  } = screenUnlike;

  const screenFlag = useSelector((state: any) => state.screenFlag);
  const {
    success: successFlagScreen,
  } = screenFlag;

  const screenSubscribe = useSelector((state: any) => state.screenSubscribe);
  const {
    success: successSubscribeScreen,
  } = screenSubscribe;

  const screenUnsubscribe = useSelector((state: any) => state.screenUnsubscribe);
  const {
    success: successUnsubscribeScreen,
  } = screenUnsubscribe;

  const videoDelete = useSelector((state: any) => state.videoDelete);
  const {
    success: successDelete,
  } = videoDelete;

  const screenCalender = useSelector((state: any) => state.screenCalender);
  const {
    loading: loadingScreenCalender,
    error: errorScreenCalender,
    calender
  } = screenCalender;

  const screenGameDetails = useSelector((state: any) => state.screenGameDetails);
  const {
    loading: loadingScreenGameDetails,
    error: errorScreenGameDetails,
    screenGameData
  } = screenGameDetails;

  const screenPinDetails = useSelector((state: any) => state.screenPinDetails);
  const {
    loading: loadingScreenPinDetails,
    error: errorScreenPinDetails,
    screenPin
  } = screenPinDetails;

  const screenAllyPleaRequest = useSelector((state: any) => state.screenAllyPleaRequest)
  const {
    loading: loadingScreenAllyPlea,
    error: errorScreenAllyPlea,
    success: successScreenAllyPlea,
    screenAllyPlea
  } = screenAllyPleaRequest;

  const allPleasList = useSelector((state: any) => state.allPleasList);
  const { 
    allPleas, 
    loading: loadingAllPleas, 
    error: errorAllPleas 
  } = allPleasList;

  const screenParams = useSelector((state: any) => state.screenParams);
  const { 
    loading: loadingScreenParams,
    error: errorScreenParams,
    params  
  } = screenParams;

  const videoUpload = useSelector((state: any) => state.videoUpload);
  const {
    loading: loadingVideoSave,
    success: successVideoSave,
    error: errorVideoSave,
    uploadedVideo: uploadedVideo
  } = videoUpload;

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  function checkIfImage(url: any, cb: any) {
    const img = new Image();
    img.src = url;
    img.onload = async function() {};
    console.log(img.src, img.complete )
    cb = img.complete
    return cb;
  }


  function screenLikeHandler(screenId: any) {
    if (userInfo) {
      window.alert('On liking this screen, you will be tipping the screen master from your default wallet. This will return as an incentive reward later...');
      dispatch(likeScreen({screenId, interaction: "like"}));
    } else {
      window.alert('Please sign in to like screen');
    }
  }

  function screenUnlikeHandler(screenId: any) {
    if (userInfo) {
      window.alert('You have already tipped the screen master, unliking will not refund your tip, and you may not be able to get incentivized with game raward');
      dispatch(unlikeScreen(screenId));
    } else {
      window.alert('Please sign in to unlike screen');
    }
  }

  function screenFlagHandler(screenId: any) {
    if(userInfo) {
      window.alert('On Flagging this screen, you are reporting the admin for an inspection by tipping the admin from your default wallet. This will return as an incentive reward later...');
      dispatch(flagScreen({screenId, interaction: "flag"}));
    } else {
      window.alert('Please sign in to flag screen');
    }
  }

  function screenSubscribeHandler(screenId: any) {
    if (userInfo) {
      window.alert('On Subscribing this screen, you are tipping the master from your default wallet. This will return as stored as a stoke for your withdrawal reward later...');
      setDateHere(new Date());
      dispatch(subscribeScreen({screenId, dateHere, interaction: "subscribe"}));
    } else {
      window.alert('Please sign in to subscribe screen');
    }
  }

  function screenUnsubscribeHandler(screenId: any) {
    if (userInfo) {
      window.alert('On Unsubscribing this screen, you are withdrawing the amount you paid to the master of the screen while subscribing...');
      dispatch(unsubscribeScreen({screenId, interaction: "unsubscribe"}));
    } else {
      window.alert('Please sign in to unsubscribe screen');
    }
  }

  const dispatch = useDispatch();

  useEffect(() => {
    if (successReviewCreate) {
      window.alert('Review submitted successfully');
      setRating(0);
      setComment('');
      dispatch({
        type: SCREEN_REVIEW_CREATE_RESET
      })
    }
    if(successLikeScreen) {
      window.alert('You liked this screen');
    }
    if(successUnlikeScreen) {
      window.alert('You unliked this screen');
    }
    if(successFlagScreen) {
      window.alert('You flagged this screen');
    }
    if(successSubscribeScreen) {
      window.alert('You subscribed this screen');
    }
    if(successUnsubscribeScreen) {
      window.alert('You Unsubscribed this screen');
    }
    if(successDelete) {
      window.alert('You just deleted a screen campaign');
    }

    if(successVideoSave) {
      window.alert('You just uploaded a video');
      props.history.push(`/editCampaign/${uploadedVideo._id}/${screenId}`)
    }
    if(calender) {
      console.log(new Date(dateHere).toDateString())
      console.log(
        (calender?.dayDetails?.filter((day: any) => (new Date(day.date).toDateString() === new Date(dateHere).toDateString()))?.map((slot: any) => slot.slotsBooked))
      )
    }
    if(screenPin){
      setMapProps({lat: screenPin.lat, lng: screenPin.lng, zoom: 18, height: "360px" }) 
    }
    dispatch(detailsScreen(screenId));
    dispatch(getScreenCalender(screenId));
    dispatch(screenVideosList(screenId));
    dispatch(getScreenGameDetails(screenId));
    dispatch(getScreenPinDetails(screenId));
    dispatch(listUsers())
    dispatch(getScreenParams(screenId))

  }, [
    dispatch, 
    successDelete, 
    userInfo, 
    screenId, 
    successReviewCreate,
    successLikeScreen,
    successUnlikeScreen,
    successFlagScreen,
    successSubscribeScreen,
    successUnsubscribeScreen,
    successScreenAllyPlea,
    screenAllyPlea,
    successVideoSave
  ]);

  const [viewport, setViewport] = useState({
    width: "32vw",
    height: "31vh",
    latitude: 25.26,
    longitude: 82.98,
    zoom: 18
  });


  const allyPleaHandler = () => {
    if (screen.pleas.includes(userInfo._id)) {
      window.alert('you already applied for plea, contact master for more info');
    }
    window.alert('Apply for ally plea');
    dispatch(applyScreenAllyPlea(screenId));
  };

  const submitHandlerReview = (e: any) => {
    e.preventDefault();
    if (comment && rating) {
      dispatch(
        createReview(screenId, { rating, comment, name: userInfo.name })
      );
    } else {
      alert('Please enter comment and rating');
    }
  };



  const deleteVideoHandler = (video: any) => {
    if (window.confirm('Are you sure to delete?')) {
      dispatch(deleteScreenVideo(video._id));
    }
    props.history.push(`/screen/${screenId}`);
  };

  const videoUploadHandler = (e: any) => {
    e.preventDefault();
    dispatch(
      uploadVideo(screenId)
    );
  };

  return (
    <Flex>
      {loadingScreen ? (
        <LoadingBox></LoadingBox>
      ) : errorScreen ? (
        <MessageBox variant="danger">{errorScreen}</MessageBox>
      ) : (
        <Stack>
          <HStack align="center" justify="space-between" py="10px">
            <Link width="20%" as={RouterLink} to={'/screens'}>
              <AiOutlineDoubleLeft />
            </Link>
            <Heading width="60%" textAlign="center" fontSize="20px">Only Allies and Master can upload an advert</Heading>
            <Box width="20%" align="right">
              {(userInfo && userInfo.isMaster && userInfo._id === screen.master._id) || (userInfo.isItanimulli) ? (
                <Flex align="right" justify="space-between">
                  <Button fontSize="50%" onClick={() => props.history.push(`/screen/${screenId}/edit`)}>
                    Edit Screen
                  </Button>
                  {screen.category === "WEB_SCREEN" && (
                  <Button fontSize="50%" onClick={() => props.history.push(`/nft/${screenId}`)} >
                    Monalisa
                  </Button>
                  )}
                  {screen.pleas.filter((plea: any) => plea.status === false) > 0 && (
                    <Link as={RouterLink} to='/bucket' className=''>
                      <span className="badge">{screen.pleas.filter((plea: any) => plea.status === false).length}</span>
                    </Link>
                  )}
                </Flex>
              ) : (
                <Text>More...</Text>
              )}
            </Box>
          </HStack>
          <hr />
          <HStack rounded="sm" shadow="card">
            <img 
              width="30%"
              src={screen.image}
              alt={screen.name}
            />
            <Box width="70%">
              <Heading fontSize="xl">{screen.name} <Text fontSize="sm">({screen.category})</Text></Heading>
              <Text fontSize="md">Owned by: <strong>{screen.master.master.name}</strong></Text>
              <Text fontSize="md">Located in: <strong>{screen.districtCity}</strong></Text>
              {loadingScreenGameDetails ? (
                <LoadingBox></LoadingBox>
              ) : errorScreenGameDetails ? (
                <MessageBox variant="danger">{errorScreenGameDetails}</MessageBox>
              ) : (
                <Stack>
                  {loadingScreenCalender ? (
                    <LoadingBox></LoadingBox>
                  ) : errorScreenCalender ? (
                    <MessageBox variant="danger">{errorScreenCalender}</MessageBox>
                  ) : (
                    <Text fontSize="70%">{screenGameData?.gameType} :
                      <strong> {calender?.activeGameContract}</strong>
                    </Text>
                  )}
                  {loadingScreenParams ? (
                    <LoadingBox></LoadingBox>
                  ) : errorScreenParams ? (
                    <MessageBox variant="danger">{errorScreenParams}</MessageBox>
                  ) : (
                    <HStack>
                      <Heading fontSize="md">Worth : {params.Wdash} RATs</Heading>
                      {params.Wdash > screen.scWorth && (
                        <AiOutlineArrowUp fontSize="md" color="green"/>
                      )}
                      {params.Wdash < screen.scWorth && (
                        <AiOutlineArrowDown fontSize="md" color="red" />
                      )}
                      <Heading fontSize="md">RPS : {params.Rdash} RATs</Heading>
                      {params.Rdash > screen.rentPerSlot && (
                        <AiOutlineArrowUp fontSize="md" color="green"/>
                      )}
                      {params.Rdash < screen.rentPerSlot && (
                        <AiOutlineArrowDown fontSize="md" color="red" />
                      )}
                    </HStack>
                  )}
                </Stack>
              )}
              <Text fontSize="sm">{screen.description}</Text>
            </Box>
          </HStack>
          <SimpleGrid gap="4" columns={[1, 2]}>
            {loading ? (
              <LoadingBox></LoadingBox>
            ) : error ? (
              <MessageBox variant="danger">{error}</MessageBox>
            ) : (
              <Flex shadow="card" rounded="sm" p="10px">
                {videos.map((video: any) => (
                  <Box shadow="card" p="10px" width="50%" height="30%" key={video._id} >
                    <Link as={RouterLink} to={`/video/${video._id}/${video.video.split('https://arweave.net/')[1]}`}>
                      <img 
                        src={video.thumbnail}
                        alt={video.title}
                      />
                    </Link>
                    <Stack>
                      <Heading fontSize="70%">{video.title}</Heading>
                        {modalActive && (
                          userInfo && userInfo.isItanimulli ? (
                            <HStack>
                              <BsGear onClick={() => window.open(`/editCampaign/${video._id}/${screenId}`)} />
                              <AiOutlineDelete onClick={() => deleteVideoHandler(video)} />
                            </HStack>
                          ) : userInfo && userInfo.isMaster && userInfo._id === screen.master._id ? (
                            <HStack>
                              <BsGear onClick={() => window.open(`/editCampaign/${video._id}/${screenId}`)} />
                              <AiOutlineDelete onClick={() => deleteVideoHandler(video)} />
                            </HStack>
                          ) : userInfo && video.uploader === userInfo._id? (
                            <HStack>
                              <BsGear onClick={() => window.open(`/editCampaign/${video._id}/${screenId}`)} />
                              <AiOutlineEdit onClick={allyPleaHandler} />
                            </HStack>
                          ) : (
                            <Text fontSize="">Please Signin</Text>
                          )
                        )}
                      <HStack>
                        <Text fontSize="70%">{video.uploaderName || video.uploader}</Text>
                        <Text fontSize="70%">{video.views} views</Text>
                      </HStack>
                    </Stack>
                  </Box>
                ))}
              </Flex>
            )}
            <Stack>
              <HStack justify="space-between" rounded="sm" shadow="card" p="10px">
                <Heading fontSize="70%">{dateHere.toDateString()} {dateHere.toLocaleTimeString()}</Heading>
                <HiOutlineRefresh onClick={() => window.location.replace('/screen/' + screenId)} />
                {(userInfo.isMaster && userInfo._id === screen.master._id) || (userInfo.isAlly && screen.allies.map((ally: any) => ally === userInfo._id).length > 0) || (userInfo.isItanimulli) ? (
                  <HStack>
                    <AiOutlineEdit onClick={() => setModalActive(!modalActive)} />
                    {/* <i className="fa fa-upload" onClick={() => props.history.push(`/createCampaign/${screenId}`)}></i><span /> */}
                    {loadingVideoSave ? (
                      <LoadingBox></LoadingBox>
                    ) : errorVideoSave ? (
                      <MessageBox variant="danger">{errorVideoSave}</MessageBox>
                    ) : (
                      <AiOutlineUpload onClick={videoUploadHandler} />
                    )}
                  </HStack>
                ) : (userInfo && screen.allies.map((ally: any) => ally === userInfo._id)) ? (
                  <HStack>
                    {loadingScreenAllyPlea ? (
                      <LoadingBox></LoadingBox>
                    ) : errorScreenAllyPlea ? (
                      <MessageBox variant="danger">{errorScreenAllyPlea}</MessageBox>
                    ) : (
                      <Link as={RouterLink} to='/bucket'>
                        {loadingAllPleas ? (
                          <LoadingBox></LoadingBox>
                        ) : errorAllPleas ? (
                          <MessageBox variant="danger">{errorAllPleas}</MessageBox>
                        ) : (
                        <span className="badge">{allPleas.map((plea: any) => plea.screen === screen._id && plea.from === userInfo._id).length}</span>
                        )}
                      </Link>
                    )}
                    <Button
                      fontSize="50%"
                      onClick={allyPleaHandler}
                    >Ally Plea
                    </Button>
                  </HStack>
                ) : (
                  <Text fontSize="50%">Please Signin</Text>
                )}
              </HStack>
              <hr />
              <VStack rounded="sm" shadow="card" p="10px">
                <Heading fontSize="70%">
                  Last played
                </Heading>
                <Heading fontSize="70%">
                  Currently playing
                </Heading>
                <Heading fontSize="70%">
                  Playing Next
                </Heading>
              </VStack>
              <hr />
              {screen.category !== "WEB_SCREEN" && (
                <Box shadow="card" p="10px" to="/mapbox">
                  {loadingScreenPinDetails ? (
                    <LoadingBox></LoadingBox>
                  ) : errorScreenPinDetails ? (
                    <MessageBox variant="danger">{errorScreenPinDetails}</MessageBox>
                  ) : (
                    <MapboxMap props={mapProps} />
                  )}
                </Box>
              )}
            </Stack>
          </SimpleGrid>
          <hr />
          <SimpleGrid gap="2" columns={[1, 3]}>
            <Box rounded="sm" shadow="card" p="10px">
              <Flex justify="space-between">
                <Box width="15%">
                  <img src={screen.image} alt={screen.name} />
                </Box>
                <Box>
                  <Heading fontSize="70%">{screen.name} Screen</Heading>
                  <Text fontSize="70%">{screen._id}</Text>
                </Box>
              </Flex>
              <hr />
              <Flex justify="space-between" p="10px">
                {(userInfo.isMaster && userInfo._id === screen.master._id) || (userInfo.isItanimulli) ? (
                  <Heading fontSize="50%">{screen.likedBy.length} Likes {screen.flaggedBy.length} Flags {screen.subscribers.length} Subscribers </Heading>
                ) : (
                  <SimpleGrid gap="8" columns={[1, 2, 3]}>
                    {userInfo && screen.likedBy.includes(userInfo._id) ? (
                      <HStack>
                        <Text fontSize="50%"> {screen.likedBy.length} </Text>
                        <AiFillDislike color="red" onClick={() => screenUnlikeHandler(screen._id)} aria-hidden="true" />
                      </HStack>
                    ) : (
                      <HStack>
                        <Text fontSize="50%"> {screen.likedBy.length} </Text>
                        <AiFillLike color="green" onClick={() => screenLikeHandler(screen._id)} aria-hidden="true" />
                      </HStack>
                    )}
                    {userInfo && !screen.flaggedBy.includes(userInfo._id) && (
                      <HStack>
                        <Text fontSize="50%"> {screen.flaggedBy.length} </Text>
                        <AiFillFlag color="red" onClick={() => screenFlagHandler(screen._id)} aria-hidden="true" />
                      </HStack>
                    )}
                    {userInfo && screen.subscribers.includes(userInfo._id) ? (
                      <HStack>
                        <Text fontSize="50%"> {screen.subscribers.length} </Text>
                        <BiToggleLeft onClick={() => screenUnsubscribeHandler(screen._id)} aria-hidden="true" />
                      </HStack>
                    ) : (
                      <HStack>
                        <Text fontSize="50%"> {screen.subscribers.length} </Text>
                        <BiToggleRight onClick={() => screenSubscribeHandler(screen._id)} aria-hidden="true" />
                      </HStack>
                    )}
                  </SimpleGrid>
                )}
              </Flex>
              <hr />
              {loadingScreenParams ? (
                <LoadingBox></LoadingBox> 
              ) : errorScreenParams ? (
                <MessageBox variant="danger">{errorScreenParams}</MessageBox>
              ) : (
                <Box>
                  <Flex justify="space-between" rounded="sm" shadow="card" p="10px">
                    <Text fontSize="70%">Worth: <strong>{screen.scWorth} RATs</strong></Text>
                    <Text fontSize="70%">Worth*: <strong>{params.Wdash} RATs</strong></Text>
                    {params.Wdash > screen.scWorth && <AiOutlineArrowUp color="green"/>}
                    {params.Wdash < screen.scWorth && <AiOutlineArrowDown color="red"/>}
                  </Flex>
                  <hr />
                  <Flex justify="space-between" shadow="card" p="10px">
                    <Text fontSize="70%">Rent/Slot(rps): <strong>{screen.rentPerSlot} RATs</strong></Text>
                    <Text fontSize="70%">Rent/Slot(rps)*: <strong>{params.Rdash} RATs</strong></Text>
                    {params.Rdash > screen.rentPerSlot && <AiOutlineArrowUp color="green" />}
                    {params.Rdash < screen.rentPerSlot && <AiOutlineArrowDown color="red" />}
                  </Flex>
                </Box>
              )}
              <hr />
              <Box>
                <Text fontSize="70%">Time period of 1 slot : <strong>{screen.slotsTimePeriod} seconds</strong></Text>
                <Text fontSize="70%">Available Slots for the day : <strong>{((24 * 60 * 60 )/screen.slotsTimePeriod)}</strong></Text>
              </Box>
              <hr />
              <Text fontSize="">{screen.description}"</Text>
              <Rating rating={screen.rating} numReviews={screen.numReviews}></Rating>
            </Box>
            <Box rounded="sm" shadow="card" p="10px">
              <Flex justify="space-between">
                <Box width="15%">
                  <img src={screen.master.master.logo} alt={screen.master.master.name} />
                </Box>
                <Box as={RouterLink} to={`/master/${screen.master._id}`}>
                  <Heading fontSize="70%">{screen.master.master.name}</Heading>
                  <Text fontSize="70%">{screen.master._id}</Text>
                </Box>
              </Flex>
              <hr />
              <Text fontSize="">"{screen.master.master.description}"</Text>
              <Rating rating={screen.master.master.rating} numReviews={screen.master.master.numReviews}></Rating>
              <hr />
              <Heading fontSize="" >Allies List</Heading>
              {loadingUsers ? (
                <LoadingBox></LoadingBox>
              ) : errorUsers ? (
                <MessageBox variant="danger">{errorUsers}</MessageBox>
              ) : (
                <Box shadow="card" p="10px">
                  {screen.allies.map((ally: any) => (
                    <Text fontSize="70%" key={ally}>
                      {users.filter((user: any) => user._id === ally).map((user: any) => (
                        <Link key={user._id} as={RouterLink} to={`/ally/${user._id}`}>
                          {user.name}
                        </Link>
                      ))}
                    </Text>
                  ))}
                </Box>
              )}
              <hr />
              <Heading fontSize="70%">Freqeuncies remaining for today</Heading>
            </Box>
            <Box rounded="sm" shadow="card" p="10px">
              <Heading fontSize="70%">Write a review for this screen</Heading>
              {userInfo ? (
                <Box >
                   <FormControl id="comment">
                    {/* <FormLabel>Screen's Description</FormLabel> */}
                    <Stack direction="row" align="center">
                      <Input 
                        id="comment"
                        onChange={(e: any) => setComment(e.target.value)} 
                        placeholder={comment} 
                        value={comment}
                        type="text"  
                      />
                    </Stack>
                  </FormControl>
                  <hr />
                  <Flex justify="space-between">
                    <Text fontSize=""><strong>{screen.numReviews}</strong> Reviews</Text>
                    <Text fontSize="">Average Ratings: <strong> {screen.rating}</strong></Text>
                  </Flex>
                  <hr />
                  <Flex justify="space-between">
                    <Rating rating={screen.rating} numReviews={screen.numReviews}></Rating>
                    <FormControl id="rating">
                      <Stack direction="row" align="center">
                      <select
                        title="rating"
                        value={rating}
                        onChange={(e: any) => setRating(e.target.value)}
                      >
                        <option value="">Rating...</option>
                        <option value="1">1- Poor</option>
                        <option value="2">2- Fair</option>
                        <option value="3">3- Good</option>
                        <option value="4">4- Very Good</option>
                        <option value="5">5- Excellent</option>
                      </select>
                      </Stack>
                    </FormControl>
                  </Flex>
                  <hr />
                  <Button width="100%" fontSize="50%" type="submit" onSubmit={submitHandlerReview}>Submit</Button>
                  {loadingReviewCreate && <LoadingBox></LoadingBox>}
                  {errorReviewCreate && <MessageBox variant="danger">{errorReviewCreate}</MessageBox>}
                </Box>
              ) : (
                <MessageBox>
                  Please <Link as={RouterLink} to="/signin">Sign In</Link> to write a review
                </MessageBox>
              )}
            </Box>
          </SimpleGrid>
          <hr />
          <Stack>
            <Heading fontSize="70%">Screen Reviews</Heading>
            {screen.reviews.length === 0 && <MessageBox>There is no review</MessageBox>}
            {screen.reviews.map((review: any) => (
              <Box shadow="card" key={review._id}>
                <Heading fontSize="">{review.name}</Heading>
                <Rating rating={review.rating} caption=" "></Rating>
                <Text fontSize="">{review.createdAt.substring(0, 10)}</Text>
                <Text fontSize="">{review.comment}</Text>
              </Box>
            ))}
          </Stack>
          <hr />
          {loadingScreenCalender ? (
            <LoadingBox></LoadingBox>
          ) : errorScreenCalender ? (
            <MessageBox variant="danger">{errorScreenCalender}</MessageBox>
          ) : (
            <Box shadow="card" p="10px">
              <Heading fontSize="">Overall Slots used on the screen: {calender.slotDetails.map((slot: any) => slot).length}</Heading>
              <hr />
              {calender.slotDetails.map((slot: any) => (
                <Stack key={slot._id}>
                  <Flex justify="space-between">
                    <Text fontSize="90%">Starts at: {new Date(slot.slotTimeStart).toLocaleString()}</Text>
                    <Text fontSize="90%">Ends at: {new Date(new Date(slot.slotTimeStart).getTime() + slot.dataAttached.duration*1000).toLocaleString()}</Text>
                  </Flex>
                  <Text fontSize="70%">Advert Id:  {slot.dataAttached.video}</Text>
                  <Text fontSize="70%">Slot Playing Status: {slot.dataAttached.played === true ? (<>Played</>) : slot.dataAttached.played === false ? (<>Still to Play</>) : (null)}</Text>
                  <hr />
                </Stack>
              ))}
            </Box>
          )}
        </Stack>
      )}
    </Flex>
  );
}
