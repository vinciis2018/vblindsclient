import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, FormControl, Input, Heading, Link, Flex, Stack, HStack, SimpleGrid, VStack, Text, Button, IconButton } from "@chakra-ui/react";

import LoadingBox from '../../components/helpers/LoadingBox';
import MessageBox from '../../components/helpers/MessageBox';
import Rating from '../../components/helpers/Rating';
import { createReview, deleteChannelFilm, detailsChannel, likeChannel, flagChannel, channelFilmsList, channelFilmUpload, subscribeChannel, unlikeChannel, unsubscribeChannel } from '../../Actions/channelActions';
import { signout } from '../../Actions/userActions';
import { CHANNEL_REVIEW_CREATE_RESET } from '../../Constants/channelConstants';

import {AiOutlineDoubleLeft, AiOutlineArrowUp, AiOutlineArrowDown, AiOutlineDelete, AiFillDislike, AiFillLike, AiFillFlag, AiOutlineEdit, AiOutlineUpload } from 'react-icons/ai'
import {BiToggleLeft, BiToggleRight} from 'react-icons/bi';


export function ChannelDetails(props: any) {

  const channelId = props.match.params.id;
  console.log("channelId", channelId);

  const [modalVisible, setModalVisible] = useState<any>(false);
  const [modalActive, setModalActive] = useState<any>(false);

  const [id, setId] = useState<any>('');
  const [title, setTitle] = useState<any>('');
  const [description, setDescription] = useState<any>('');
  const [thumbnail, setThumbnail] = useState<any>('');
  const [video, setVideo] = useState<any>('');
  const [uploading, setUploading] = useState<any>(false);
  const [errorUploading, setErrorUploading] = useState<any>('');

  const [rating, setRating] = useState<any>(0);
  const [comment, setComment] = useState<any>('');


  const dispatch = useDispatch();

  const channelFilms = useSelector((state: any) => state.channelFilms);
  const { films, loading, error } = channelFilms;


  const channelDetails = useSelector((state: any) => state.channelDetails);
  const {
    loading: loadingChannel,
    error: errorChannel,
    channel
  } = channelDetails;

  const userSignin = useSelector((state: any) => state.userSignin);
  const { userInfo } = userSignin;

  const channelReviewCreate = useSelector((state: any) => state.channelReviewCreate);
  const {
    loading: loadingReviewCreate,
    error: errorReviewCreate,
    success: successReviewCreate,
  } = channelReviewCreate;

  
  const channelLike = useSelector((state: any) => state.channelLike);
  const {
    success: successLikeChannel,
  } = channelLike;

  const channelUnlike = useSelector((state: any) => state.channelUnlike);
  const {
    success: successUnlikeChannel,
  } = channelUnlike;

  const channelFlag = useSelector((state: any) => state.channelFlag);
  const {
    success: successFlagChannel,
  } = channelFlag;

  const channelSubscribe = useSelector((state: any) => state.channelSubscribe);
  const {
    success: successSubscribeChannel,
  } = channelSubscribe;

  const channelUnsubscribe = useSelector((state: any) => state.channelUnsubscribe);
  const {
    success: successUnsubscribeChannel,
  } = channelUnsubscribe;

  const filmDelete = useSelector((state: any) => state.filmDelete);
  const {
    success: successDelete,
  } = filmDelete;

  const channelGameDetails = useSelector((state: any) => state.channelGameDetails);
  const {
    loading: loadingChannelGameDetails,
    error: errorChannelGameDetails,
    channelGameData
  } = channelGameDetails;

  const channelParams = useSelector((state: any) => state.channelParams);
  const { 
    loading: loadingChannelParams,
    error: errorChannelParams,
    params  
  } = channelParams;


  function channelLikeHandler(channelId: any) {
    console.log('Like');
    if (userInfo) {
      window.alert('Please signin again to confirm your like and continue...');
      dispatch(likeChannel({channelId, interaction: "like"}));
    } else {
      alert('Please sign in to like channel');
    }
  }

  function channelUnlikeHandler(channelId: any) {
    console.log('unLike');
    if (userInfo) {
      window.alert('Please signin again to confirm your unlike and continue...');
      dispatch(unlikeChannel(channelId));
    } else {
      alert('Please sign in to unlike channel');
    }
  }

  function channelFlagHandler(channelId: any) {
    if(userInfo) {
      window.alert('On Flagging this channel, you are reporting the admin for an inspection by tipping the admin from your default wallet. This will return as an incentive reward later...');
      dispatch(flagChannel({channelId, interaction: "flag"}));
    } else {
      window.alert('Please sign in to flag screen');
    }
  }


  function channelSubscribeHandler(channelId: any) {
    console.log('subscribe');
    if (userInfo) {
      window.alert('Please signin again to confirm your subscribe and continue...');
      dispatch(subscribeChannel({channelId, interaction: "subscribe"}));
    } else {
      alert('Please sign in to be a subscriber of the channel');
    }
  }

  function channelUnsubscribeHandler(channelId: any) {
    console.log('unsubscribe');
    if (userInfo) {
      window.alert('Please signin again to confirm your unsubscription and continue...');
      dispatch(unsubscribeChannel({channelId, interaction: "unsubscribe"}));
    } else {
      alert('Please sign in to no be a subscriber of the channel');
    }
  }

  useEffect(() => {
    if (successReviewCreate) {
      window.alert('Review submitted successfully');
      setRating('');
      setComment('');
      dispatch({
        type: CHANNEL_REVIEW_CREATE_RESET
      })
    }


    dispatch(detailsChannel(channelId));
    dispatch(channelFilmsList(channelId));

    console.log("channelId", channelId);

  }, [
    dispatch, 
    successDelete, 
    userInfo, 
    channelId, 
    successReviewCreate
  ]);


  const submitHandlerReview = (e: any) => {
    e.preventDefault();
    if (comment && rating) {
      dispatch(
        createReview(channelId, { rating, comment, name: userInfo.name })
      );
    } else {
      alert('Please enter comment and rating');
    }
  };

  const filmUploadHandler = (e: any) => {
    e.preventDefault();
    dispatch(
      channelFilmUpload(channelId, {
        _id: id,
        title,
        description,
        thumbnail,
        video,
      })
    );
    console.log({ channelFilmUpload });
    setModalVisible(false);
    return window.location.replace(`/channel/${channelId}`);

  };


  const openModal = (film: any) => {
    setModalVisible(!modalVisible);
    setId(film._id);
    setTitle(film.title);
    setDescription(film.description);
    setThumbnail(film.thumbnail);
    setVideo(film.video);
  };

  const deleteFilmHandler = (film: any) => {
    if (window.confirm('Are you sure to delete?')) {
      dispatch(deleteChannelFilm(film._id));

    }
    window.location.replace(`/channel/${channelId}`);
  };


  const openDeleteFilmModal = (film: any) => {
    setModalActive(!modalActive);

  };

  return (
    <Flex>
      {loadingChannel ? (
        <LoadingBox></LoadingBox>
      ) : errorChannel ? (
        <MessageBox variant='danger'>{errorChannel}</MessageBox>
      ) : (
      <Stack>
        <HStack align="center" justify="space-between">
          <Link width="20%" as={RouterLink} to='/channels'>
            <AiOutlineDoubleLeft />
          </Link>
          <Heading width="60%" textAlign="center" fontSize="20px">Only Ally can upload a film</Heading>
          <Box width="20%" align="right">
            {(userInfo && userInfo.isAlly && userInfo._id === channel.ally._id) || (userInfo.isItanimulli) ? (
            <Flex align="right" justify="space-between">
              <Button
                fontSize="50%"
                onClick={() => props.history.push(`/channel/${channelId}/edit`)}
                >Edit Channel
              </Button>
            </Flex>
            ) : (
              <Text>More...</Text>
            )}
          </Box>
        </HStack>
        <hr />
        <HStack shadow="card">
          <Box width="30%">
            <img 
              src={channel.image}
              alt={channel.name}
            />
          </Box>
          <Box width="70%" p="10px">
            <Heading fontSize="">{channel.name} <Text fontSize="15px">({channel.category})</Text></Heading>
            <Text fontSize="70%">Owned by: <strong>{channel.ally.ally.name}</strong></Text>
            <Text fontSize="70%">Office Location: <strong>{channel.location}</strong></Text>
            {loadingChannelGameDetails ? (
              <LoadingBox></LoadingBox>
            ) : errorChannelGameDetails ? (
              <MessageBox variant="danger">{errorChannelGameDetails}</MessageBox>
            ) : (
              <Stack>
                {channel?.activeGameContract ? (
                  <Text fontSize="70%">{channelGameData.gameType} : 
                    <strong> {channel.activeGameContract}</strong>
                  </Text>
                ) : (
                  <MessageBox variant="danger">No Active Game Contract</MessageBox>
                )}
                {loadingChannelParams ? (
                  <LoadingBox></LoadingBox>
                ) : errorChannelParams ? (
                  <MessageBox variant="danger">{errorChannelParams}</MessageBox>
                ) : (
                  <HStack>
                    <Heading fontSize="90%">Worth : {params.Wdash} RATs</Heading>
                    {params.Wdash >= channel.chWorth && (
                      <AiOutlineArrowUp fontSize="90%" color="green"/>
                    )}
                    {params.Wdash < channel.chWorth && (
                      <AiOutlineArrowDown fontSize="90%" color="red" />
                    )}
                  </HStack>
                )}
              </Stack>
            )}
            <Text fontSize="70%">{channel.description}</Text>
          </Box>
        </HStack>
        <SimpleGrid gap="8" columns={[1, 2]}>
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <Flex shadow="card" p="10px">
              {films.map((film: any) => (
                <Box shadow="card" p="10px" width="50%" height="50%" key={film._id} >
                  <Link as={RouterLink} to={`/film/${film._id}/${film.video.split('https://arweave.net/')[1]}`}>
                    <img
                      src={film.thumbnail}
                      alt={film.title}
                    />
                    <Stack>
                      <Heading fontSize="70%">{film.title}</Heading>
                      {modalActive && (
                        (userInfo && userInfo.isAlly && userInfo._id === film.uploader) || (userInfo && userInfo.isItanimulli) ? (
                          <AiOutlineDelete onClick={() => deleteFilmHandler(film)} />
                        ) : (
                          <Text fontSize="70%">Please Signin</Text>
                        )
                      )}
                    </Stack>
                    <Text fontSize="70%">{film.uploaderName || film.uploader}</Text>
                    <Text fontSize="70%">{film.views} views</Text>
                  </Link>
                </Box>
              ))}
            </Flex>
          )}
          <Box shadow="card" >
            <Stack shadow="card" p="10px">
              <Flex justify="space-between">
                <Box width="15%">
                  <img 
                    src={channel.image} 
                    alt={channel.name}
                    />
                </Box>
                <Box>
                  <Heading fontSize="20%">{channel.name} Screen</Heading>
                  <Text fontSize="">Created on : {channel._id}</Text>
              
                </Box>
              </Flex>
              <hr />
              <Flex justify="space-between">
                {(userInfo.isAlly && userInfo._id === channel?.ally._id) || (userInfo.isItanimulli) ? (
                  <Heading fontSize="50%">{channel.likedBy.length} Likes {channel.flaggedBy.length} Flags {channel.subscribers.length} Subscribers</Heading>
                ) : (
                  <HStack>
                    {userInfo && channel.likedBy.includes(userInfo._id) ? (
                      <HStack>
                        <Text fontSize="50%"> {channel.likedBy.length} </Text>
                        <AiFillDislike color="red" onClick={() => channelUnlikeHandler(channel._id)} aria-hidden="true" />
                      </HStack>
                    ) : (
                      <HStack>
                        <Text fontSize="50%"> {channel.likedBy.length} </Text>
                        <AiFillLike color="green" onClick={() => channelLikeHandler(channel._id)} aria-hidden="true" />
                      </HStack>
                    )}
                    {userInfo && !channel.flaggedBy.includes(userInfo._id) && (
                      <HStack>
                        <Text fontSize="50%"> {channel.flaggedBy.length} </Text>
                        <AiFillFlag color="red" onClick={() => channelFlagHandler(channel._id)} aria-hidden="true" />
                      </HStack>
                    )}
                    {userInfo && channel.subscribers.includes(userInfo._id) ? (
                      <HStack>
                        <Text fontSize="50%"> {channel.subscribers.length} </Text>
                        <BiToggleLeft onClick={() => channelUnsubscribeHandler(channel._id)} aria-hidden="true" />
                      </HStack>
                    ) : (
                      <HStack>
                        <Text fontSize="50%"> {channel.subscribers.length} </Text>
                        <BiToggleRight onClick={() => channelSubscribeHandler(channel._id)} aria-hidden="true" />
                      </HStack>
                    )}
                  </HStack>
                )}
              </Flex>
              <hr />
              <Rating rating={channel.rating} numReviews={channel.numReviews}></Rating>
            </Stack>
            <hr />
            <Stack shadow="card" p="10px">
              <Flex justify="space-between">
                <Box width="15%">
                  <img 
                    src={channel.ally.ally.logo} 
                    alt={channel.ally.ally.name}
                  />
                </Box>
                <Box as={RouterLink} to={`/ally/${channel.ally._id}`}>
                  <Heading fontSize="50%">{channel.ally.ally.name}</Heading>
                  <Text fontSize="">{channel.ally._id}</Text>
                </Box>
              </Flex>
              <hr />
              <Text fontSize="50%">"{channel.ally.ally.description}"</Text>
              <Rating rating={channel.ally.ally.rating} numReviews={channel.ally.ally.numReviews}></Rating>
            </Stack>
            <hr />
            <Heading fontSize="70%">Write a review for this screen</Heading>
            {userInfo ? (
              <Box shadow="card" p="10px">
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
                  <Text fontSize="50%"><strong>{channel.numReviews}</strong> Reviews</Text>
                  <Text fontSize="50%">Average Ratings<strong>{channel.rating}</strong></Text>
                </Flex>
                <hr />
                <Flex justify="space-between">
                  <Rating rating={channel.rating} numReviews={channel.numReviews}></Rating>
                  <FormControl id="rating">
                    <Stack direction="row" align="center">
                      <select
                        title="rating"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
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
                <Button width="100%" fontSize="" type="submit" onSubmit={submitHandlerReview}>Submit</Button>
                {loadingReviewCreate && <LoadingBox></LoadingBox>}
                {errorReviewCreate && <MessageBox variant="danger">{errorReviewCreate}</MessageBox>}
              </Box>
            ) : (
              <MessageBox>
                Please <Link to="/signin">Sign In</Link> to write a review
              </MessageBox>
            )}
          </Box>
        </SimpleGrid>
        <hr />
        <Stack>
          <Heading fontSize="70%">Channel Reviews</Heading>
          {channel.reviews.length === 0 && <MessageBox>There is no review</MessageBox>}
          {channel.reviews.map((review: any) => (
            <Box key={review._id}>
              <HStack>
                <Heading>{review.name}</Heading>
                <Rating rating={review.rating} caption=" "></Rating>
              </HStack>
              <Text>{review.createdAt.substring(0, 10)}</Text>
              <hr />
              <Text>{review.comment}</Text>
            </Box>
          ))}
        </Stack>
      </Stack>
      )}

    </Flex>
  );
}
