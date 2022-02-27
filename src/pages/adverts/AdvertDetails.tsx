import React, { useState, useEffect } from 'react'
import { Link as RouterLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Heading, FormControl, Input, Link, Flex, Stack, SimpleGrid, VStack, Text, Button, IconButton, HStack } from "@chakra-ui/react";

import { getVideoParams, getVideoDetails, likeVideo, reviewVideo, viewVideo, unlikeVideo, listAllVideos } from '../../Actions/videoActions';
import LoadingBox from '../../components/helpers/LoadingBox';
import MessageBox from '../../components/helpers/MessageBox';
import Rating from '../../components/helpers/Rating';
import { REVIEW_VIDEO_RESET } from '../../Constants/videoConstants';
import { signout } from '../../Actions/userActions';
// import { TextField } from '@material-ui/core';
import { useNftData, useNft } from '../../api/hooks/useNft';
import { formatDigitNumber, formatUnixTimestamp } from "../../services/utils/index";
import { NftMediaContainer } from '../../components/common/NftMediaContainer/index';
import {AiOutlineDoubleLeft, AiOutlineArrowUp, AiOutlineArrowDown, AiOutlineDelete, AiFillDislike, AiFillLike, AiFillFlag, AiOutlineEdit, AiOutlineUpload } from 'react-icons/ai'
import {BiToggleLeft, BiToggleRight} from 'react-icons/bi';

