import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { TextField } from '@material-ui/core';

import { Box, FormControl, Input, Heading, Link, Flex, Stack, HStack, SimpleGrid, VStack, Text, Button, IconButton } from "@chakra-ui/react";
import MapboxMap from "../../components/helpers/MapBoxMap";

import LoadingBox from '../../components/helpers/LoadingBox';
import MessageBox from '../../components/helpers/MessageBox';
import Rating from '../../components/helpers/Rating';
import { getShopParams, createReview, deleteShopItem, getShopPinDetails, detailsShop, likeShop, shopItemsList, unlikeShop, flagShop } from '../../Actions/shopActions';
import {getWalletDetails} from '../../Actions/walletActions';
import { SHOP_REVIEW_CREATE_RESET } from '../../Constants/shopConstants';
import { getShopGameDetails } from '../../Actions/gameActions';
import { listUsers } from '../../Actions/userActions';

import {AiOutlineDoubleLeft, AiOutlineArrowUp, AiOutlineArrowDown, AiOutlineDelete, AiFillDislike, AiFillLike, AiFillFlag, AiOutlineEdit, AiOutlineUpload } from 'react-icons/ai'
import {BsGear} from 'react-icons/bs'
import {HiOutlineRefresh} from 'react-icons/hi';
import {BiToggleLeft, BiToggleRight} from 'react-icons/bi';


