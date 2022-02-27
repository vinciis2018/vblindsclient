import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Select, Input, Heading, FormLabel, FormControl, Link, Flex, Stack, HStack, SimpleGrid, VStack, Text, Button, IconButton } from "@chakra-ui/react";

import LoadingBox from '../../components/helpers/LoadingBox';
import MessageBox from '../../components/helpers/MessageBox';
import Rating from '../../components/helpers/Rating';
import { detailsScreen } from '../../Actions/screenActions';
import { getAssetParams, createReview, detailsAsset, createAssetScreen, likeAsset, flagAsset, assetScreensList, unlikeAsset} from '../../Actions/assetActions';
import {getWalletDetails} from '../../Actions/walletActions';
import { getAssetGameDetails } from '../../Actions/gameActions';
import { ASSET_REVIEW_CREATE_RESET, ASSET_SCREEN_CREATE_RESET } from '../../Constants/assetConstants';

import {AiOutlineDoubleLeft, AiOutlineArrowUp, AiOutlineArrowDown, AiFillDislike, AiFillLike, AiFillFlag} from 'react-icons/ai'
import {BsGear} from 'react-icons/bs'

export function AssetDetails(props: any) {

  const assetId = props.match.params.id;
  console.log("assetId", assetId);

  const [modalVisible, setModalVisible] = useState<any>(false);

  const dispatch = useDispatch();
  const userSignin = useSelector((state: any) => state.userSignin);
  const { userInfo } = userSignin;

  const assetDetails = useSelector((state: any) => state.assetDetails);
  const {
    loading: loadingAsset,
    error: errorAsset,
    asset
  } = assetDetails;


  const assetReviewCreate = useSelector((state: any) => state.assetReviewCreate);
  const {
    loading: loadingReviewCreate,
    error: errorReviewCreate,
    success: successReviewCreate,
  } = assetReviewCreate;

  // const walletDetails = useSelector(state => state.walletDetails);
  // const {
  //   loading: loadingWallet,
  //   error: errorWallet,
  //   wallet
  // } = walletDetails;

  const assetScreens = useSelector((state: any) => state.assetScreens);
  const { 
    loading: loadingAssetScreens, 
    error: errorAssetScreens,
    screens
  } = assetScreens;

  const assetScreenCreate = useSelector((state: any) => state.assetScreenCreate);
  const {
    loading: loadingCreateAssetScreen,
    error: errorCreateAssetScreen,
    success: successCreateAssetScreen,
    screen: createdAssetScreen
  } = assetScreenCreate;

  const assetGameDetails = useSelector((state: any) => state.assetGameDetails);
  const {
    loading: loadingAssetGameDetails,
    error: errorAssetGameDetails,
    assetGameData
  } = assetGameDetails;

  const assetParams = useSelector((state: any) => state.assetParams);
  const { 
    loading: loadingAssetParams,
    error: errorAssetParams,
    params  
  } = assetParams;

  const walletDetails = useSelector((state: any) => state.walletDetails);
  const {
    loading: loadingWallet,
    error: errorWallet,
    wallet
  } = walletDetails;

  const [rating, setRating] = useState<any>(0);
  const [comment, setComment] = useState<any>('');

  function assetLikeHandler(assetId: any) {
    window.alert('On liking this asset, you will be tipping the asset master from your default wallet. This may be returned as an incentive reward later...');
    if (userInfo) {
      let interaction = "like";
      dispatch(likeAsset(assetId, interaction));
    } else {
      window.alert('Please sign in to like asset');
    }
  }

  function assetUnlikeHandler(assetId: any) {
    window.alert('You have already tipped the asset master, unliking will not refund your tip, and you may not be able to get incentivized with game raward');
    if (userInfo) {
      dispatch(unlikeAsset(assetId));
    } else {
      window.alert('Please sign in to unlike asset');
    }
  }

  function assetFlagHandler(assetId: any) {
    window.alert('On Flagging this asset, you are reporting the admin for an inspection by tipping the admin from your default wallet. This may be returned as an incentive reward later...');
    if(userInfo) {
      let interaction = "flag";
      dispatch(flagAsset(assetId, interaction));
    } else {
      window.alert('Please sign in to flag asset');
    }
  }
  useEffect(() => {

    if (successCreateAssetScreen) {
      window.alert('Asset Screen Creation Done')
      dispatch({ type: ASSET_SCREEN_CREATE_RESET });
      props.history.push(`/screen/${createdAssetScreen._id}/edit`)
    }

    if (successReviewCreate) {
      window.alert('Review submitted successfully');
      setRating('');
      setComment('');
      dispatch({
        type: ASSET_REVIEW_CREATE_RESET
      })
    }


    dispatch(getWalletDetails(userInfo.defaultWallet))
    dispatch(detailsAsset(assetId));
    dispatch(assetScreensList(assetId));
    dispatch(getAssetGameDetails(assetId));
    dispatch(getAssetParams(assetId))

  }, [
    dispatch, 
    userInfo, 
    assetId, 
    successReviewCreate,
    successCreateAssetScreen,
    props.history,
    createdAssetScreen
  ]);

  const createAssetScreenHandler = (e: any) => {
    e.preventDefault();
    window.alert('Are you sure ?')
    dispatch(createAssetScreen(assetId));
  };


  const submitHandlerReview = (e: any) => {
    e.preventDefault();
    window.alert('Are you sure ?')
    if (comment && rating) {
      dispatch(
        createReview(assetId, { rating, comment, name: userInfo.name })
      );
    } else {
      alert('Please enter comment and rating');
    }
  };

  const openModalVisibleHandler = (screen: any) => {
    setModalVisible(true);
    dispatch(detailsScreen(screen._id));

  }




  return (
    <Flex>
      {loadingAsset ? (
        <LoadingBox />
      ) : errorAsset ? (
        <MessageBox variant="danger">{errorAsset}</MessageBox>
      ) : (
      <Stack >
        <HStack align="center" justify="space-between" py="10px">
          <Link width="20%" as={RouterLink} to={'/assets'}>
            <AiOutlineDoubleLeft />
          </Link>
          <Heading width="60%" textAlign="center" fontSize="">Only Allies and Master can upload an advert</Heading>
          <Box width="20%" align="right" >
            {(userInfo && userInfo.isMaster && userInfo._id === asset.master._id) || (userInfo.isItanimulli) ? (
            <Flex align="right" justify="space-between">
              <Button fontSize="50%" onClick={() => props.history.push(`/asset/${assetId}/edit`)}>
                Edit Asset
              </Button>
              {loadingCreateAssetScreen ? ( 
                <LoadingBox></LoadingBox>
              ) : errorCreateAssetScreen ? (
                <MessageBox variant="danger">{errorCreateAssetScreen}</MessageBox>
              ) : (
                <Button fontSize="50%" onClick={() => createAssetScreenHandler(assetId)}>
                  Add Screen
                </Button>
              )}
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
              src={asset.image}
              alt={asset.name}
            />
          </Box>
          <Box width="70%" p="10px">
            <Heading fontSize="">{asset.name} <Text fontSize="">({asset.category})</Text></Heading>
            <Text fontSize="70%">Owned by: <strong>{asset.master.master.name}</strong></Text>
            <Text fontSize="70%">Office Location: <strong>{asset.address}</strong></Text>
            {loadingAssetGameDetails ? (
              <LoadingBox></LoadingBox>
            ) : errorAssetGameDetails ? (
              <MessageBox variant="danger">{errorAssetGameDetails}</MessageBox>
            ) : (
              <Stack>
                {asset.activeGameContract ? (
                <Text fontSize="70%">{assetGameData.gameType} : 
                  <strong> {asset.activeGameContract}</strong>
                </Text>
                ) : (
                  <MessageBox variant="danger">No Active Game Contract</MessageBox>
                )}
                {loadingAssetParams ? (
                  <LoadingBox></LoadingBox>
                ) : errorAssetParams ? (
                  <MessageBox variant="danger">{errorAssetParams}</MessageBox>
                ) : (
                  <HStack>
                    <Heading fontSize="90%">Worth : {params.Wdash} RATs</Heading>
                    {params.Wdash >= asset.assetWorth && (
                      <AiOutlineArrowUp fontSize="90%" color="green"/>
                    )}
                    {params.Wdash < asset.assetWorth && (
                      <AiOutlineArrowDown fontSize="90%" color="red" />
                    )}
                  </HStack>
                )}
              </Stack>
            )} 
            <Text fontSize="70%">{asset.description}</Text>
          </Box>
        </HStack>
        <SimpleGrid gap="8" columns={[1, 2]}>
          {loadingAssetScreens ? (
            <LoadingBox></LoadingBox>
          ) : errorAssetScreens ? (
            <MessageBox variant="danger">{errorAssetScreens}</MessageBox>
          ) : (
            <Flex shadow="card" p="10px">
              {screens.map((screen: any) => (screen.category === "WEB_SCREEN") && (
                <Box shadow="card" p="10px" width="50%" key={screen._id} >
                  <Link as={RouterLink} to={`/screen/${screen._id}`}>
                    <img
                      src={screen.image}
                      alt={screen.name}
                    />
                    <Stack>
                      <Heading fontSize="70%">{screen.name}</Heading>
                      {modalVisible && (
                        userInfo && userInfo.isItanimulli ? (
                          <BsGear fontSize="" onClick={() => openModalVisibleHandler(screen)} />
                        ) : userInfo && userInfo.isMaster && userInfo._id === asset.master._id ? (
                          <BsGear fontSize="" onClick={() => openModalVisibleHandler(screen)} />
                        ) : (
                          <Text fontSize="70%">Please Signin</Text>
                        )
                        
                      )}
                      <Text fontSize="70%">{screen._id}</Text>
                    </Stack>
                  </Link>
                </Box>
              ))}
            </Flex>
          )}
          <Flex shadow="card">
            <Box as="iframe" 
              className=" popCard"
              // src={asset.link}
              src={`http://localhost:10004/sample-page/?preview_id=2&preview_nonce=b1d203ad15&preview=true`}
              width="100%"
              height="auto"
              id="viewblock"
              display="initial"
              position="relative">
            </Box>
          </Flex>
        </SimpleGrid>
        <hr />
        <SimpleGrid gap="4" columns={[1, 3]}>
          <Box shadow="card" p="10px">
            <Flex justify="space-between">
              <Box width="15%">
                <img src={asset.image} alt={asset.name} />
              </Box>
              <Box>
                <Heading fontSize="70%">{asset.name} Asset</Heading>
                <Text fontSize="70%">{asset._id}</Text>
              </Box>
            </Flex>
            <hr />
            <Flex justify="space-between" p="10px">
              {(userInfo.isMaster && userInfo._id === asset.master._id) || (userInfo.isItanimulli) ? (
                <Heading fontSize="">{asset.likedBy.length} Likes {asset.flaggedBy.length} Flags</Heading>
              ) : (
                <SimpleGrid gap="8" columns={[1, 2, 3]}>
                  {userInfo && asset.likedBy.includes(userInfo._id) ? (
                    <AiFillDislike color="red" fontSize="" onClick={() => assetUnlikeHandler(asset._id)} aria-hidden="true" ><Text fontSize="12%">{asset.likedBy.length}</Text></AiFillDislike>
                  ) : (
                    <AiFillLike color="green" fontSize="" onClick={() => assetLikeHandler(asset._id)} aria-hidden="true"><Text fontSize="12%">{asset.likedBy.length}<span /></Text></AiFillLike>
                  )}
                  {userInfo && !asset.flaggedBy.includes(userInfo._id) && (
                    <AiFillFlag color="red" fontSize="" onClick={() => assetFlagHandler(asset._id)} aria-hidden="true"><span /><Text fontSize="12%">{asset.flaggedBy.length}<span /></Text></AiFillFlag>
                  )}
                </SimpleGrid>
              )}
            </Flex>
            <hr/>
            <Heading fontSize=""> Asset Worth: {asset.assetWorth} RATs</Heading>
            <hr />
            <Text fontSize="">"{asset.description}"</Text>
            <hr />
            <Rating rating={asset.rating} numReviews={asset.numReviews}></Rating>
          </Box>
          <Box shadow="card" p="10px">
            <Flex justify="space-between">
              <Box width="15%">
                <img 
                  src={asset.master.master.logo} 
                  alt={asset.master.master.name} 
                  />
              </Box>
              <Box as={RouterLink} to={`/master/${asset.master._id}`}>
                <Heading fontSize="70%">{asset.master.master.name}</Heading>
                <Text fontSize="70%">{asset.master._id}</Text>
              </Box>
            </Flex>
            <hr />
            {loadingWallet ? (
                <LoadingBox></LoadingBox>
              ) : errorWallet ? (
                <MessageBox variant="danger">{errorWallet}</MessageBox>
              ) : (
                <Heading fontSize="">Wallet: {wallet.walletAddAr}</Heading>
              )}
            <hr />
            <Text fontSize="">"{asset.master.master.description}"</Text>
            <hr />
            <Rating rating={asset.master.master.rating} numReviews={asset.master.master.numReviews}></Rating>
              {/* <div className="popCard card-body">
                <h4 className="row center" >Allies List</h4>
                <h5>Allies Name and details</h5>
                <hr />
                <div className="row">
                  <h5>Freqeuncies remaining for today</h5>
                </div>
              </div> */}
          </Box>
          <Box shadow="card" p="10px">
            <Heading fontSize="70%">Write a review for this asset</Heading>
            {userInfo ? (
              <Box>
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
                  <Text fontSize=""><strong>{asset.numReviews}</strong> Reviews</Text>
                  <Text fontSize="">Average Ratings: <strong>{asset.rating}</strong></Text>
                </Flex>
                <hr />
                <Flex justify="space-between">
                  <Rating rating={asset.rating} numReviews={asset.numReviews}></Rating>
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
                Please <Link as={RouterLink} to="/signin">Sign In</Link> to write a review
              </MessageBox>
            )}
          </Box>
        </SimpleGrid>
        <hr />
        <Stack>
          <Heading fontSize="70%">Asset Reviews</Heading>
          {asset.reviews.length === 0 && (
            <MessageBox>There is no review</MessageBox>
          )}
          {asset.reviews.map((review: any) => (
            <Box shadow="card" key={review._id}>
              <Heading fontSize="">{review.name}</Heading>
              <Rating rating={review.rating} caption=" "></Rating>
              <Text fontSize="">{review.createdAt.substring(0, 10)}</Text>
              <Text fontSize="">{review.comment}</Text>
            </Box>
          ))}
        </Stack>
      </Stack>
      )}
    </Flex>
  );
}