export function AdvertDetails(props: any) {
  const videoId = props.match.params.id;
  const txId = props.match.params.txId;
  const {data: nft, isLoading, isError} = useNft({id: txId});
  const {data: nftData } = useNftData({id: txId});
  console.log("nft", {nft})


  const [comment, setComment] = useState<any>('');
  const [rating, setRating] = useState<any>(0);

  const videoDetails = useSelector((state: any) => state.videoDetails);
  const {
    loading: loadingVideo, 
    error: errorVideo,
    video 
  } = videoDetails;

  const userSignin = useSelector((state: any) => state.userSignin);
  const { userInfo } = userSignin;

  const videoListAll = useSelector((state: any) => state.videoListAll);
  const { 
    loading: loadingVideos, 
    error: errorVideos,
    allVideos
  } = videoListAll;  

  const videoLike = useSelector((state: any) => state.videoLike);
  const { 
    loading: likeLoading, 
    error: likeError,
    likeSuccess 
  } = videoLike;

  const videoReview = useSelector((state: any) => state.videoReview);
  const { 
    loading: reviewLoading, 
    error: reviewError, 
    success: reviewSuccess
  } = videoReview;

  const videoParams = useSelector((state: any) => state.videoParams);
  const {
    loading: loadingVideoParams, 
    error: errorVideoParams,
    params
  } = videoParams; 

  function checkIfImage(url: any, cb: any) {
    const img = new Image();
    img.src = url;
    img.onload = async function() {};
    // console.log(img.src, img.complete )
    cb = img.complete
    return cb;
  }


  function viewHandler(videoId: any) {
    console.log('viewing Video');
    if (userInfo) {
      dispatch(viewVideo(videoId));
    } else {
      alert("please sign in to view the video");
    }
  }

  function likeHandler(videoId: any) {
    console.log("like");
    if (userInfo) {
      window.alert('Please signin again to confirm your like and continue...');
      dispatch(likeVideo(videoId));
      dispatch(signout());
    } else {
      alert("please sign in to like the video");
    }
  };

  function unlikeHandler(videoId: any) {
      console.log("like");
    if (userInfo) {
      window.alert('Please signin again to confirm your unlike and continue...');
      dispatch(unlikeVideo(videoId));
      dispatch(signout());
    } else {
        alert("please sign in to unlike the video");
    }
  };



  const dispatch = useDispatch();
  useEffect(() => {

    if (reviewSuccess) {
      window.alert('Review submitted successfully');
      setRating('');
      setComment('');
      dispatch({
          type: REVIEW_VIDEO_RESET
      })
    }
    dispatch(getVideoDetails(videoId));
    dispatch(listAllVideos());
    dispatch(getVideoParams(videoId));

  }, [
    dispatch,
    videoId,
    likeLoading, 
    likeSuccess, 
    likeError, 
    reviewSuccess,
    txId
  ]);

  const reviewHandler = (e: any) => {
    e.preventDefault();
    if (comment && rating) {
      dispatch(
        reviewVideo(videoId, { rating, comment, name: userInfo.name })
      );
    } else {
      alert('Please enter comment and rating');
    }
  };


  return (
    <Flex>
      {loadingVideo ? (
        <LoadingBox></LoadingBox>
      ) : errorVideo ? (
        <MessageBox variant="danger">{errorVideo}</MessageBox>
      ) : (
        <Stack>
          <HStack align="center" justify="space-between">
            <Link as={RouterLink} to={`/screen/${video.screen}`}>
            <AiOutlineDoubleLeft />
            </Link>
            <Button type="submit"fontSize="50%" onClick={() => window.open(`/editCampaign/${video._id}/${video.screen}`)}>
              Edit Video
            </Button>
          </HStack>
          <hr />
          <HStack rounded="md" shadow="card">
            <Box width="30%"> 
              <img 
              src={video.thumbnail}
              alt={video.title}
              />
            </Box>
            <Box width="70%" p="10px">
              <Heading fontSize="xl">{video.title}</Heading>
              <Text fontSize="md">Upload by: {video.uploaderName}</Text>
              <Text fontSize="md">on {new Date(video.createdAt).toDateString()}</Text>
              {loadingVideoParams ? (
                <LoadingBox></LoadingBox>
              ) : errorVideoParams ? (
                <MessageBox variant="danger">{errorVideoParams}</MessageBox>
              ) : (
                <Stack>
                  <Text fontSize="sm">Campaign Details</Text>
                  <Heading fontSize="md">Worth: {params.Wdash} RATs</Heading>
                  {params.Wdash > video.adWorth && (
                    <AiOutlineArrowUp fontSize="md" color="green"/>
                  )}
                  {params.Wdash < video.adWorth && (
                    <AiOutlineArrowDown fontSize="md" color="red" />
                  )}
                  <Heading fontSize="md">Budget: {params.Bdash} RATs</Heading>
                </Stack>
              )}
              <Text fontSize="sm">{video.description}</Text>
            </Box>
          </HStack>
          <hr />
          <SimpleGrid columns={[1, 2]} gap="4">
            <Stack>
              <NftMediaContainer nft={nft} />
            </Stack>
            <Stack>
              <Box rounded="md" shadow="card" p="10px">
                <Heading fontSize="md">Advert Name : {video.title}</Heading>
                <Text fontSize="sm">{video._id}</Text>
                {isLoading ? (
                  <LoadingBox></LoadingBox>
                ) : isError ? (
                  <MessageBox variant="danger">{isError}</MessageBox>
                ) : (
                <Flex justify="space-between">
                  <Text fontSize="md"><strong>{nftData?.count}</strong> Views [{nft?.attention} Unique] </Text>
                  <Text fontSize="md">{formatDigitNumber(nft?.reward)} KOII</Text>
                </Flex>
                )}
                <Flex >
                  {userInfo && userInfo._id === video.uploader ? (
                    <Text fontSize="md">{video.likedBy.length} Likes {video.flaggedBy.length} Flags</Text>
                  ) : userInfo && userInfo.videosLiked.includes(video._id) ? (
                    <HStack>
                      <Text fontSize="md"> {video.likedBy.length} </Text>
                      <AiFillDislike color="red" onClick={() => unlikeHandler(video._id)} aria-hidden="true" />
                    </HStack>
                  ) : userInfo && !userInfo.videosLiked.includes(video._id) ? (
                    <HStack>
                      <Text fontSize="md"> {video.likedBy.length} </Text>
                      <AiFillLike color="green" onClick={() => likeHandler(video._id)} aria-hidden="true" />
                    </HStack>
                  ) : (
                    <Text>Please Signin</Text>
                  )}
                  {userInfo && !video.flaggedBy.includes(userInfo._id) && (
                    <HStack>
                      <Text fontSize="md"> {video.flaggedBy.length} </Text>
                      <AiFillFlag color="red" 
                        // onClick={() => flagHandler(video._id)}
                        aria-hidden="true" />
                    </HStack>
                  )}
                </Flex>
                <hr />
                
                {loadingVideoParams ? (
                  <LoadingBox></LoadingBox>
                ) : errorVideoParams ? (
                  <MessageBox variant="danger">{errorVideoParams}</MessageBox>
                ) : (
                  <Box>
                    <Text fontSize="md">Advert Worth: <strong>{video.adWorth}</strong> RATs</Text>
                    <HStack>
                      <Text fontSize="md">Current Worth: <strong>{params.Wdash}</strong> RATs</Text>
                        {params.Wdash >= video.adWorth && <AiOutlineArrowUp color="green"/>}
                        {params.Wdash <= video.adWorth && <AiOutlineArrowDown color="red"/>}
                    </HStack>
                    <HStack>
                      <Text fontSize="md">Advert Budget: <strong>{video.adBudget}</strong> RATs</Text>
                      <Text fontSize="md">Due Budget: <strong>{params.Bdash}</strong> RATs</Text>
                    </HStack>
                  </Box>
                )}
                <Rating rating={video.rating} numReviews={video.numReviews}></Rating>
                <hr />
                <Heading fontSize="md"> Uploader Name: {video.uploaderName} 
                  <Text fontSize="md">Uploaded on : {new Date(video.createdAt).toLocaleString()}</Text>
                </Heading>
                <Text fontSize="sm">"{video.description}"</Text>
              </Box>
              <hr />
              <Heading fontSize="xl">Write a review for the campaign</Heading>
              {userInfo ? (
                <Box shadow="card" rounded="sm" p="10px">
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
                    <Text fontSize="md">Reviewed By <strong>{video.numReviews}</strong></Text>
                    <Text fontSize="md">Average Ratings <strong>{video.rating}</strong></Text>
                  </Flex>
                  <hr />
                  <Flex justify="space-between">
                    <Rating rating={video.rating} numReviews={video.numReviews}></Rating>

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
                  <Button width="100%" type="submit" onSubmit={reviewHandler}>Submit</Button>
                  {reviewLoading && <LoadingBox></LoadingBox>}
                  {reviewError && <MessageBox variant="danger">{reviewError}</MessageBox>}
                </Box>
              ) : (
              <MessageBox>
                Please <Link to="/signin">Sign In</Link> to write a review
              </MessageBox>
              )}
            </Stack>
          </SimpleGrid>
          <hr/>
          <Stack>
          <Heading fontSize="xl">Advert Reviews</Heading>
          {video.reviews.length === 0 && <MessageBox>There is no review</MessageBox>}
          {video.reviews.map((review: any) => (
            <Box key={review._id}>
              <HStack shadow="card" p="10px" rounded="sm">
                <Heading fontSize="md">{review.name}</Heading>
                <Rating rating={review.rating} caption=" "></Rating>
              </HStack>
              <Text fontSize="md">{review.createdAt.substring(0, 10)}</Text>
              <hr />
              <Text fontSize="md">{review.comment}</Text>
            </Box>
          ))}
          </Stack>
        </Stack>
      )}
    </Flex>
  )
}
