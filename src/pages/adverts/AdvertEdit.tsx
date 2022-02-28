import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import {
  DatePicker,
  DateTimePicker,
  TimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
// import {alpha} from '@material-ui/styles';
import { Box, Heading, Slider, SliderTrack, SliderMark, SliderFilledTrack, SliderThumb, FormControl, Select, FormLabel, Input, Center, Link, Flex, Stack, SimpleGrid, VStack, Text, Button, IconButton, HStack } from "@chakra-ui/react";

import TagsInput from '../../components/helpers/TagsInput';
import LoadingBox from '../../components/helpers/LoadingBox';
import MessageBox from '../../components/helpers/MessageBox';
import { getScreenParams, detailsScreen, } from '../../Actions/screenActions';
import {getWalletDetails} from '../../Actions/walletActions';
import { addCalenderData, getScreenCalender, bookSlot, bookDay, bookDaySlot } from '../../Actions/calenderActions';
import {getVideoDetails, updateVideo} from '../../Actions/videoActions';
import { VIDEO_UPDATE_RESET } from '../../Constants/videoConstants';
import { createAdvertGame, removeAdvertGame, getAdvertGameDetails, getScreenGameDetails } from '../../Actions/gameActions';

import {CgAddR} from 'react-icons/cg'


export function AdvertEdit(props: any) {
  const videoId = props.match.params.id;
  console.log("videoId", videoId);
  const screenId = props.match.params.screenId;
  console.log("screenId", screenId);

  const [title, setTitle] = useState<any>('');
  const [description, setDescription] = useState<any>('');
  const [thumbnail, setThumbnail] = useState<any>('');
  const [advert, setAdvert] = useState<any>('');
  const [uploading, setUploading] = useState<any>(false);
  const [errorUploading, setErrorUploading] = useState<any>('');
  const [adWorth, setAdWorth] = useState<any>(0);
  const [adBudget, setAdBudget] = useState<any>(0);
  const [expectedViews, setExpectedViews] = useState<any>(0);
  const [hrsToComplete, setHrsToComplete] = useState<any>(0);
  const [advertTags, setAdvertTags] = useState<any>([]);

  const [modalVisibel, setModalVisible] =useState<any>(false);
  const [slotsModalOpen, setSlotsModalOpen] = useState<any>(false);
  const [daySlotsModalOpen, setDaySlotsModalOpen] = useState<any>(false);

  const [dateHere, setDateHere] = useState<any>(new Date());
  const [startDateHere, setStartDateHere] = useState<any>(new Date());
  const [slotsPerDay, setSlotsPerDay] = useState<any>(1);

  const [slotBooked, setSlotBooked] = useState<any>("")
  const [dayBooked, setDayBooked] = useState<any>("")
  var [date, setDate] = useState<any>(new Date());
 
  const userSignin = useSelector((state: any) => state.userSignin);
  const { userInfo } = userSignin;

  const videoDetails = useSelector((state: any) => state.videoDetails);
  const { 
    loading: loadingVideo, 
    error: errorVideo, 
    video
  } = videoDetails;

  const screenDetails = useSelector((state: any) => state.screenDetails);
  const {
    loading: loadingScreen,
    error: errorScreen,
    screen
  } = screenDetails;

  const slotBooking = useSelector((state: any) => state.slotBooking);
  const {
    loading: loadingSlotBooking,
    error: errorSlotBooking,
    success: successSlotBooking,
    bookedSlot
  } = slotBooking;

  const screenCalender = useSelector((state: any) => state.screenCalender);
  const {
    loading: loadingScreenCalender,
    error: errorScreenCalender,
    calender
  } = screenCalender;

  const calenderDataAdd = useSelector((state: any) => state.calenderDataAdd);
  const {
    loading: loadingCalenderDataAdd,
    error: errorCalenderDataAdd,
    success: successCalenderDataAdd,
    calenderSlotData
  } = calenderDataAdd;

  const calenderDaySlotBook = useSelector((state: any) => state.calenderDaySlotBook);
  const {
    loading: loadingDaySlotBook,
    error: errorDaySlotBook,
    success: successDaySlotBook,
    calenderDaySlotData
  } = calenderDaySlotBook;

  const dayBooking = useSelector((state: any) => state.dayBooking);
  const {
    loading: loadingDayBooking,
    error: errorDayBooking,
    success: successDayBooking,
    bookedDay
  } = dayBooking;

  const videoUpdate = useSelector((state: any) => state.videoUpdate);
  const {
    loading: loadingVideoUpdate,
    error: errorVideoUpdate,
    success: successVideoUpdate,
  } = videoUpdate;
  
  const advertGameCreate = useSelector((state: any) => state.advertGameCreate);
  const {
    loading: loadingAdvertGameCreate,
    error: errorAdvertGameCreate,
    success: successAdvertGameCreate,
    createdAdvertGame
  } = advertGameCreate

  const advertGameDetails = useSelector((state: any) => state.advertGameDetails);
  const {
    loading: loadingAdvertGameDetails,
    error: errorAdvertGameDetails,
    advertGameData
  } = advertGameDetails;

  const advertGameRemove = useSelector((state: any) => state.advertGameRemove);
  const {
    loading: loadingAdvertGameRemove,
    error: errorAdvertGameRemove,
    success: successAdvertGameRemove
  } = advertGameRemove

  const walletDetails = useSelector((state: any) => state.walletDetails);
  const {
    loading: loadingWallet,
    error: errorWallet,
    wallet
  } = walletDetails;

  const dispatch = useDispatch();
  
  useEffect(() => {
    if (!video || video._id !== videoId || successVideoUpdate) {
      dispatch({
        type: VIDEO_UPDATE_RESET
      });
      dispatch(getVideoDetails(videoId));
    } else {
      setTitle(video.title);
      setThumbnail(thumbnail || video.thumbnail);
      setAdvert(advert || video.video);
      setDescription(video.description);
      setAdWorth(video.adWorth);
      setAdBudget(video.adBudget);
      setHrsToComplete(video.hrsToComplete);
      setExpectedViews(video.expectedViews);
      setAdvertTags(video.videoTags)
    }

    if(successSlotBooking) {
      window.alert('slot booked successfully');
      setSlotsModalOpen(false)
      setSlotBooked(false)
      dispatch(getScreenCalender(screenId))
    }
    if(successDayBooking){
      window.alert('day booked successfully');
      setDaySlotsModalOpen(false)
      setDayBooked(false)
      dispatch(getScreenCalender(screenId))
    }
    if(successAdvertGameCreate) {
      window.alert('Advert Game Created Successfully')
    }
    if(successAdvertGameRemove) {
      window.alert('Advert Game Removed Successfully')
    }

    dispatch(getWalletDetails(userInfo.defaultWallet));
    dispatch(detailsScreen(screenId));
    dispatch(getVideoDetails(videoId));
    dispatch(getScreenCalender(screenId))
    dispatch(getAdvertGameDetails(videoId))


    var timer = setInterval(() => setDate(new Date()), 1000)
    return function cleanup() {
      clearInterval(timer)
    }


  }, [
    dispatch, 
    userInfo, 
    videoId, 
    screenId,
    successCalenderDataAdd,
    successDaySlotBook,
    successSlotBooking,
    bookedSlot,
    successVideoUpdate,
    createdAdvertGame,
    successAdvertGameCreate,
    successAdvertGameRemove,
  ]);

  const selectedTags = (tags: any) => {
    console.log(tags);
    setAdvertTags(tags);
  };
  
  const videoUploadHandler = (e: any) => {
    e.preventDefault();
    console.log( "Screen Campaign Ready" );
    props.history.push(`/screen/${screenId}`);
  };

  const dateTimeHandler = () => {
    setDaySlotsModalOpen(false)
    setSlotsModalOpen(true)
    dispatch(addCalenderData(video.screen, {
      dateHere,
      video
    }))
  }

  const daySlotHandler = () => {
    setSlotsModalOpen(false)
    setDaySlotsModalOpen(true)
    dispatch(bookDaySlot(screenId, {
      startDateHere,
      slotsPerDay,
      video
    }))
  }

  const slotBookingHandler = (slotId: any) => {
    setSlotsModalOpen(true)
    setSlotBooked(true)
    window.alert('Confirm Booking slot')
    dispatch(bookSlot(screenId, slotId, {
      dateHere,
      slotBooked,
      video
    }));
  }

  const dayBookingHandler = (dayId: any) => {
    setDaySlotsModalOpen(true)
    setDayBooked(true)
    window.alert('Confirm Booking day')
    dispatch(bookDay(screenId, dayId, {
      startDateHere,
      daySlot: calenderDaySlotData.daySlot,
      slotsPerDay,
      dayBooked,
      video
    }));
  }

  const videoUpdateHandler = (e: any) => {
    e.preventDefault();
    dispatch(updateVideo({
      _id: videoId,
      advert,
      thumbnail,
      title,
      description,
      adWorth,
      adBudget,
      expectedViews,
      hrsToComplete,
      advertTags
    }))
  }

  const addGameContract = (e: any) => {
    e.preventDefault();
    window.alert('Please confirm your request to create screen game.')
    dispatch(createAdvertGame(videoId, {
      _id: videoId,
      adWorth,
      expectedViews,
      hrsToComplete,
      adBudget,
      advertTags
    }))
  }

  const removeGameContract = (e: any) => {
    e.preventDefault();
    dispatch(removeAdvertGame(videoId))
  }

  return (
    <Center>
      {loadingVideoUpdate && <LoadingBox></LoadingBox>}
      {errorVideoUpdate && <MessageBox variant="danger">{errorVideoUpdate}</MessageBox>}
      {loadingScreen ? (
        <LoadingBox></LoadingBox>
      ) : errorScreen ? (
        <MessageBox variant="danger">{errorScreen}</MessageBox>
      ) : (
        <Stack>
          {loadingVideo ? (
            <LoadingBox></LoadingBox>
          ) : errorVideo ? (
            <MessageBox variant="danger">{errorVideo}</MessageBox>
          ) : (
            <Stack>
              <SimpleGrid columns={[1, 2]} gap="2">
                <Button 
                  type="button" 
                  className="primary block" 
                  onClick={videoUploadHandler}>
                  Upload Advert
                </Button>
                <Button
                  bg="purple.400"
                  type="button"
                  onClick={() => props.history.push(`/screen/${screen._id}`)}
                  className="secondary block"
                >
                  Back
                </Button>
              </SimpleGrid>
              <SimpleGrid columns={[1, 2]} gap="2">
                <Box shadow="card" p="10px">
                  <Heading textAlign="center" fontSize="">Edit Campaign Advert</Heading>
                  <hr />
                  <FormControl id="title">
                    <FormLabel>Enter the Name of the Campaign</FormLabel>
                    <Stack direction="row" align="center">
                      <Input 
                        id="title"
                        onChange={(e) => setTitle(e.target.value)} 
                        placeholder={title} 
                        value={title}
                        type="text"  
                      />
                    </Stack>
                  </FormControl>
                  <FormControl id="description">
                    <FormLabel>Enter the Name of the Campaign</FormLabel>
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
                  <Text fontSize="">You need to load your wallet first for uploading media. 
                    <Link to="/userProfile"> Please click here to visit your profile page </Link> 
                    and then select your default wallet to load, if loading continues...
                  </Text>
                  <FormControl id="thumbnail">
                    <FormLabel>Choose an Image(.png/.jpg)' as Tumbnail</FormLabel>
                    <Stack direction="row" align="center">
                      <Input 
                        id="thumbnail"
                        onChange={(e) => setThumbnail(e.target.value)} 
                        placeholder={thumbnail} 
                        value={thumbnail}
                        type="text"  
                      />
                      {uploading && <MessageBox>{setUploading(true)}</MessageBox>}
                      {errorUploading && (
                        <MessageBox variant="danger">{errorUploading && setErrorUploading(true)}</MessageBox>
                      )}
                    </Stack>
                  </FormControl>
                  <FormControl id="advert">
                    <FormLabel>Upload your videoFile (.mp4), less than 40mb.</FormLabel>
                    <Stack direction="row" align="center">
                      <Input 
                        id="advert"
                        onChange={(e) => setAdvert(e.target.value)} 
                        placeholder={advert} 
                        value={advert}
                        type="text"  
                      />
                      {uploading && <MessageBox>Uploading...</MessageBox>}
                      {errorUploading && (
                        <MessageBox variant="danger">{errorUploading}</MessageBox>
                      )}
                    </Stack>
                  </FormControl>
                  <FormControl id="advertTags">
                    <FormLabel>Tags</FormLabel>
                    <Stack direction="row" align="center">
                      <Input 
                        id="advertTags"
                        onChange={(e) => setAdvertTags(e.target.value)} 
                        placeholder="nsfw,art,holiday, ...etc" 
                        value={advertTags}
                        />
                    </Stack>
                    <HStack>{Object.keys(advertTags).map((key) => [String(key), advertTags[key]]).map((t) => (
                      <Text key={t[1]} fontSize="70%">{t[1]}</Text>
                    ))}
                    </HStack>
                  </FormControl>
                </Box>
                <Box shadow="card" p="10px">
                  <Flex justify="space-between">
                    <img 
                      width="50%"
                      src={thumbnail} 
                      alt="screen_image"
                    />
                    <video 
                      width="50%"
                      src={advert} 
                    />
                  </Flex>
                  <hr />
                  {loadingWallet ? (
                    <LoadingBox></LoadingBox>
                  ) : errorWallet ? (
                    <MessageBox message={errorWallet}></MessageBox>
                  ) : (
                    <Stack shadow="card" p="10px">
                      <FormControl id="image">
                        <FormLabel>Choose an Image(.png/.jpg)' as Tumbnail</FormLabel>
                        <Stack direction="row" align="center">
                          <select
                            title="thumbnail"
                            value={thumbnail}
                            onChange={(e) => setThumbnail(e.target.value)}
                          >{wallet.transactions.map((tx: any) => (tx.txType.type === "ANFT_CREATION") && (
                            
                            <option key={tx.txId} value={`https://arweave.net/${tx.txId}`}>
                              {tx.txId}
                            </option>
                          ))}
                          </select>
                          {uploading && <LoadingBox></LoadingBox>}
                          {errorUploading && (
                            <MessageBox variant="danger">{errorUploading && setErrorUploading(true)}</MessageBox>
                          )}
                        </Stack>
                      </FormControl>
                      <FormControl id="image">
                        <FormLabel>Upload your videoFile (.mp4), less than 40mb.</FormLabel>
                        <Stack direction="row" align="center">
                          <select
                            title="advert"
                            value={advert}
                            onChange={(e) => setAdvert(e.target.value)}
                          >{wallet.transactions.map((tx: any) => (tx.txType.type === "ANFT_CREATION") && (
                            
                            <option key={tx.txId} value={`https://arweave.net/${tx.txId}`}>
                              {tx.txId}
                            </option>
                          ))}
                          </select>
                          {uploading && <LoadingBox></LoadingBox>}
                          {errorUploading && (
                            <MessageBox variant="danger">{errorUploading}</MessageBox>
                          )}
                        </Stack>
                      </FormControl>
                    </Stack>
                  )}
                  <hr />
                  {!video.activeGameContract ? (
                    <Stack shadow="card" p="10px">
                      <Heading textAlign="center" fontSize="" >Edit Game Details</Heading>
                      <FormControl id="adWorth">
                        <FormLabel>Enter Campaign's Worth(in RATs)</FormLabel>
                        <Stack direction="row" align="center">
                          <Input 
                            id="adWorth"
                            onChange={(e) => setAdWorth(e.target.value)} 
                            placeholder={adWorth} 
                            value={adWorth}
                            type="number"  
                          />
                        </Stack>
                      </FormControl>
                      <FormControl id="adBudget">
                        <FormLabel>Enter Campaign's Budget(in RATs)</FormLabel>
                        <Stack direction="row" align="center">
                          <Input 
                            id="adBudget"
                            onChange={(e) => setAdBudget(e.target.value)} 
                            placeholder={adBudget} 
                            value={adBudget}
                            type="number"  
                          />
                        </Stack>
                      </FormControl>
                      <FormControl id="expectedViews">
                        <FormLabel>Enter Expected Interactions</FormLabel>
                        <Stack direction="row" align="center">
                          <Input 
                            id="expectedViews"
                            onChange={(e) => setExpectedViews(e.target.value)} 
                            placeholder={expectedViews} 
                            value={expectedViews}
                            type="number"  
                          />
                        </Stack>
                      </FormControl>
                      <FormControl id="hrsToComplete">
                        <FormLabel>Enter Expected Interactions</FormLabel>
                        <Stack direction="row" align="center">
                          <Input 
                            id="hrsToComplete"
                            onChange={(e) => setHrsToComplete(e.target.value)} 
                            placeholder={hrsToComplete} 
                            value={hrsToComplete}
                            type="number"  
                          />
                        </Stack>
                      </FormControl>
                    </Stack>
                  ) : (
                    <Stack shadow="card" p="10px">
                      {loadingAdvertGameDetails ? (
                        <LoadingBox></LoadingBox>
                      ) : errorAdvertGameDetails ? (
                        <MessageBox variant="danger">{errorAdvertGameDetails}</MessageBox>
                      ) : (
                        <Box>
                          {advertGameData?.message && (
                            <MessageBox variant="danger">{advertGameData.message}</MessageBox>
                          )}
                          <Heading fontSize="">Initial Advert Worth: {advertGameData?.gameParams?.initialWorth} RAT</Heading>
                          <Heading fontSize="">Initial Advert Budget: {advertGameData?.gameParams?.initialBudget} RAT</Heading>
                          <Heading fontSize="">Expected Views: {advertGameData?.gameParams?.expectedViews} RAT</Heading>
                        </Box>
                      )}
                    </Stack>
                  )}
                  {video.__v >= 1 ? (
                    <Stack>
                      {video.activeGameContract ? (
                        <Box>
                          {loadingAdvertGameRemove ? (
                            <LoadingBox></LoadingBox>
                          ) : errorAdvertGameRemove ? (
                            <MessageBox variant="danger">{errorAdvertGameRemove}</MessageBox>
                          ) : (
                            <Button width="100%" onClick={removeGameContract}>Remove Game</Button>
                          )}
                        </Box>
                      ) : (
                        <Box>
                          {loadingAdvertGameCreate ? (
                            <LoadingBox></LoadingBox>
                          ) : errorAdvertGameCreate ? (
                            <MessageBox variant="danger">{errorAdvertGameCreate}</MessageBox>
                          ) : (
                            <Button width="100%" onClick={addGameContract}>Create Game</Button>
                          )}
                        </Box>
                      )}
                    </Stack>
                  ) : (
                    <Text fontSize="">Please update once with desired values to create screen game</Text>
                  )}
                </Box>
              </SimpleGrid>
              <Button width="100%" type="submit" onClick={videoUpdateHandler}>
                Update Campaign Details
              </Button>
              <hr />
              <Box shadow="card" p="10px">
                {loadingVideo ? (
                  <LoadingBox></LoadingBox>
                ) : errorVideo ? (
                  <MessageBox variant="danger">{errorVideo}</MessageBox>
                ) : (
                  <Stack>
                    <Heading fontSize="" textAlign="center">Campaign Media</Heading>
                    <HStack>
                      <Box width="50%">
                        <Text>Campaign Thumbnail Image</Text>
                        <img 
                          src={video.thumbnail} 
                          width="100%" 
                          height="100%" 
                          onClick={() => props.history.push(`/video/${video._id}`)}  
                          alt={video.title}
                        />
                      </Box>
                      <Box width="50%">
                        <Text>Campaign Video Preview</Text>
                        <video 
                          src={video.video}
                          // alt={video.title} 
                          autoPlay 
                          width="100%" 
                          height="100%" 
                          onClick={() => props.history.push(`/video/${video._id}`)}
                          ></video>
                      </Box>
                    </HStack>
                    <Heading textAlign="center">Campaign Details</Heading>
                    {video.activeGameContract ? (
                      <Box>
                        <Flex justify="space-between">
                          <Text fontSize="">Campaign Worth: <strong>{video.adWorth} RATs</strong></Text>
                          <Text fontSize="">Campaign Budget: <strong>{video.adBudget} RATs</strong></Text>
                          <Text fontSize="">Expected Views: <strong>{video.expectedViews}</strong></Text>
                        </Flex>
                      </Box>
                    ) : (
                      <Text fontSize="">Please delete the campaign and create a new campaign with an "ADVERT RAT TRAP GAME"...</Text>
                    )}
                  </Stack>
                )}
              </Box>
              <hr />
              <Heading textAlign="center" >Slots Details</Heading>
              <Flex shadow="card" p="10px" justify="space-between">
                <p>Screen slot's time period: <strong>{screen.slotsTimePeriod} sec</strong></p>
                <p>Rent per slot : <strong>{screen.rentPerSlot} RAT</strong></p>
                <h4>At Present: {date.toDateString()}, {date.toLocaleTimeString()}</h4>
              </Flex>
              <hr />
              <SimpleGrid columns={[1, 2]} gap="2">
                <Stack shadow="card" p="10px">
                  <Heading fontSize="" textAlign="center">Book Day Slot</Heading>
                  <hr />
                  {loadingScreenCalender ? (
                    <LoadingBox></LoadingBox>
                  ) : errorScreenCalender ? (
                    <MessageBox variant="danger">{errorScreenCalender}</MessageBox>
                  ) : (
                    <Box ref={React.createRef()}>
                      <Flex justify="space-between">
                        <FormControl width="25%" id="startDateHere">
                          <MuiPickersUtilsProvider  utils={DateFnsUtils}>
                            <DateTimePicker 
                              disablePast={true}
                              format="dd/MM/yyyy"
                              variant="dialog"
                              label="Select slot date"
                              value={startDateHere}
                              onChange={setStartDateHere}
                            />
                          </MuiPickersUtilsProvider>
                        </FormControl>
                        <Slider
                          width="60%"
                          id='slider'
                          min={1}
                          max={4200} 
                          colorScheme='purple'
                          aria-label='slider-ex-6' 
                          onChange={(val) => setSlotsPerDay(val)}>
                          <SliderMark
                            value={slotsPerDay}
                            textAlign='center'
                            bg='purple.400'
                            color='white'
                            mt='-2'
                            ml='-12'
                            w='12'
                          >
                            {slotsPerDay}
                          </SliderMark>
                          <SliderTrack>
                            <SliderFilledTrack />
                          </SliderTrack>
                          <SliderThumb />
                        </Slider>
                        <FormControl width="12%" id="slotsPerDay">
                          <Stack direction="row" align="center">
                            <Input 
                              id="slotsPerDay"
                              onChange={(e) => setSlotsPerDay(e.target.value)} 
                              placeholder={slotsPerDay} 
                              value={slotsPerDay}
                              type="number"  
                            />
                          </Stack>
                        </FormControl>
                      </Flex>
                      <Button width="100%" onClick={daySlotHandler}>
                        Show Details
                      </Button>
                    </Box>
                  )}
                  <hr />
                  {daySlotsModalOpen && (
                    <Box >
                      {loadingDaySlotBook ? (
                        <LoadingBox></LoadingBox>
                      ) : errorDaySlotBook ? (
                        <MessageBox variant="danger">{errorDaySlotBook}</MessageBox>
                      ) : (
                        <Box >

                          <Flex py="20px" justify="space-between">
                            <Box width="20%">
                              <Text fontSize="70%">Date : <strong>{new Date(calenderDaySlotData.daySlot.date).toDateString()}</strong></Text >
                              <Text fontSize="70%">SlotsAvailable : <strong>{calenderDaySlotData.slotsAvailable}</strong></Text >
                            </Box>
                            <Slider
                            width="65%"
                            id='slider'
                            min={1}
                            max={4200} 
                            colorScheme='purple'
                            aria-label='slider-ex-6' 
                            onChange={(val) => setSlotsPerDay(val)}>
                              <SliderMark
                                value={slotsPerDay}
                                textAlign='center'
                                bg='purple.400'
                                color='white'
                                mt='-2'
                                ml='-12'
                                w='12'
                              >
                                {slotsPerDay}
                              </SliderMark>
                              <SliderTrack>
                                <SliderFilledTrack />
                              </SliderTrack>
                              <SliderThumb />
                            </Slider>
                            <FormControl width="12%" id="slotsPerDay">
                              <Stack direction="row" align="center">
                                <Input 
                                  id="slotsPerDay"
                                  onChange={(e) => setSlotsPerDay(e.target.value)} 
                                  placeholder={slotsPerDay} 
                                  value={slotsPerDay}
                                  type="number"  
                                />
                              </Stack>
                            </FormControl>
                          </Flex>
                          {!calenderDaySlotData.daySlot.slotsBooked.isSlotBooked ? (
                            <Flex justify="space-between">
                              {loadingDayBooking ? (
                                <LoadingBox></LoadingBox>
                              ) : errorDayBooking ? (
                                <MessageBox variant="danger">{errorDayBooking}</MessageBox>
                              ) : (
                                <></>
                              )}
                              <Button onClick={() => dayBookingHandler(calenderDaySlotData.daySlot._id)}>
                                Book
                              </Button>
                              <Button >
                                Cancel
                              </Button>
                            </Flex>
                          ) : (
                            <Text fontSize="" >Already booked for the day</Text>
                          )}
                        </Box>
                      )}
                    </Box>
                  )}
                </Stack>
                <Stack shadow="card" p="10px">
                  <Heading fontSize="" textAlign="center">Book Time Slot</Heading>
                  <hr />
                  <Box ref={React.createRef()}>
                    <Flex justify="space-between">
                      <Heading fontSize="">1 Slot</Heading>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DateTimePicker 
                            disablePast={true}
                            format="dd/MM/yyyy"
                            variant="dialog"
                            label="Select slot date"
                            value={dateHere}
                            onChange={setDateHere}
                          />
                      </MuiPickersUtilsProvider>
                    </Flex>
                    <Button
                      width="100%"
                      onClick={dateTimeHandler}
                      >Show Details
                    </Button>
                  </Box>
                  {slotsModalOpen && (
                    <Flex>
                      {loadingCalenderDataAdd ? (
                        <LoadingBox></LoadingBox>
                      ) : errorCalenderDataAdd ? (
                        <MessageBox variant="danger">{errorCalenderDataAdd}</MessageBox>
                      ) : (
                        <HStack >
                          <Box >
                            <Text fontSize="">Preceeding Slot</Text>
                            {calenderSlotData?.viewSlots?.preceedingSlotAsked ? (
                              <Text fontSize="">
                                {new Date(calenderSlotData.viewSlots.preceedingSlotAsked.slotTimeStart).toLocaleString()} to {' '}
                                {new Date(new Date(calenderSlotData.viewSlots.preceedingSlotAsked.slotTimeStart).getTime() + calenderSlotData.viewSlots.preceedingSlotAsked.dataAttached.duration*1000).toLocaleString()}
                              </Text>
                            ) : (
                              <Text fontSize="">Slots empty</Text>
                            )}
                          </Box>
                          <Box >
                            <Text fontSize="">Asked Slot</Text>
                            {!calenderSlotData?.slotBooked && (
                              <Text fontSize="">
                                {new Date(calenderSlotData.viewSlots.slotAsked.slotTimeStart).toLocaleString()} to {' '}
                                {new Date(new Date(calenderSlotData.viewSlots.slotAsked.slotTimeStart).getTime() + calenderSlotData.viewSlots.slotAsked.dataAttached.duration*1000).toLocaleString()}{' '}
                              </Text>
                            )}
                            {calenderSlotData?.slotBooked && (
                              <HStack>
                                <Text fontSize="70%">
                                  {new Date(calenderSlotData.slotBooked.slotTimeStart).toLocaleString()} to {' '}
                                  {new Date(new Date(calenderSlotData.slotBooked.slotTimeStart).getTime() + calenderSlotData.slotBooked.dataAttached.duration*1000).toLocaleString()}{' '}
                                </Text>
                                {calenderSlotData.slotBooked.isSlotBooked === false && (
                                  <Flex>
                                    {loadingSlotBooking ? (
                                      <LoadingBox></LoadingBox>
                                    ) : errorSlotBooking ? (
                                      <MessageBox variant="danger">{errorSlotBooking}</MessageBox>
                                    ) : (
                                      <CgAddR aria-hidden="true"
                                        onClick={() => slotBookingHandler(calenderSlotData.slotBooked._id)}
                                      />
                                    )}
                                  </Flex>
                                )}
                              </HStack>
                            )}
                          </Box>
                          <Box>
                            <Text fontSize="">Succeeding Slot</Text>
                            {calenderSlotData?.viewSlots?.succeedingSlotAsked ? (
                              <Text fontSize="">
                                {new Date(calenderSlotData.viewSlots.succeedingSlotAsked.slotTimeStart).toLocaleString()} to {' '}
                                {new Date(new Date(calenderSlotData.viewSlots.succeedingSlotAsked.slotTimeStart).getTime() + calenderSlotData.viewSlots.succeedingSlotAsked.dataAttached.duration*1000).toLocaleString()}
                              </Text>
                            ) : (
                              <Text fontSize="">Slots empty</Text>
                            )} 
                          </Box>
                        </HStack>
                      )}
                    </Flex>
                  )}
                </Stack>
              </SimpleGrid>
              <hr />
              {loadingScreenCalender ? (
                <LoadingBox></LoadingBox>
              ) : errorScreenCalender ? (
                <MessageBox variant="danger">{errorScreenCalender}</MessageBox>
              ) : (
                <Box shadow="card" p="10px">
                  <Heading fontSize="">Today's slots for the campaign :
                    {calender.dayDetails.filter((day: any) => 
                      new Date(day.date).getDate() === new Date(date).getDate() 
                    ).length}
                  </Heading>
                  <hr />
                  {calender.dayDetails.filter((day: any) => 
                    new Date(day.date).getDate() === new Date(date).getDate() 
                  ).map((slot: any) => (
                    <Box key={slot._id}>
                      <Heading fontSize="">slotDetails</Heading>
                      <Text fontSize="">{new Date(slot.date).toLocaleString()} </Text>
                      {slot.slotsBooked.filter((slotbooked: any) => (slotbooked.campaignDetails === video._id)) ? (
                        <Text fontSize="">{slot.slotsBooked.filter((slotbooked: any) => (slotbooked?.campaignDetails === video._id))[0]?.numberOfSlots} <strong> Random</strong></Text>
                      ) : (
                        <Text fontSize="">No Advert found</Text>
                      )}
                      <hr />
                    </Box>
                  ))}
                  <Heading fontSize="">Overall slots of the campaign</Heading>
                  <hr />
                  {calender.dayDetails.sort((sl: any) => (new Date(sl.date) >= new Date(date))).map((slot: any) => (
                    <Box shadow="card" p="10px" key={slot._id}>
                      <Heading fontSize="">slotDetails</Heading>
                      <Text fontSize="">{new Date(slot.date).toLocaleString()} </Text>
                      {slot.slotsBooked.filter((slotbooked: any) => (slotbooked.campaignDetails === video._id)) ? (
                        <Text fontSize="">{slot.slotsBooked.filter((slotbooked: any) => (slotbooked?.campaignDetails === video._id))[0]?.numberOfSlots} <strong> Random</strong></Text>
                      ) : (
                        <Text fontSize="">No Advert found</Text>
                      )}
                      <hr />
                    </Box>
                  ))}
                  <Heading fontSize="">Today's slots for the campaign : {' '}
                    {calender.slotDetails.filter((slotDetail: any) => 
                      new Date(slotDetail.slotTimeStart).getDate() === new Date().getDate() && slotDetail.dataAttached.video === video._id 
                    ).length}
                  </Heading>
                  <hr />
                  {calender.slotDetails.filter((slotDetail: any) => 
                    new Date(slotDetail.slotTimeStart).getDate() === new Date().getDate() && slotDetail.dataAttached.video === video._id 
                  ).map((slot: any) => (
                    <Box shadow="card" p="10px" key={slot._id}>
                      <Heading fontSize="">slotDetails</Heading>
                      <Text fontSize="">{new Date(slot.slotTimeStart).toLocaleString()} to </Text>
                      <Text fontSize="">{new Date(new Date(slot.slotTimeStart).getTime() + slot.dataAttached.duration*1000).toLocaleString()}</Text>
                      {slot.dataAttached.isPlayed === true ? (
                        <Text fontSize="">Media Played</Text>
                      ) : (
                        <Text fontSize="">Not Played Yet</Text>
                      )}
                      <hr />
                    </Box>
                  ))}  
                  <Heading fontSize="">Overall slots of the campaign</Heading>
                  <hr />
                  {calender.slotDetails.filter((slotDetail: any) => 
                    slotDetail.dataAttached.video === videoId 
                  ).sort((sl: any) => (new Date(sl.slotTimeStart) >= new Date(date))).map((slot: any) => (
                    <Box shadow="card" p="10px" key={slot._id}>
                      <Heading fontSize="">slotDetails</Heading>
                      <Text fontSize="">{new Date(slot.slotTimeStart).toLocaleString()} to </Text>
                      <Text fontSize="">{new Date(new Date(slot.slotTimeStart).getTime() + slot.dataAttached.duration*1000).toLocaleString()}</Text>
                      {slot.dataAttached.isPlayed === true ? (
                        <Text fontSize="">Media Played</Text>
                      ) : (
                        <Text fontSize="">Not Played Yet</Text>
                      )}
                      <hr />
                    </Box>
                  ))}
                </Box>
              )}
            </Stack>
          )} 
        </Stack>
      )}
    </Center>
  );
}
