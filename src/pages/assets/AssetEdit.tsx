import React, { useEffect, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Heading, FormControl, Select, FormLabel, Input, Center, Link, Flex, Stack, SimpleGrid, VStack, Text, Button, IconButton, HStack } from "@chakra-ui/react";

import TagsInput from '../../components/helpers/TagsInput';
import LoadingBox from '../../components/helpers/LoadingBox';
import MessageBox from '../../components/helpers/MessageBox';
import { detailsAsset, updateAsset } from '../../Actions/assetActions';
import { ASSET_UPDATE_RESET } from '../../Constants/assetConstants';
import {getWalletDetails} from '../../Actions/walletActions';
import { createAssetGame, removeAssetGame, getAssetGameDetails } from '../../Actions/gameActions';

import {AiOutlineDoubleLeft, AiOutlineArrowUp, AiOutlineArrowDown, AiOutlineDelete, AiFillDislike, AiFillLike, AiFillFlag, AiOutlineEdit, AiOutlineUpload } from 'react-icons/ai'
import {BiToggleLeft, BiToggleRight} from 'react-icons/bi';


export function AssetEdit(props: any) {

  const assetId = props.match.params.id;

  const [name, setName] = useState<any>('');
  const [image, setImage] = useState<any>('');
  const [link, setLink] = useState<any>('');
  const [assetCategory, setAssetCategory] = useState<any>('');
  const [assetWorth, setAssetWorth] = useState<any>('');
  const [description, setDescription] = useState<any>('');
  const [assetTags, setAssetTags] = useState<any>([]);
  const [assetAddress, setAssetAddress] = useState<any>('');
  const [country, setCountry] = useState<any>('India');

  const userSignin = useSelector((state: any) => state.userSignin);
  const { userInfo } = userSignin;

  const assetDetails = useSelector((state: any) => state.assetDetails);
  const { loading, error, asset } = assetDetails;

  const assetUpdate = useSelector((state: any) => state.assetUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = assetUpdate;

  const walletDetails = useSelector((state: any) => state.walletDetails);
  const {
    loading: loadingWallet,
    error: errorWallet,
    wallet
  } = walletDetails;

  const assetGameCreate = useSelector((state: any) => state.assetGameCreate);
  const {
    loading: loadingAssetGameCreate,
    error: errorAssetGameCreate,
    success: successAssetGameCreate,
    createdAssetGame
  } = assetGameCreate

  const assetGameDetails = useSelector((state: any) => state.assetGameDetails);
  const {
    loading: loadingAssetGameDetails,
    error: errorAssetGameDetails,
    assetGameData
  } = assetGameDetails;

  const assetGameRemove = useSelector((state: any) => state.assetGameRemove);
  const {
    loading: loadingAssetGameRemove,
    error: errorAssetGameRemove,
    success: successAssetGameRemove
  } = assetGameRemove

  const dispatch = useDispatch();

  useEffect(() => {

    if (!asset || asset._id !== assetId || successUpdate) {
      dispatch({
        type: ASSET_UPDATE_RESET
      });
      window.alert('Asset Updated successfully');
      dispatch(detailsAsset(assetId));
    } else {
      setName(asset.name);
      setImage(image || asset.image);
      setLink(asset.link);
      setAssetCategory(asset.category);
      setAssetWorth(asset.assetWorth);
      setDescription(asset.description);
      setAssetAddress(asset.address);

      setCountry(asset.country);
      setAssetTags(asset.assetTags);
    }

    if(successAssetGameCreate) {
      window.alert('Asset Game Created Successfully')
    }
    if(successAssetGameRemove) {
      window.alert('Asset Game Removed Successfully')
    }
    dispatch(getWalletDetails(userInfo.defaultWallet))
    dispatch(getAssetGameDetails(assetId))
  }, [
    dispatch, 
    asset, 
    userInfo, 
    assetId, 
    successUpdate, 
    image,
    successAssetGameCreate,
    successAssetGameRemove,
    createdAssetGame
  ]);

  const selectedTags = (tags: any) => {
    console.log(tags);
    setAssetTags(tags);
  };

  const addGameContract = (e: any) => {
    e.preventDefault();
    window.alert('Please confirm your request to create screen game.')
    dispatch(createAssetGame(assetId, {
      _id: assetId,
      name,
      link,
      image,
      description,
      assetCategory,
      assetWorth,
      assetTags
    }))
  }

  const removeGameContract = (e: any) => {
    e.preventDefault();
    dispatch(removeAssetGame(assetId))
  }


  const submitHandler = (e: any) => {
    e.preventDefault();

    dispatch(
      updateAsset({
        _id: assetId,
        name,
        image,
        link,
        assetCategory,
        assetWorth,
        description,
        assetAddress,
        country,
        assetTags,
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
      <Flex>
        <Link width="20%" as={RouterLink} to={`/asset/${assetId}`}><AiOutlineDoubleLeft /></Link>
        <Heading width="60%" textAlign="center" fontSize="20px">Edit {asset.name}</Heading>
        <Text width="20%">{!asset.activeGameContract ? (
          "No Active Game"
        ) : (
          <Link as={RouterLink} to={`/viewblock/tx/${asset.activeGameContract}`}>Game Active</Link>
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
          <FormControl id="link">
            <FormLabel>Site Link</FormLabel>
            <Stack direction="row" align="center">
              <Input 
                id="link"
                onChange={(e) => setLink(e.target.value)} 
                placeholder={link} 
                value={link}
                type="url"  
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
                onChange={(e) => setAssetTags(e.target.value)} 
                placeholder="nsfw,art,holiday, ...etc" 
                value={assetTags}
                />
            </Stack>
            <HStack>{Object.keys(assetTags).map((key) => [String(key), assetTags[key]]).map((t) => (
              <Text key={t[1]} fontSize="70%">{t[1]}</Text>
            ))}
            </HStack>
          </FormControl>
          <FormControl id="assetAddress">
            <FormLabel>Asset's Address</FormLabel>
            <Stack direction="row" align="center">
              <Input 
                id="assetAddress"
                onChange={(e) => setAssetAddress(e.target.value)} 
                placeholder={assetAddress} 
                value={assetAddress}
                type="text"  
              />
            </Stack>
          </FormControl>
          <FormControl id="country">
            <FormLabel>Asset's Country</FormLabel>
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
              <FormLabel>Asset Image</FormLabel>
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
          <FormControl id="assetCategory">
            <FormLabel>Asset Category</FormLabel>
            <Stack direction="row" align="center">
              <select
                title="screenCategory"
                placeholder={assetCategory}
                value={assetCategory}
                onChange={(e) => setAssetCategory(e.target.value)}
              >
              <option value="">Select Category</option>
              <option value="ECOM_WEB">Ecommerce Website</option>
              <option value="PORTFOLIO_WEB">Portfolio Website</option>
              <option value="BLOG_WEB">Blogging Website</option>
              </select>
            </Stack>
          </FormControl>
          {!asset.activeGameContract ? (
            <FormControl id="assetWorth">
              <FormLabel>Asset' Worth</FormLabel>
              <Stack direction="row" align="center">
                <Input 
                  id="assetWorth"
                  onChange={(e) => setAssetWorth(e.target.value)} 
                  placeholder={assetWorth} 
                  value={assetWorth}
                  type="number"  
                />
              </Stack>
            </FormControl>
          ) : (
            <Flex>
              {loadingAssetGameDetails ? (
                <LoadingBox></LoadingBox>
              ) : errorAssetGameDetails ? (
                <MessageBox variant="danger">{errorAssetGameDetails}</MessageBox>
              ) : (
                <Heading fontSize="">Initial Asset Worth: {assetGameData.gameParams.initialWorth} RAT</Heading>
              )}
            </Flex>
          )}
          {asset.__v >= 1 ? (
            <Stack>
              {asset.activeGameContract ? (
                <Flex>
                  {loadingAssetGameRemove ? (
                    <LoadingBox></LoadingBox>
                  ) : errorAssetGameRemove ? (
                    <MessageBox variant="danger">{errorAssetGameRemove}</MessageBox>
                  ) : (
                    <Button className="primary block" onClick={removeGameContract}>Remove Game</Button>
                  )}
                </Flex>
              ) : (
                <Flex>
                  {loadingAssetGameCreate ? (
                    <LoadingBox></LoadingBox>
                  ) : errorAssetGameCreate ? (
                    <MessageBox variant="danger">{errorAssetGameCreate}</MessageBox>
                  ) : (
                    <button className="primary block" onClick={addGameContract}>Create Game</button>
                  )}
                </Flex>
              )}
            </Stack>
          ) : (
            <Text fontSize="70%">Please update once with desired values to create screen game</Text>
          )}
        </Stack>
      )}
      <Button onClick={submitHandler} >Update</Button>
    </Stack>
  )
}