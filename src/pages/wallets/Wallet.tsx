import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { getWalletDetails, atomicNftUploadUser, editWallet, transferTokens } from '../../Actions/walletActions';
import { ReactNode, useMemo, memo } from "react";

import {Link as RouterLink} from 'react-router-dom';
import { Box, Heading, Slider, SliderTrack, SliderMark, SliderFilledTrack, SliderThumb, FormControl, Select, FormLabel, Input, Center, Link, Flex, Stack, SimpleGrid, VStack, Text, Button, IconButton, HStack } from "@chakra-ui/react";

import { useArtist } from "api/hooks";
import { NftFeaturedCard } from "components/cards";

import LoadingBox from '../../components/helpers/LoadingBox';
import MessageBox from '../../components/helpers/MessageBox';
import TagsInput from '../../components/helpers/TagsInput';

import Axios from 'axios';
import { WALLET_EDIT_RESET } from '../../Constants/walletConstants';
import { 
  USER_ATOMIC_NFT_UPLOAD_RESET,  
  TOKENS_TRANSFER_RESET
} from '../../Constants/walletConstants';
import { signout } from '../../Actions/userActions';

import { DragAndDropUploader } from 'components/widgets';

import {BiTransfer} from 'react-icons/bi';
import { BsGear, BsCloudUpload } from 'react-icons/bs';
import { useFinnie } from 'components/finnie';

