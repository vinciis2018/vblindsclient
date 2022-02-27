import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Heading, FormControl, Select, FormLabel, Input, Center, Link, Flex, Stack, SimpleGrid, VStack, Text, Button, IconButton, HStack } from "@chakra-ui/react";

import TagsInput from '../../components/helpers/TagsInput';
import LoadingBox from '../../components/helpers/LoadingBox';
import MessageBox from '../../components/helpers/MessageBox';
import { detailsChannel, updateChannel } from '../../Actions/channelActions';
import { CHANNEL_UPDATE_RESET } from '../../Constants/channelConstants';
import {getWalletDetails} from '../../Actions/walletActions';
import { createChannelGame, removeChannelGame, getChannelGameDetails } from '../../Actions/gameActions';

import {AiOutlineDoubleLeft, AiOutlineArrowUp, AiOutlineArrowDown, AiOutlineDelete, AiFillDislike, AiFillLike, AiFillFlag, AiOutlineEdit, AiOutlineUpload } from 'react-icons/ai'
import {BiToggleLeft, BiToggleRight} from 'react-icons/bi';


export function ChannelEdit(props: any) {

  const channelId = props.match.params.id;

  const [name, setName] = useState<any>('');
  const [location, setLocation] = useState<any>('');
  const [image, setImage] = useState<any>('');
  const [channelCategory, setChannelCategory] = useState<any>('');
  const [country, setCountry] = useState<any>('');
  const [description, setDescription] = useState<any>('');
  const [channelWorth, setChannelWorth] = useState<any>(0);
  const [channelTags, setChannelTags] = useState<any>([]);

  const [loadingUpload, setLoadingUpload] = useState<any>(false);
  const [errorUpload, setErrorUpload] = useState<any>('');

  const userSignin = useSelector((state: any) => state.userSignin);
  const { userInfo } = userSignin;

  const channelDetails = useSelector((state: any) => state.channelDetails);
  const { loading, error, channel } = channelDetails;

  const channelUpdate = useSelector((state: any) => state.channelUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = channelUpdate;

  const walletDetails = useSelector((state: any) => state.walletDetails);
  const {
    loading: loadingWallet,
    error: errorWallet,
    wallet
  } = walletDetails;

  const channelGameCreate = useSelector((state: any) => state.channelGameCreate);
  const {
    loading: loadingChannelGameCreate,
    error: errorChannelGameCreate,
    success: successChannelGameCreate,
    createdChannelGame
  } = channelGameCreate

  const channelGameDetails = useSelector((state: any) => state.channelGameDetails);
  const {
    loading: loadingChannelGameDetails,
    error: errorChannelGameDetails,
    channelGameData
  } = channelGameDetails;

  const channelGameRemove = useSelector((state: any) => state.assetGameRemove);
  const {
    loading: loadingChannelGameRemove,
    error: errorChannelGameRemove,
    success: successChannelGameRemove
  } = channelGameRemove

  const dispatch = useDispatch();

  useEffect(() => {
    if (!channel || channel._id !== channelId || successUpdate) {
      dispatch({
        type: CHANNEL_UPDATE_RESET
      });
      dispatch(detailsChannel(channelId));
    } else {
      setName(channel.name);
      setLocation(channel.location);
      setImage(channel.image);
      setChannelCategory(channel.channelCategory);
      setCountry(channel.country);
      setDescription(channel.description);
      setChannelTags(channel.channelTags);
    }
    if(successChannelGameCreate) {
      window.alert('Channel Game Created Successfully')
    }
    if(successChannelGameRemove) {
      window.alert('Channel Game Removed Successfully')
    }
    // dispatch(getWalletDetails(userInfo.defaultWallet))
    dispatch(getChannelGameDetails(channelId))
  }, [
    channel, 
    userInfo, 
    dispatch, 
    channelId, 
    successUpdate, 
    props.history,
    successChannelGameCreate,
    successChannelGameRemove,
    createdChannelGame
  ]);

  const selectedTags = (tags: any) => {
    console.log(tags);
    setChannelTags(tags);
  };
  
  
  const addGameContract = (e: any) => {
    e.preventDefault();
    window.alert('Please confirm your request to create channel game.')
    dispatch(createChannelGame(channelId, {
      _id: channelId,
      name,
      image,
      description,
      channelCategory,
      channelWorth,
      channelTags
    }))
  }

  const removeGameContract = (e: any) => {
    e.preventDefault();
    dispatch(removeChannelGame(channelId))
  }


  const submitHandler = (e: any) => {
    e.preventDefault();
    dispatch(
      updateChannel({
        _id: channelId,
        name,
        location,
        image,
        channelCategory,
        country,
        description,
        channelWorth,
        channelTags
      })
    );
  };



  return (
    <Stack>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <Flex justify="space-between">
          <Link width="20%" as={RouterLink} to={`/channel/${channelId}`}><AiOutlineDoubleLeft /></Link>
          <Heading width="60%" textAlign="center" fontSize="20px">Edit {channel.name}</Heading>
          <Text fontSize="">{!channel.activeGameContract ? (
            "No Active Game"
          ) : (
            <Link as={RouterLink} to={`/viewblock/tx/${channel.activeGameContract}`}>Game Active</Link>
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
        <Stack shadow="card" p="10px">
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
                onChange={(e) => setChannelTags(e.target.value)} 
                placeholder="nsfw,art,holiday, ...etc" 
                value={channelTags}
                />
            </Stack>
            <HStack>{Object.keys(channelTags).map((key) => [String(key), channelTags[key]]).map((t) => (
              <Text key={t[1]} fontSize="70%">{t[1]}</Text>
            ))}
            </HStack>
          </FormControl>
          <FormControl id="location">
            <FormLabel>Channels's Address</FormLabel>
            <Stack direction="row" align="center">
              <Input 
                id="location"
                onChange={(e) => setLocation(e.target.value)} 
                placeholder={location} 
                value={location}
                type="text"  
              />
            </Stack>
          </FormControl>
          <FormControl id="country">
            <FormLabel>Channel's Country</FormLabel>
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
        
          {loadingWallet ? (
            <LoadingBox></LoadingBox>
          ) : errorWallet ? (
            <MessageBox variant="danger">{errorWallet}</MessageBox>
          ) : (
          <FormControl id="image">
            <FormLabel>Channel Image</FormLabel>
            <Stack direction="row" align="center">
            <img 
              src={image} 
              className="popCard medium" 
              alt="channel__image"
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
          <FormControl id="channelCategory">
            <FormLabel>Channel Category</FormLabel>
            <Stack direction="row" align="center">
              <select
                title="channelCategory"
                placeholder={channelCategory}
                value={channelCategory}
                onChange={(e) => setChannelCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                <option value="ADVERTISER">Digital/Advertising Agency</option>
                <option value="INFLUENCER">Social Influencer</option>
                <option value="VLOGGER">Vlogger</option>
                <option value="GRAPHIC">Graphic Designer</option>
                <option value="ANIMATION">VIDEO ANIMATION</option>
                <option value="ENTERTAINMENT">Movies, Music, Entertainment</option>
                <option value="NEWS">News Information</option>
                <option value="DOCUMENTRIES">Documentries</option>
              </select>
            </Stack>
          </FormControl>
          {!channel?.activeGameContract ? (
            <FormControl id="channelWorth">
              <FormLabel>Channel's Worth</FormLabel>
              <Stack direction="row" align="center">
                <Input 
                  id="channelWorth"
                  onChange={(e) => setChannelWorth(e.target.value)} 
                  placeholder={channelWorth} 
                  value={channelWorth}
                  type="number"  
                />
              </Stack>
            </FormControl>
          ) : (
            <Stack>
              {loadingChannelGameDetails ? (
                <LoadingBox></LoadingBox>
              ) : errorChannelGameDetails ? (
                <MessageBox variant="danger">{errorChannelGameDetails}</MessageBox>
              ) : (
                <Stack>
                  <Heading fontSize="">Initial Asset Worth: {channelGameData.gameParams.initialWorth} RAT</Heading>
                </Stack>
              )}
            </Stack>
          )}
          {channel.__v >= 1 ? (
            <Stack>
              {channel?.activeGameContract ? (
                <Flex>
                  {loadingChannelGameRemove ? (
                    <LoadingBox></LoadingBox>
                  ) : errorChannelGameRemove ? (
                    <MessageBox variant="danger">{errorChannelGameRemove}</MessageBox>
                  ) : (
                    <Button onClick={removeGameContract}>Remove Game</Button>
                  )}
                </Flex>
              ) : (
                <Flex>
                  {loadingChannelGameCreate ? (
                    <LoadingBox></LoadingBox>
                  ) : errorChannelGameCreate ? (
                    <MessageBox variant="danger">{errorChannelGameCreate}</MessageBox>
                  ) : (
                    <Button onClick={addGameContract}>Create Game</Button>
                  )}
                </Flex>
              )}
            </Stack>
          ) : (
            <Text>Please update once with desired values to create screen game</Text>
          )}
            
          <Button onClick={submitHandler} >Update</Button>
        </Stack>
      )}
    </Stack>
  )
}