export function ShopDetails(props: any) {

  const shopId = props.match.params.id;
  console.log("shopId", shopId);

  const [mapProps, setMapProps] = useState<any>({lat: 25.26 , lng: 82.98, zoom: 18})
  const [modalActive, setModalActive] = useState<any>(false);

  const [dateHere, setDateHere] = useState<any>(new Date());

  const shopItems = useSelector((state: any) => state.shopItems);
  const { items, loading, error } = shopItems;

  const shopDetails = useSelector((state: any) => state.shopDetails);
  const {
    loading: loadingShop,
    error: errorShop,
    shop
  } = shopDetails;

  const userSignin = useSelector((state: any) => state.userSignin);
  const { userInfo } = userSignin;

  const userList = useSelector((state: any) => state.userList);
  const { loading: loadingUsers, error: errorUsers, users } = userList;

  const shopReviewCreate = useSelector((state: any) => state.shopReviewCreate);
  const {
    loading: loadingReviewCreate,
    error: errorReviewCreate,
    success: successReviewCreate,
  } = shopReviewCreate;

  const shopLike = useSelector((state: any) => state.shopLike);
  const {
    success: successLikeShop,
  } = shopLike;

  const shopUnlike = useSelector((state: any) => state.shopUnlike);
  const {
    success: successUnlikeShop,
  } = shopUnlike;

  const shopFlag = useSelector((state: any) => state.shopFlag);
  const {
    success: successFlagShop,
  } = shopFlag;

  const itemDelete = useSelector((state: any) => state.itemDelete);
  const {
    success: successDelete,
  } = itemDelete;

  const walletDetails = useSelector((state: any) => state.walletDetails);
  const {
    loading: loadingWallet,
    error: errorWallet,
    wallet
  } = walletDetails;

  const shopGameDetails = useSelector((state: any) => state.shopGameDetails);
  const {
    loading: loadingShopGameDetails,
    error: errorShopGameDetails,
    shopGameData
  } = shopGameDetails;

  const shopPinDetails = useSelector((state: any) => state.shopPinDetails);
  const {
    loading: loadingShopPinDetails,
    error: errorShopPinDetails,
    shopPin
  } = shopPinDetails;


  const allPleasList = useSelector((state: any) => state.allPleasList);
  const { 
    allPleas, 
    loading: loadingAllPleas, 
    error: errorAllPleas 
  } = allPleasList;

  const shopParams = useSelector((state: any) => state.shopParams);
  const { 
    loading: loadingShopParams,
    error: errorShopParams,
    params  
  } = shopParams;

  const shopItemUpload = useSelector((state: any) => state.shopItemUpload);
  const {
    loading: loadingItemSave,
    success: successItemSave,
    error: errorItemSave,
    uploadedItem: uploadedItem
  } = shopItemUpload;

  const [rating, setRating] = useState<any>(0);
  const [comment, setComment] = useState<any>('');

  function checkIfImage(url: any, cb: any) {
    const img = new Image();
    img.src = url;
    img.onload = async function() {};
    console.log(img.src, img.complete )
    cb = img.complete
    return cb;
  }


  function shopLikeHandler(shopId: any) {
    if (userInfo && wallet) {
      window.alert('On liking this shop, you will be tipping the shop brand from your default wallet. This will return as an incentive reward later...');
      dispatch(likeShop({shopId, interaction: "like"}));
    } else {
      window.alert('Please sign in to like shop');
    }
  }

  function shopUnlikeHandler(shopId: any) {
    if (userInfo && wallet) {
      window.alert('You have already tipped the shop brand, unliking will not refund your tip, and you may not be able to get incentivized with game raward');
      dispatch(unlikeShop(shopId));
    } else {
      window.alert('Please sign in to unlike shop');
    }
  }

  function shopFlagHandler(shopId: any) {
    if(userInfo && wallet) {
      window.alert('On Flagging this shop, you are reporting the admin for an inspection by tipping the admin from your default wallet. This will return as an incentive reward later...');
      dispatch(flagShop({shopId, interaction: "flag"}));
    } else {
      window.alert('Please sign in to flag shop');
    }
  }

  function shopSubscribeHandler(shopId: any) {
    if (userInfo && wallet) {
      window.alert('On Subscribing this shop, you are tipping the brand from your default wallet. This will return as stored as a stoke for your withdrawal reward later...');
      setDateHere(new Date());
      // dispatch(subscribeShop({shopId, dateHere, interaction: "subscribe"}));
    } else {
      window.alert('Please sign in to subscribe shop');
    }
  }

  function shopUnsubscribeHandler(shopId: any) {
    if (userInfo && wallet) {
      window.alert('On Unsubscribing this shop, you are withdrawing the amount you paid to the brand of the shop while subscribing...');
      // dispatch(unsubscribeShop({shopId, interaction: "unsubscribe"}));
    } else {
      window.alert('Please sign in to unsubscribe shop');
    }
  }

  const dispatch = useDispatch();

  useEffect(() => {
    if (successReviewCreate) {
      window.alert('Review submitted successfully');
      setRating('');
      setComment('');
      dispatch({
        type: SHOP_REVIEW_CREATE_RESET
      })
    }
    if(successLikeShop) {
      window.alert('You liked this shop');
    }
    if(successUnlikeShop) {
      window.alert('You unliked this shop');
    }
    if(successFlagShop) {
      window.alert('You flagged this shop');
    }
    if(successDelete) {
      window.alert('You just deleted a shop campaign');
    }

    if(successItemSave) {
      window.alert('You just uploaded a item');
      props.history.push(`/editCampaign/${uploadedItem._id}/${shopId}`)
    }

    dispatch(getWalletDetails(userInfo.defaultWallet));
    dispatch(detailsShop(shopId));
    dispatch(shopItemsList(shopId));
    dispatch(getShopGameDetails(shopId));
    dispatch(getShopPinDetails(shopId));
    dispatch(listUsers())
    dispatch(getShopParams(shopId))

  }, [
    dispatch, 
    successDelete, 
    userInfo, 
    shopId, 
    successReviewCreate,
    successLikeShop,
    successUnlikeShop,
    successFlagShop,
    successItemSave
  ]);

  const [viewport, setViewport] = useState({
    width: "32vw",
    height: "31vh",
    latitude: 25.26,
    longitude: 82.98,
    zoom: 6
  });


  const allyPleaHandler = () => {
    if (shop.pleas.includes(userInfo._id)) {
      window.alert('you already applied for plea, contact brand for more info');
    }
    window.alert('Apply for ally plea');
    // dispatch(applyShopAllyPlea(shopId));
  };

  const submitHandlerReview = (e: any) => {
    e.preventDefault();
    if (comment && rating) {
      dispatch(
        createReview(shopId, { rating, comment, name: userInfo.name })
      );
    } else {
      alert('Please enter comment and rating');
    }
  };



  const deleteItemHandler = (item: any) => {
    if (window.confirm('Are you sure to delete?')) {
      dispatch(deleteShopItem(item._id));
    }
    props.history.push(`/shop/${shopId}`);
  };



  return (
    <Flex>
      {loadingShop ? (
        <LoadingBox></LoadingBox>
      ) : errorShop ? (
        <MessageBox variant="danger">{errorShop}</MessageBox>
      ) : (
        <Stack>
          <HStack align="center" justify="space-between" py="10px">
            <Link width="20%" to='/shops'>
              <AiOutlineDoubleLeft />
            </Link>
            <Heading textAlign="center" fontSize="20px" width="60%">Only Brand can upload an item</Heading>
            <Box width="20%" align="right">
              {(userInfo && userInfo.isBrand && userInfo._id === shop.brand._id) || (userInfo.isItanimulli) ? (
                <Flex>
                  <Button
                    onClick={() => props.history.push(`/shop/${shopId}/edit`)}
                    >Edit Shop
                  </Button>
                </Flex>
              ) : (
                null
              )}
            </Box>
          </HStack>
          <hr />
          <HStack shadow="card">
            <img 
              width="30%"
              src={shop.image}
              alt={shop.name}
            />
            <Box width="70%">
              <Heading fontSize="90%">{shop.name} <Text fontSize="">({shop.category})</Text></Heading>
              <Text fontSize="">Owned by: <strong>{shop.brand.brand.name}</strong></Text>
              <Text fontSize="">Located in: <strong>{shop.address}</strong></Text>
              {loadingShopGameDetails ? (
                <LoadingBox></LoadingBox>
              ) : errorShopGameDetails ? (
                <MessageBox variant="danger">{errorShopGameDetails}</MessageBox>
              ) : (
                <Stack>
                  <Text fontSize="">{shopGameData?.gameType} : 
                    <strong>{shop?.activeGameContract}</strong>
                  </Text>
                  {loadingShopParams ? (
                    <LoadingBox></LoadingBox>
                  ) : errorShopParams ? (
                    <MessageBox variant="danger">{errorShopParams}</MessageBox>
                  ) : (
                    <HStack>
                      <Heading fontSize="">Worth : {params.Wdash} RATs</Heading>
                      {params.Wdash > shop.scWorth && (
                        <AiOutlineArrowUp fontSize="90%" color="green"/>
                      )}
                      {params.Wdash < shop.scWorth && (
                        <AiOutlineArrowDown fontSize="90%" color="red"/>
                      )}
                      <Heading fontSize="">RPS : {params.Rdash} RATs</Heading>
                      {params.Rdash > shop.rentPerSlot && (
                        <AiOutlineArrowUp fontSize="90%" color="green"/>
                      )}
                      {params.Rdash < shop.rentPerSlot && (
                        <AiOutlineArrowDown fontSize="90%" color="red"/>
                      )}
                    </HStack>
                  )}
                </Stack>
              )}
              <Text fontSize="">{shop.description}</Text>
            </Box>
          </HStack>
          <SimpleGrid gap="8" columns={[1, 2]}>
            {loading ? (
              <LoadingBox></LoadingBox>
            ) : error ? (
              <MessageBox variant="danger">{error}</MessageBox>
            ) : (
              <Flex shadow="card" p="10px" >
                {items.map((item: any) => (
                  <Box shadow="card" width="50%" height="30%" key={item._id} >
                    <Link as={RouterLink} to={`/item/${item._id}/${item.video.split('https://arweave.net/')[1]}`}>
                      <img 
                        src={item.thumbnail}
                        alt={item.title}
                      />
                    </Link>
                    <Stack>
                      <Heading fontSize="">{item.title}</Heading>
                      {modalActive && (
                        userInfo && userInfo.isItanimulli ? (
                          <HStack>
                            <BsGear onClick={() => window.open(`/editCampaign/${item._id}/${shopId}`)} />
                            <AiOutlineDelete onClick={() => deleteItemHandler(item)} />
                          </HStack>
                        ) : userInfo && userInfo.isMaster && userInfo._id === shop.brand._id ? (
                          <HStack>
                            <BsGear onClick={() => window.open(`/editCampaign/${item._id}/${shopId}`)} />
                            <AiOutlineDelete onClick={() => deleteItemHandler(item)} />
                          </HStack>
                        ) : userInfo && item.uploader === userInfo._id? (
                          <HStack>
                            <BsGear onClick={() => window.open(`/editCampaign/${item._id}/${shopId}`)} /><span />
                            <AiOutlineEdit onClick={allyPleaHandler} />
                          </HStack>
                        ) : (
                          null
                        )
                      )}
                      <HStack>
                        <Text fontSize="70%">{item.uploaderName || item.uploader}</Text>
                        <Text fontSize="70%">{item.views} views</Text>
                      </HStack>
                    </Stack>
                  </Box>
                ))}
              </Flex>
            )}
            <Stack>
              <HStack justify="space-between" shadow="card" p="10px">
                {(userInfo.isMaster && userInfo._id === shop.brand._id) || (userInfo.isAlly && shop.allies.map((ally: any) => ally === userInfo._id).length > 0) || (userInfo.isItanimulli) ? (
                  <HStack>
                    <i className="fa fa-edit" onClick={() => setModalActive(!modalActive)}></i><span />
                    {/* <i className="fa fa-upload" onClick={() => props.history.push(`/createCampaign/${shopId}`)}></i><span /> */}
                    {loadingItemSave ? (
                      <LoadingBox></LoadingBox>
                    ) : errorItemSave ? (
                      <MessageBox variant="danger">{errorItemSave}</MessageBox>
                    ) : (
                      <AiOutlineUpload />
                    )}
                  </HStack>
                ) : (userInfo && shop.allies.map((ally: any) => ally === userInfo._id)) ? (
                  <Box>
                  </Box>
                ) : (
                  <Text fontSize="">Please Signin</Text>
                )}
              </HStack>
              <hr />
              <VStack shadow="card" p="10px">
                <Heading fontSize="70%">
                  Last played
                </Heading>
                <Heading fontSize="70%">
                  Currentlyy playing
                </Heading>
                <Heading fontSize="70%">
                  Playing Next
                </Heading>
              </VStack>
              <hr />
              <HStack> 
                {shop.category !== "WEB_SHOP" && (
                  <Box shadow="card" p="10px" to="/mapbox">
                    {loadingShopPinDetails ? (
                      <LoadingBox></LoadingBox>
                    ) : errorShopPinDetails ? (
                      <MessageBox variant="danger">{errorShopPinDetails}</MessageBox>
                    ) : (
                      <MapboxMap props={mapProps} />
                    )}
                  </Box>
                )}
              </HStack>
            </Stack>
          </SimpleGrid>
          <hr />
          <SimpleGrid gap="4" columns={[1, 3]}>
            <Box shadow="card" p="10px">
              <Flex justify="space-between">
                <Box width="15%">
                  <img src={shop.image} alt={shop.name} />
                </Box>
                <Box>
                  <Heading fontSize="70%">{shop.name} Shop</Heading>
                  <Text fontSize="70%">{shop._id}</Text>
                </Box>
              </Flex>
              <hr />
              <Flex justify="space-between" p="10px">
                {(userInfo.isMaster && userInfo._id === shop.brand._id) || (userInfo.isItanimulli) ? (
                  <Heading fontSize="50%">{shop.likedBy.length} Likes {shop.flaggedBy.length} Flags</Heading>
                ) : (
                  <SimpleGrid gap="8" columns={[1, 2, 3]}>
                    {userInfo && shop.likedBy.includes(userInfo._id) ? (
                      <HStack>
                        <Text fontSize="50%">{shop.likedBy.length}</ Text>
                        <AiFillDislike color="red" onClick={() => shopUnlikeHandler(shop._id)} aria-hidden="true" />
                      </HStack>
                    ) : (
                      <HStack>
                        <Text fontSize="50%">{shop.likedBy.length}</ Text>
                        <AiFillLike color="green" onClick={() => shopLikeHandler(shop._id)} aria-hidden="true" />
                      </HStack>
                    )}
                    {userInfo && !shop.flaggedBy.includes(userInfo._id) && (
                      <HStack>
                        <Text fontSize="50%">{shop.flaggedBy.length}</ Text>
                        <AiFillFlag color="red" onClick={() => shopFlagHandler(shop._id)} aria-hidden="true" />
                      </HStack>
                    )}
                    {userInfo && shop.subscribers.includes(userInfo._id) ? (
                      <HStack>
                        <Text fontSize="50%">{shop.subscribers.length}</ Text>
                        <BiToggleLeft onClick={() => shopUnsubscribeHandler(shop._id)} aria-hidden="true" />
                      </HStack>
                    ) : (
                      <HStack>
                        <Text fontSize="50%">{shop.subscribers.length}</ Text>
                        <BiToggleRight onClick={() => shopSubscribeHandler(shop._id)} aria-hidden="true" />
                      </HStack>
                    )}
                  </SimpleGrid>
                )}
              </Flex>
              {loadingShopParams ? (
                <LoadingBox></LoadingBox> 
              ) : errorShopParams ? (
                <MessageBox variant="danger">{errorShopParams}</MessageBox>
              ) : (
                <Box>
                  <Flex justify="space-between" shadow="card" p="10px">
                    <Text fontSize="70%">Shop Worth: <strong>{shop.scWorth}</strong> RATs</Text>
                    <Text fontSize="70%">Live Worth: <strong> {params.Wdash}</strong> RATs</Text>
                    {params.Wdash > shop.scWorth && <AiOutlineArrowUp color="green"/>}
                    {params.Wdash < shop.scWorth && <AiOutlineArrowDown color="red"/>}
                  </Flex>
                  <Flex justify="space-between" shadow="card" p="10px">
                    <Text fontSize="70%">Rent Per Slot(rps): <strong>{shop.rentPerSlot}</strong> RATs</Text>
                    <Text fontSize="70%">Live Rent Per Slot(rps): <strong>{params.Rdash}</strong> RATs</Text>
                    {params.Rdash > shop.rentPerSlot && <AiOutlineArrowUp color="green"/>}
                    {params.Rdash < shop.rentPerSlot && <AiOutlineArrowDown color="red" />}
                  </Flex>
                </Box>
              )}
              <hr />
              <Box>
                <Text fontSize="70%">"{shop.description}"</Text>
                <Rating rating={shop.rating} numReviews={shop.numReviews}></Rating>
              </Box>
            </Box>
            <Box shadow="card" p="10px">
              <Flex justify="space-between">
                <Box width="15%">
                  <img src={shop.brand.brand.logo} alt={shop.brand.brand.name} />
                </Box>
                <Box>
                  <Heading fontSize="70%">{shop.brand.brand.name}</Heading>
                  <Text fontSize="70%" as={RouterLink} to={`/brand/${shop.brand._id}`}>{shop.brand._id}</Text>
                </Box>
              </Flex>
              <hr />
              {loadingWallet ? (
                <LoadingBox></LoadingBox>
              ) : errorWallet ? (
                <MessageBox variant="danger">{errorWallet}</MessageBox>
              ) : (
                <Heading fontSize="70%">Wallet: {wallet.walletAddAr}</Heading>
              )}
              <hr />
              <Text fontSize="">"{shop.brand.brand.description}"</Text>
              <Rating rating={shop.brand.brand.rating} numReviews={shop.brand.brand.numReviews}></Rating>
              <hr />
              <Heading fontSize="" >Active Items List</Heading>
              {loadingUsers ? (
                <LoadingBox></LoadingBox>
              ) : errorUsers ? (
                <MessageBox variant="danger">{errorUsers}</MessageBox>
              ) : (
                <Stack>
                  {/* {shop.allies.map((ally) => (
                    <p key={ally}>
                      {users.filter((user) => user._id === ally).map((user) => (
                        <Link key={user._id} to={`/ally/${user._id}`}>
                          {user.name}
                        </Link>
                      ))}
                    </p>
                  ))} */}
                </Stack>
              )}
              <hr />
              <Heading fontSize="">Active consumables items here</Heading>
            </Box>
            <Box shadow="card" p="10px">
              <Heading fontSize="">Write a review for this shop</Heading>
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
                    <Text fontSize=""><strong>{shop.numReviews}</strong> Reviews</Text>
                    <Text fontSize="">Average Ratings : <strong> {shop.rating}</strong></Text>
                  </Flex>
                  <hr />
                  <Flex justify="space-between">
                    <Rating rating={shop.rating} numReviews={shop.numReviews}></Rating>
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
                  <Button width="100%" type="submit" onSubmit={submitHandlerReview}>Submit</Button>
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
            <Heading fontSize="">Shop Reviews</Heading>
            {shop.reviews.length === 0 && (
              <MessageBox>There is no review</MessageBox>
            )}
            {shop.reviews.map((review: any) => (
              <Box shadow="card" key={review._id}>
                <Heading fontSize="">{review.name}</Heading>
                <Rating rating={review.rating} caption=" "></Rating>
                <Text fontSize="">{review.createdAt.substring(0, 10)}</Text>
                <Text fontSize="">{review.comment}</Text>
              </Box>
            ))}
          </Stack>
          <hr />
        </Stack>
      )}
    </Flex>
  );
}