export function Wallet(props: any) {

  const walletId = props.match.params.walletId;
  const walletAdd = props.match.params.id;

  const { data: artist, isLoading, isError } = useArtist({ id: walletAdd });

  const artistData = useMemo(() => {
    return {
      name: artist?.nfts?.[0]?.name,
      description: artist?.nfts?.[0]?.description,
      pieces: artist?.nfts?.length
    };
  }, [artist]);

    /* Finnie */
    const {
      state: { connectFinnie, walletAddress, isLoading: finnieLoading, walletBalance, isFinnieConnected }
    } = useFinnie();

  const [{alt, src}, setPreview] = useState<any>("")
  const [anft, setAnft] = useState<any>("");
  const [anftTitle, setAnftTitle] = useState<any>("");
  const [anftDescription, setAnftDescription] = useState<any>("");
  const [anftTags, setAnftTags] = useState<any>("");
  const [isNsfw, setIsNsfw] = useState<any>(false);
  const [loadingUploadAnft, setLoadingUploadAnft] = useState<any>(false);
  const [errorUploadAnft, setErrorUploadAnft] = useState<any>('');

  const [toWallet, setToWallet] = useState<any>("");
  const [quantity, setQuantity] = useState<any>("");
  const [ticker, setTicker] = useState<any>("");

  const [walletName, setWalletName] = useState<any>('');
  const [defaultWallet, setDefaultWallet] = useState<any>('');

  const [anftModalVisible, setAnftModalVisible] = useState<any>(false);
  const [transferModalVisible, setTransferModalVisible] = useState<any>(false);
  const [editWalletModalVisible, setEditWalletModalVisible] = useState<any>(false);


  const userSignin = useSelector((state: any) => state.userSignin);
  const {userInfo} = userSignin;

  const walletDetails = useSelector((state: any) => state.walletDetails);
  const {
    loading: loadingWallet,
    error: errorWallet,
    wallet
  } = walletDetails;

  const walletEdit = useSelector((state: any) => state.walletEdit);
  const { 
    loading: loadingWalletEdit, 
    error: errorWalletEdit, 
    success: successWalletEdit 
  } = walletEdit;


  const userAtomicNftUpload = useSelector((state: any) => state.userAtomicNftUpload);
  const {
    loading: loadingUserAtomicNftUpload,
    error: errorUserAtomicNftUpload,
    success: successUserAtomicNftUpload
  } = userAtomicNftUpload;

  const tokensTransfer = useSelector((state: any) => state.tokensTransfer);
  const {
    loading: loadingTokensTransfer,
    error: errorTokensTransfer,
    success: successTokensTransfer,
  } = tokensTransfer;

  function checkIfImage(url: any, cb: any) {
    const img = new Image();
    img.src = url;
    img.onload = async function() {};
    console.log(img.src, img.complete )
    cb = img.complete
    return cb;
  }


  const dispatch = useDispatch();
  useEffect(() => {

    if(successWalletEdit) {
      dispatch({
        type: WALLET_EDIT_RESET
      })
      window.alert('Wallet edited, please login again to activate the changes');
      dispatch(signout());
    }

    if(successTokensTransfer) {
      setToWallet("");
      setQuantity("");
      setTicker("");
      dispatch({
        type: TOKENS_TRANSFER_RESET
      })
      window.alert(`${quantity} ${ticker} transferred to ${toWallet} successfully!`);
      setTransferModalVisible(false);

    }

    if(successUserAtomicNftUpload) {
      setAnft("");
      setAnftTitle("");
      setAnftDescription("");
      setAnftTags("");
      dispatch({
        type: USER_ATOMIC_NFT_UPLOAD_RESET
      })
      window.alert('Atomic NFT submitted successfully');
      setAnftModalVisible(false);

    }
    dispatch(getWalletDetails(walletId))

  } , [
    dispatch,
    userInfo,
    walletId,
    successUserAtomicNftUpload,
    successTokensTransfer,
    toWallet,
    quantity,
    ticker
  ]);

  const selectedTags = (tags: any) => {
    console.log(tags);
    setAnftTags(tags);
  };

  const handlePreview = (e: any) => {
    if(e.target.files[0]) {
      setPreview({
        src: URL.createObjectURL(e.target.files[0]),
        alt: e.target.files[0].name
      });

      const file = e.target.files[0];
      const bodyFormData = new FormData();
      bodyFormData.append('file', file);
      setLoadingUploadAnft(true)
      try {
          Axios
        .post('/api/uploads/local', bodyFormData, {
          headers: {
            Authorization: `Bearer ${userInfo.token}`
          },
        })
        .then((response) => {
          setAnft(response.data.file);
          console.log(response.data.path)
          setLoadingUploadAnft(false);
        })
        .catch((err) => {
          console.log(err);
          setErrorUploadAnft(err.message);
          setLoadingUploadAnft(false);
        });
      } catch (error: any) {
        console.log(error);
        setErrorUploadAnft(error.message);
        setLoadingUploadAnft(false);

      }
    }
  }

  const uploadAnftHandler = () => {
    console.log({anft, anftTitle, anftDescription, anftTags});
    dispatch(atomicNftUploadUser({
      anft,
      anftTitle,
      anftDescription,
      anftTags,
      isNsfw
    }))
  }

  const submitTransferHandler = () => {
    console.log({toWallet, quantity, ticker});
    dispatch(transferTokens({
      walletId,
      toWallet,
      quantity,
      ticker,
    }))
  }

  const submitHandler = (e: any) => {
    e.preventDefault();
    dispatch(
      editWallet({
        _id: walletId,
        walletName,
        defaultWallet
      })
    );
  };


  const uploadModalHandler = () => {
    setEditWalletModalVisible(false);
    setTransferModalVisible(false);
    setAnftModalVisible(!anftModalVisible);
  }

  const transferModalHandler = () => {
    setEditWalletModalVisible(false);
    setAnftModalVisible(false);
    setTransferModalVisible(!transferModalVisible);
  }

  const editWalletModalHandler = () => {
    setAnftModalVisible(false);
    setTransferModalVisible(false);
    setEditWalletModalVisible(!editWalletModalVisible);
  }
  

  return (
    <Stack>
      <HStack justify="space-between">
        <Heading fontSize="">Wallet Details</Heading>
        <Flex width="100px" justify="space-between">
          <BiTransfer
            fontSize="20" 
            aria-label='Transfer Tokens'
            onClick={transferModalHandler}
          />
          <BsCloudUpload
            fontSize="20" 
            aria-label='Upload Atomic NFT'
            onClick={uploadModalHandler}
          />
          <BsGear 
            fontSize="20" 
            aria-label="Edit Wallet Details"
            onClick={editWalletModalHandler}
          />
        </Flex>
      </HStack>
      <hr />
      {anftModalVisible && (
        <Stack shadow="card" width="100%"  justify="space-between">
            <DragAndDropUploader />
        </Stack>
      )}
      {transferModalVisible && (
        <Stack>
          <SimpleGrid shadow="card" p="10px" gap="8" columns={[1, 2]}>
            <Box>
              <FormControl id="toWallet">
                <FormLabel>Recipient Wallet</FormLabel>
                <Stack direction="row" align="center">
                  <Input 
                    id="toWallet"
                    onChange={(e) => setToWallet(e.target.value)} 
                    placeholder={toWallet} 
                    value={toWallet}
                    type="text"  
                  />
                </Stack>
              </FormControl>
              <FormControl id="quantity">
                <FormLabel>Transfer Value</FormLabel>
                <Stack direction="row" align="center">
                  <Input 
                    id="quantity"
                    onChange={(e) => setQuantity(e.target.value)} 
                    placeholder={quantity} 
                    value={quantity}
                    type="number"  
                  />
                </Stack>
              </FormControl>
            </Box>
            <Box>
              <FormControl id="ticker">
                <FormLabel>Tranfer Token Ticker</FormLabel>
                <Stack direction="row" align="center">
                  <select
                    title="ticker"
                    value={ticker}
                    onChange={(e) => setTicker(e.target.value)}
                  >
                    <option key={0} value="">Select Ticker</option>
                    <option key={1} value="rat">RAT Tokens</option>
                    <option key={2} value="KOII">KOII Tokens</option>
                    <option key={3} value="AR">AR Tokens</option>
                  </select>
                </Stack>
              </FormControl>
              {loadingTokensTransfer ? (
                <LoadingBox></LoadingBox>
              ) : errorTokensTransfer ? (
                <MessageBox variant="danger">{errorTokensTransfer}</MessageBox>
              ) : (
              <HStack p="10px" justify="space-between">
                  <Button 
                    onClick={submitTransferHandler}
                  >Submit Transfer</Button>
                  <Button 
                    onClick={() => setTransferModalVisible(false)}
                  >Cancel Transfer</Button>
              </HStack>
              )}
            </Box>
          </SimpleGrid>
        </Stack>
      )}
      {editWalletModalVisible && (
        <Stack>
        
          {loadingWalletEdit ? (
            <LoadingBox></LoadingBox>
          ) : errorWalletEdit ? (
            <MessageBox>{errorWalletEdit}</MessageBox>
          ) : (
            <Stack shadow="card" p="10px">
              <Heading textAlign="center" fontSize="">My wallet</Heading>
              <hr />
              <FormControl id="walletName">
                <FormLabel>Wallet Name</FormLabel>
                <Stack direction="row" align="center">
                  <Input 
                    id="walletName"
                    onChange={(e) => setWalletName(e.target.value)} 
                    placeholder={walletName} 
                    value={walletName}
                    type="text"  
                  />
                </Stack>
              </FormControl>
              <Flex justify="space-between">
                <Text fontSize="">{wallet?.balanceRAT} RAT</Text>
                <Text fontSize="">{wallet?.balanceKOII} KOII</Text>
                <Text fontSize="">{wallet?.balanceAR} AR</Text>
              </Flex>
              
              {wallet?.defaultWallet === true && <Text fontSize="">Default Wallet</Text>}
              {wallet?.defaultWallet === false && <Text fontSize="">Not A Default Wallet</Text>}
              <FormControl id="defaultWallet">
                {/* <FormLabel>Default Wallet?</FormLabel> */}
                <Stack direction="row" align="center">
                  <select
                    title="defaultWallet"
                    value={defaultWallet}
                    onChange={(e) => setDefaultWallet(e.target.value)}
                  >
                    <option value="">Deselect Wallet</option>
                    <option value="default">Default Wallet</option>
                    <option value="">Deselect Wallet</option>
                  </select>
                </Stack>
              </FormControl>
              <Button type="submit" onSubmit={submitHandler}>Update Wallet</Button>
            </Stack>
          )}
        </Stack>
      )}
      {loadingWallet ? (
        <LoadingBox></LoadingBox>
      ) : errorWallet ? (
        <MessageBox variant="danger">{errorWallet}</MessageBox>
      ) : (
        <Stack>
          <Box shadow="card" p="10px">
            <Flex justify="space-between">
              <Heading fontSize="">{wallet.walletAddAr}</Heading>
              <Heading fontSize="">{wallet.walletName}</Heading>
            </Flex>
            <Flex justify="space-between">
              <Text fontSize="">{wallet.user}</Text>
              <Text fontSize="">{wallet._id}</Text>
            </Flex>
            <hr />
            <Flex p="10px" justify="space-between" fontSize=""> Wallet Balance : 
              <strong>{wallet.balanceRAT} RAT</strong>
              <strong>{wallet.balanceKOII} KOII</strong>
              <strong>{wallet.balanceAR} AR</strong>
            </Flex>
            {wallet.defaultWallet === true && <Text fontSize="70%">Default wallet</Text>}
            {wallet.defaultWallet === false && <Text fontSize="70%">Not default</Text>}
          </Box>
          <hr />
          {wallet?.pendingTransactions?.length !== 0 ? (
            <Box shadow="card" p="10px">
              <Heading fontSize="">Pending Transactions</Heading>
              <hr />
              {wallet?.pendingTransactions?.map((tx: any) => (
                <Stack  key={tx.txId} onClick={() => props.history.push(`/viewblock/tx/${tx.txId}`)}> 
                  <Heading fontSize="">{tx.txId}</Heading>
                  <Flex justify="space-between">
                    <Text fontSize="">{tx.txType.type}</Text>
                    <Text fontSize="">Status: {tx.body.status}</Text>
                  </Flex>
                </Stack>
              ))}
            </Box>
          ) : (
            <Text>No pending transactions for you</Text>
          )}
          <hr />

          {wallet?.transactions?.map((tx: any) => (tx.txType.type === "ANFT_CREATION") && (
            <Box key={tx.txId} shadow="card" p="10px">
              <HStack>
                <img 
                  width="30%"
                  src={`https://arweave.net/${tx.txId}`}
                  alt="NFT here"
                />
                <Flex onClick={() => props.history.push(`/nft/${tx.txId}`)} >
                  <Text fontSize="">{tx.txId}</Text>
                  <Text fontSize="">{tx.body.status}</Text>
                </Flex>
              </HStack>
            </Box>
          ))}
          <hr />

          
        {artist?.nfts?.length !== 0 && (
          <SimpleGrid w="100%" minW="0" minH="0" gap="8" columns={[1, 2, 3]}>
            {artist?.nfts?.map((nft: Record<string, any>) => (
              <NftFeaturedCard nft={nft} key={nft?.id} />
            ))}
          </SimpleGrid>
        )}

          <SimpleGrid gap="8" columns={[1, 2]}>
            <Stack>
              {wallet?.recievedTransactions?.length === 0 ? (
                <Text fontSize="">No Transactions</Text>
              ) : (
                <Box shadow="card" p="10px" >
                  <Heading fontSize="">Recieved Transactions</Heading>
                  <hr />
                  {wallet?.recievedTransactions?.map((tx: any) => (
                    <Stack key={tx.txId} onClick={() => props.history.push(`/viewblock/tx/${tx.txId}`)}>
                      <Heading fontSize="">{tx.txId}</Heading>
                      <Flex justify="space-between">
                        <Text fontSize="">{tx.txType.type}</Text>
                        <Text fontSize="">Status: {tx.body.status}</Text>
                      </Flex>
                    </Stack>
                    ))}
                </Box>
              )}
            </Stack>
            <Stack>
              {wallet?.transactions?.length === 0 ? (
                <Text fontSize="">No Transactions</Text>
              ): (
                <Box shadow="card" p="10px">
                  <Heading fontSize="">Complete Transactions</Heading>
                  <hr />
                  {wallet?.transactions?.map((tx: any) => (
                    <Stack key={tx.txId} onClick={() => props.history.push(`/viewblock/tx/${tx.txId}`)}>
                      <Heading fontSize="">{tx.txId}</Heading>
                      <Flex justify="space-between">
                        <Text fontSize="">{tx.txType.type}</Text>
                        <Text fontSize="">Status: {tx.body.status}</Text>
                      </Flex>
                    </Stack>
                    ))}
                </Box>
              )}
            </Stack>
          </SimpleGrid>
        </Stack>
      )}
    </Stack>
  )
}
