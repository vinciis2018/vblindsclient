import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useParams } from 'react-router-dom';

import { Box, Heading, Slider, SliderTrack, SliderMark, SliderFilledTrack, SliderThumb, FormControl, Select, FormLabel, Input, Center, Link, Flex, Stack, SimpleGrid, VStack, Text, Button, IconButton, HStack } from "@chakra-ui/react";

// import { masterRequest, allyRequest, brandRequest } from '../Actions/pleaActions';
import { deleteScreen, listScreens } from '../../Actions/screenActions';
import { deleteChannel, listChannels } from '../../Actions/channelActions';
import { deleteShop, listShops } from '../../Actions/shopActions';
import { createWallet, editWallet, listWallets } from '../../Actions/walletActions'

// import Rating from '../Components/Helpers/Rating';
import LoadingBox from '../../components/helpers/LoadingBox';
import MessageBox from '../../components/helpers/MessageBox';
import { userVideosList } from '../../Actions/userActions';
import { detailsUser, updateUserProfile } from '../../Actions/userActions';
import { USER_UPDATE_PROFILE_RESET } from '../../Constants/userConstants';
import { SCREEN_DELETE_RESET } from '../../Constants/screenConstants';
import { CHANNEL_DELETE_RESET } from '../../Constants/channelConstants';
import { SHOP_DELETE_RESET } from '../../Constants/shopConstants';

import { WALLET_CREATE_RESET } from '../../Constants/walletConstants';

import {FaUserGraduate, FaUserSecret, FaUserNinja, FaUserTie} from 'react-icons/fa';
import {AiOutlineDoubleLeft, AiOutlineArrowUp, AiOutlineArrowDown, AiOutlineDelete, AiFillDislike, AiFillLike, AiFillFlag, AiOutlineEdit, AiOutlineUpload } from 'react-icons/ai'



export function UserProfile(props: any) {

  const { pageNumber = 1 } = useParams<any>();

  const [keyModal, setKeyModal] = useState<any>(false)
  const masterMode = props.match.path.indexOf('/master') >= 0;
  const allyMode = props.match.path.indexOf('/ally') >= 0;
  const brandMode = props.match.path.indexOf('/brand') >= 0;

  const userSignin = useSelector((state: any) => state.userSignin);
  const { userInfo } = userSignin;

  const userDetails = useSelector((state: any) => state.userDetails);
  const { loading: loadingDetails, error: errorDetails, user } = userDetails;

  const userVideos = useSelector((state: any) => state.userVideos);
  const { loading: loadingVideos, error: errorVideos, videos } = userVideos;

  const userUpdate = useSelector((state: any) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  const screenList = useSelector((state: any) => state.screenList);
  const { loading: loadingScreens, error: errorScreens, screens } = screenList;

  const screenDelete = useSelector((state: any) => state.screenDelete);
  const {
    loading: loadingScreenDelete,
    error: errorScreenDelete,
    success: successScreenDelete,
  } = screenDelete;

  const channelList = useSelector((state: any) => state.channelList);
  const { loading: loadingChannels, error: errorChannels, channels } = channelList;

  const channelDelete = useSelector((state: any) => state.channelDelete);
  const {
    loading: loadingChannelDelete,
    error: errorChannelDelete,
    success: successChannelDelete,
  } = channelDelete;

  const shopList = useSelector((state: any) => state.shopList);
  const { loading: loadingShops, error: errorShops, shops } = shopList;

  const shopDelete = useSelector((state: any) => state.shopDelete);
  const {
    loading: loadingShopDelete,
    error: errorShopDelete,
    success: successShopDelete,
  } = shopDelete;

  const walletCreate = useSelector((state: any) => state.walletCreate);
  const {
    loading: loadingWalletCreate,
    error: errorWalletCreate,
    success: successWalletCreate,
    createdWalletData,
  } = walletCreate;

  const walletList = useSelector((state: any) => state.walletList);
  const { loading: loadingWallets, error: errorWallets, wallets } = walletList;

  const [accessPopUp, setAccessPopUp] = useState<any>(false)
  const [masterModalVisible, setMasterModalVisible] = useState<any>(false);
  const [masterAccessPopUp, setMasterAccessPopUp] = useState<any>(false);

  const [allyModalVisible, setAllyModalVisible] = useState<any>(false);
  const [allyAccessPopUp, setAllyAccessPopUp] = useState<any>(false);

  const [brandModalVisible, setBrandModalVisible] = useState<any>(false);
  const [brandAccessPopUp, setBrandAccessPopUp] = useState<any>(false);

  const [privilegeModalVisible, setPrivilegeModalVisible] = useState<any>(false);

  // const [screenEditModalVisible, setScreenEditModalVisible] = useState(true);

  // const [channelEditModalVisible, setChannelEditModalVisible] = useState(true);

  // const [shopEditModalVisible, setShopEditModalVisible] = useState(true);

  const [masterName, setMasterName] = useState<any>('');
  const [masterLogo, setMasterLogo] = useState<any>('');
  const [masterDescription, setMasterDescription] = useState<any>('');

  const [allyName, setAllyName] = useState<any>('');
  const [allyLogo, setAllyLogo] = useState<any>('');
  const [allyDescription, setAllyDescription] = useState<any>('');

  const [brandName, setBrandName] = useState<any>('');
  const [brandLogo, setBrandLogo] = useState<any>('');
  const [brandDescription, setBrandDescription] = useState<any>('');

  const dispatch = useDispatch();
  useEffect(() => {

    if (successScreenDelete) {
      dispatch({ type: SCREEN_DELETE_RESET });
      props.history.push(`/userProfile/${userInfo._id}`)
    }

    if (successChannelDelete) {
      dispatch({ type: CHANNEL_DELETE_RESET });
      props.history.push(`/userProfile/${userInfo._id}`)
    }

    if (successShopDelete) {
      dispatch({ type: SHOP_DELETE_RESET });
      props.history.push(`/userProfile/${userInfo._id}`)
    }

    if (successUpdate) {
      setMasterAccessPopUp(false);
      setAllyAccessPopUp(false);
      setBrandAccessPopUp(false);
      setAccessPopUp(false);
    }
    if (!user) {
      dispatch({
        type: USER_UPDATE_PROFILE_RESET
      });
      dispatch(detailsUser(userInfo._id));
    } else {

      if (user.user.master) {
        setMasterName(user.user.master.name);
        setMasterLogo(user.user.master.Logo);
        setMasterDescription(user.user.master.description);
        
      }
      if (user.user.ally) {
        setAllyName(user.user.ally.name);
        setAllyLogo(user.user.ally.logo);
        setAllyDescription(user.user.ally.description);
      }
      if (user.user.brand){
        setBrandName(user.user.brand.name);
        setBrandLogo(user.user.brand.logo);
        setBrandDescription(user.user.brand.description);
      }

    }
    if (successWalletCreate) {
      setKeyModal(true)
      dispatch({ type: WALLET_CREATE_RESET });
      // props.history.push(`/userProfile/${userInfo._id}`)
    }
    
    
      dispatch(userVideosList(userInfo._id));
      dispatch(listScreens({ master: masterMode ? userInfo._id : '' }));
      dispatch(listChannels({ ally: allyMode ? userInfo._id : '' }));
      // dispatch(listShops({ brand: brandMode ? userInfo._id : '' }));
      dispatch(listWallets());
  }, [
    dispatch, 
    userInfo, 
    user, 
    successUpdate,
    pageNumber,
    masterMode,
    successScreenDelete,
    allyMode,
    successChannelDelete,
    brandMode,
    successShopDelete,
    // successWalletCreate,
    // createdWalletData,

  ]);


  const submitHandler = (e: any) => {
    e.preventDefault();
    dispatch(updateUserProfile({
      userId: userInfo._id,
      masterName,
      masterLogo,
      masterDescription,

      allyName,
      allyLogo,
      allyDescription,

      brandName,
      brandLogo,
      brandDescription,

    }));
    window.location.replace(`/userProfile/${userInfo._id}`);

  };


  const deleteScreenHandler = (screen: any) => {
    if (window.confirm('Are you sure to delete?')) {
      dispatch(deleteScreen(screen._id));
    }
    window.location.replace(`/userProfile/${userInfo._id}`);
  };

  const deleteChannelHandler = (channel: any) => {
    if (window.confirm('Are you sure to delete?')) {
      dispatch(deleteChannel(channel._id));
    }
    window.location.replace(`/userProfile/${userInfo._id}`);
  };

  const deleteShopHandler = (shop: any) => {
    if (window.confirm('Are you sure to delete?')) {
      dispatch(deleteShop(shop._id));
    }
    window.location.replace(`/userProfile/${userInfo._id}`);
  };


  function getIST(dateStr: any) {
    var theDate = new Date(Date.parse(
      dateStr));

    var IST = theDate.toLocaleString();
    return IST;

  }

  const openAccessPopUp = (user: any) => {
    setAccessPopUp(!accessPopUp)
    setMasterAccessPopUp(false);
    setAllyAccessPopUp(false);
    setBrandAccessPopUp(false);
  }


  const openMasterAccessPopUp = (user: any) => {
    setMasterAccessPopUp(!masterAccessPopUp);
    setAllyAccessPopUp(false);
    setBrandAccessPopUp(false);
  }

  const openMasterModal = (user: any) => {
    setMasterModalVisible(!masterModalVisible);
    setAllyModalVisible(false);
    setBrandModalVisible(false);
    
  }

  const openAllyAccessPopUp = (user: any) => {
    setAllyAccessPopUp(!allyAccessPopUp);
    setMasterAccessPopUp(false);
    setBrandAccessPopUp(false);
    
  }

  const openAllyModal = (user: any) => {
    setAllyModalVisible(!allyModalVisible);
    setMasterModalVisible(false);
    setBrandModalVisible(false);

  }

  const openBrandAccessPopUp = (user: any) => {
    setBrandAccessPopUp(!brandAccessPopUp);
    setMasterAccessPopUp(false);
    setAllyAccessPopUp(false);
  }

  const openBrandModal = (user: any) => {
    setBrandModalVisible(!brandModalVisible);
    setMasterModalVisible(false);
    setAllyModalVisible(false);

  }

  const openPrivilegeModal = (user: any) => {
    setPrivilegeModalVisible(!privilegeModalVisible);
    setMasterModalVisible(false);
    setAllyModalVisible(false);
    setBrandModalVisible(false);

  }

 const createWalletHandler = () => {
   dispatch(createWallet())
 }

 const updateWalletHandler = () => {
  dispatch(editWallet({}))
}


const downloadFile = ({ data, fileName, fileType }: any) => {
  // Create a blob with the data we want to download as a file
  const blob = new Blob([data], { type: fileType })
  // Create an anchor element and dispatch a click event on it
  // to trigger a download
  const a = document.createElement('a')
  a.download = fileName
  a.href = window.URL.createObjectURL(blob)
  const clickEvt = new MouseEvent('click', {
    view: window,
    bubbles: true,
    cancelable: true,
  })
  a.dispatchEvent(clickEvt)
  a.remove()
}

const exportToJson = (e: any) => {
  e.preventDefault()
  downloadFile({
    data: JSON.stringify(createdWalletData?.jwk),
    fileName: 'user_key_blinds.json',
    fileType: 'text/json',
  })
}

  return (
    <Stack>
      {loadingDetails ? (
        <LoadingBox></LoadingBox>
      ) : errorDetails ? (
        <MessageBox variant="danger"></MessageBox>
      ) : (
        <SimpleGrid gap="8" columns={[1, 2]}>
          <Box p="10px" shadow="card" align="center">
            <img 
              width="20%"
              src="../../../images/avatar/Memoji-01.png"
              alt={userInfo.name}
              />
            <Stack onClick={() => openPrivilegeModal(!privilegeModalVisible)}>
              <Heading fontSize="">It's {userInfo.name} here</Heading>
              <Text fontSize="70%">{userInfo._id}</Text>
            </Stack>
            <hr />
            {userInfo.isMaster &&
            <HStack p="10px" onClick={() => openMasterModal(!masterModalVisible)}>
                <FaUserGraduate />
                <Heading fontSize="">Master</Heading>
            </HStack>}
            {userInfo.isAlly &&
            <HStack p="10px" onClick={() => openAllyModal(!allyModalVisible)}>
                <FaUserNinja />
                <Heading fontSize="">Ally</Heading>
            </HStack>}
            {userInfo.isBrand &&
            <HStack p="10px" onClick={() => openBrandModal(!brandModalVisible)}>
                <FaUserTie />
                <Heading fontSize="">Brand</Heading>
            </HStack>}
            {userInfo &&
            <HStack p="10px" onClick={() => openPrivilegeModal(!privilegeModalVisible)}>
                <FaUserSecret />
                <Heading fontSize="">Usage Privileges</Heading>
            </HStack>}
          </Box>
          <Box p="10px" shadow="card" align="center">
            {accessPopUp ? (
              <Flex direction="column">
                <Stack p="10px">
                  <Heading fontSize="" onClick={() => openAccessPopUp(!accessPopUp)}>Choose access</Heading>
                  <Flex justify="space-between">
                    {user.user.isMaster && <FaUserGraduate onClick={() => openMasterAccessPopUp(!masterAccessPopUp)}/>}
                    {user.user.isAlly && <FaUserNinja onClick={() => openAllyAccessPopUp(!allyAccessPopUp)} />}
                    {user.user.isBrand && <FaUserTie  onClick={() => openBrandAccessPopUp(!brandAccessPopUp)} />}
                  </Flex>
                
                </Stack>
                <hr />
                <Heading fontSize="">Please fill the details carefully</Heading>
                {masterAccessPopUp ? (
                  <Stack>
                    {(!user.user.isMaster) && <Button >Ask Master Access</Button>}
                    {masterAccessPopUp && user.user.isMaster && (
                      <Box>
                        <FormControl id="masterName">
                          <FormLabel>Master's Name</FormLabel>
                          <Stack direction="row" align="center">
                            <Input 
                              id="masterName"
                              onChange={(e) => setMasterName(e.target.value)} 
                              placeholder={masterName} 
                              value={masterName}
                              type="text"  
                            />
                          </Stack>
                        </FormControl>
                        <FormControl id="masterDescription">
                          <FormLabel>Master's Description</FormLabel>
                          <Stack direction="row" align="center">
                            <Input 
                              id="masterDescription"
                              onChange={(e) => setMasterDescription(e.target.value)} 
                              placeholder={masterDescription} 
                              value={masterDescription}
                              type="text"  
                            />
                          </Stack>
                        </FormControl>
                        <FormControl id="masterLogo">
                          <FormLabel>Master's Logo</FormLabel>
                          <Stack direction="row" align="center">
                            <img 
                              width="20%"
                              src={user.user.master.logo} 
                              alt="masterLogo"
                            />
                            <select
                              title="masterLogo"
                              value={masterLogo}
                              onChange={(e) => setMasterLogo(e.target.value)}
                            >{user?.wallet?.transactions.map((tx: any) => (tx.txType.type === "ANFT_CREATION") && (
                              
                              <option key={tx.txId} value={`https://arweave.net/${tx.txId}`}>
                                {tx.txId}
                              </option>
                            ))}
                            </select>
                          </Stack>
                        </FormControl>
                        <Button className="primary block" onClick={submitHandler}>
                          <FaUserGraduate /> Update Master Profile
                        </Button>
                      </Box>
                    )}
                    <hr />
                  </Stack>
                ) : allyAccessPopUp ? (
                  <Stack>
                    {(!user.user.isAlly) && <Button>Ask Ally Access</Button>}
                    {allyAccessPopUp && user.user.isAlly && (
                      <Box>
                        <FormControl id="allyName">
                          <FormLabel>Ally's Name</FormLabel>
                          <Stack direction="row" align="center">
                            <Input 
                              id="allyName"
                              onChange={(e) => setAllyName(e.target.value)} 
                              placeholder={allyName} 
                              value={allyName}
                              type="text"  
                            />
                          </Stack>
                        </FormControl>
                        <FormControl id="allyDescription">
                          <FormLabel>Ally's Description</FormLabel>
                          <Stack direction="row" align="center">
                            <Input 
                              id="allyDescription"
                              onChange={(e) => setAllyDescription(e.target.value)} 
                              placeholder={allyDescription} 
                              value={allyDescription}
                              type="text"  
                            />
                          </Stack>
                        </FormControl>
                        <FormControl id="allyLogo">
                          <FormLabel>Ally's Logo</FormLabel>
                          <Stack direction="row" align="center">
                            <img 
                              width="20%"
                              src={user.user.ally.logo} 
                              alt="allyLogo"
                            />
                            <select
                              title="allyLogo"
                              value={allyLogo}
                              onChange={(e) => setAllyLogo(e.target.value)}
                            >{user?.wallet?.transactions.map((tx: any) => (tx.txType.type === "ANFT_CREATION") && (
                              
                              <option key={tx.txId} value={`https://arweave.net/${tx.txId}`}>
                                {tx.txId}
                              </option>
                            ))}
                            </select>
                          </Stack>
                        </FormControl>
                        <Button onClick={submitHandler}>
                          <FaUserNinja /> Update Ally Profile
                        </Button>
                      </Box>
                    )}
                    <hr />
                  </Stack>
                ) : brandAccessPopUp ? (
                  <Stack>
                    {(!user.user.isBrand) && <Button >Ask Brand Access</Button>}
                    {brandAccessPopUp && user.user.isBrand && (
                      <Box>
                        <FormControl id="brandName">
                          <FormLabel>Brand's Name</FormLabel>
                          <Stack direction="row" align="center">
                            <Input 
                              id="brandName"
                              onChange={(e) => setBrandName(e.target.value)} 
                              placeholder={brandName} 
                              value={brandName}
                              type="text"  
                            />
                          </Stack>
                        </FormControl>
                        <FormControl id="brandDescription">
                          <FormLabel>Brand's Description</FormLabel>
                          <Stack direction="row" align="center">
                            <Input 
                              id="brandDescription"
                              onChange={(e) => setBrandDescription(e.target.value)} 
                              placeholder={brandDescription} 
                              value={brandDescription}
                              type="text"  
                            />
                          </Stack>
                        </FormControl>
                        <FormControl id="brandLogo">
                          <FormLabel>Brand's Logo</FormLabel>
                          <Stack direction="row" align="center">
                            <img 
                              width="20%"
                              src={user.user.brand.logo} 
                              alt="brandLogo"
                            />
                            <select
                              title="brandLogo"
                              value={brandLogo}
                              onChange={(e) => setBrandLogo(e.target.value)}
                            >{user?.wallet?.transactions.map((tx: any) => (tx.txType.type === "ANFT_CREATION") && (
                              
                              <option key={tx.txId} value={`https://arweave.net/${tx.txId}`}>
                                {tx.txId}
                              </option>
                            ))}
                            </select>
                          </Stack>
                        </FormControl>
                        <Button onClick={submitHandler}>
                          <FaUserTie /> Update Brand Profile
                        </Button>
                      </Box>
                    )}
                    <hr />
                  </Stack>
                ) : (
                  null
                )}
              </Flex>
            ) : (
              <Flex direction="column">
                {masterModalVisible ? (
                  <Stack>
                    <Box>
                      <img width="20%"
                        src={user.user.master.logo}
                        alt={user.user.master.name}
                      /><span />
                    </Box>
                    <Heading fontSize="">{user.user.master.name}</Heading>
                    <Text fontSize="70%">{userInfo._id}</Text>
                    <Text fontSize="70%">{userInfo.email}</Text>
                    <Text fontSize="70%">Joined on {getIST(userInfo.createdAt).substring(0, 8)}</Text>
                  </Stack>
                ) : allyModalVisible ? (
                  <Stack>
                    <Box>
                      <img 
                        width="20%"
                        src={user.user.ally.logo}
                        alt={user.user.ally.name}
                      /><span />
                    </Box>
                    <Heading fontSize="">{user.user.ally.name}</Heading>
                    <Text fontSize="70%">{userInfo._id}</Text>
                    <Text fontSize="70%">{userInfo.email}</Text>
                    <Text fontSize="70%">Joined on {getIST(userInfo.createdAt).substring(0, 8)}</Text>
                  </Stack>
                ) : brandModalVisible ? (
                  <Stack>
                    <Box>
                      <img 
                        width="20%"
                        src={user.user.brand.logo}
                        alt={user.user.brand.name}
                      /><span />
                    </Box>
                    <Heading fontSize="">{user.user.brand.name}</Heading>
                    <Text fontSize="70%">{userInfo._id}</Text>
                    <Text fontSize="70%">{userInfo.email}</Text>
                    <Text fontSize="70%">Joined on {getIST(userInfo.createdAt).substring(0, 8)}</Text>
                  </Stack>
                ) : (
                  <Stack>
                    <Box>
                      <img 
                        width="20%"
                        src={userInfo.avatar}
                        alt={userInfo.name}
                      />
                    </Box>
                    <Heading fontSize="">{userInfo.name}</Heading>
                    <Text fontSize="70%">{userInfo._id}</Text>
                    <Text fontSize="70%">{userInfo.email}</Text>
                    <Text fontSize="70%">Joined on {getIST(userInfo.createdAt).substring(0, 8)}</Text>
                    <hr />
                    <Flex p="10px" justify="space-between">
                      <Heading fontSize="" onClick={() => openAccessPopUp(!accessPopUp)}>Access Granted: </Heading>
                      {user.user.isMaster && <FaUserGraduate />}
                      {user.user.isAlly && <FaUserNinja />}
                      {user.user.isBrand && <FaUserTie />}  
                    </Flex>
                  </Stack>
                )}
                <hr />
                {masterModalVisible ? (
                  <Box>{user.user.master.description}</Box>
                ) : allyModalVisible ? (
                  <Box>{user.user.ally.description}</Box>
                ) : brandModalVisible ? (
                  <Box>{user.user.brand.description}</Box>
                ) : (
                  null
                )}
              </Flex>
            )}
            {masterAccessPopUp || allyAccessPopUp || brandAccessPopUp ? (
              <>
              </>
            ) : (
              <>
              </>
            )}
            <Heading  p="10px" fontSize="">You can reach out to me at {user.user.phone}</Heading>
            <Text fontSize="70%">I live/work in {user.user.address} city in the district of {user.user.districtCity} ({user.user.pincode}), {user.user.stateUt}, {user.user.country}</Text>
          </Box>
        </SimpleGrid>
      )}
      <hr />
      {loadingWallets ? (
        <LoadingBox></LoadingBox>
      ) : errorWallets ? (
        <MessageBox variant="danger">{errorWallets}</MessageBox>
      ) : (
        <Stack>
           <Box p="10px" shadow="card" align="center"> 
            {loadingWalletCreate && <LoadingBox></LoadingBox>}
            {errorWalletCreate && <MessageBox variant="danger">{errorWalletCreate}</MessageBox>}
            {successWalletCreate && (
              <Stack>
                <MessageBox variant="success">Your Key is here, download and save it for future use. Please don't provide it to any untrusted application/wallets. Make sure you don't loose it.</MessageBox>
                <Button onClick={exportToJson}>Download Key</Button>
              </Stack>
            )}
            <HStack justify="space-between">
              <Heading  fontSize="">My Wallet</Heading>
              {(userInfo.isItanimulli || user?.user?.wallets.length === 0) && (
                <Button onClick={createWalletHandler}>
                  Create Wallet
                </Button>
              )}
              {user.user.wallets.length !== 0 && (
                <Button onClick={updateWalletHandler}>
                  Get Updated Wallet Balance.
                </Button>
              )}
            </HStack>
          </Box>
          <Box  p="10px" shadow="card" >
            {wallets.map((wallet: any) => (
              <Stack key={wallet._id} onClick={() => props.history.push(`/wallet/${wallet._id}/${wallet.walletAddAr}`)}>
                {wallet.user === userInfo._id && (
                  <Stack>
                    <Flex justify="space-between">
                      <Heading fontSize="">{wallet.user}</Heading>
                      <Heading fontSize="">{wallet.walletName}</Heading>
                    </Flex>
                    <Flex justify="space-between">
                      <Text fontSize="70%">{wallet.walletAddAr}</Text>
                      <Text fontSize="70%">{wallet._id}</Text>
                    </Flex>
                    <hr />
                    <Flex justify="space-between" fontSize="70%"> Wallet Balance : 
                      <strong>{wallet.balanceRAT} RAT</strong>
                      <strong>{wallet.balanceKOII} KOII</strong>
                      <strong>{wallet.balanceAR} AR</strong>
                    </Flex>
                    {wallet.defaultWallet === true && <Text fontSize="70%">Default wallet</Text>}
                    {wallet.defaultWallet === false && <Text fontSize="70%">Not default</Text>}
                  </Stack>
                )}
              </Stack>
            ))}
          </Box>
        </Stack>
      )}
      <hr />
      {masterModalVisible ? (
        <Stack>
          <Heading fontSize="">My Campaigns</Heading>
          {loadingVideos ? (
            <LoadingBox></LoadingBox>
          ) : errorVideos ? (
            <MessageBox variant="danger">{errorVideos}</MessageBox>
          ) : (
            <Flex>
              {videos.map((video: any) => (
                <Box as={RouterLink} to={`/video/${video._id}`} key={video._id}>
                  <img width="20%" src={video.thumbnail} alt={video.name} />
                </Box>
              ))}
            </Flex>
          )}
        </Stack>
      ) : allyModalVisible ? (
        <Stack>
          <Heading fontSize="">My Films</Heading>
          {loadingVideos ? (
            <LoadingBox></LoadingBox>
          ) : errorVideos ? (
            <MessageBox variant="danger">{errorVideos}</MessageBox>
          ) : (
            <Flex>
              {videos.map((video: any) => (
                <Box  key={video._id} as={RouterLink} to={`/video/${video._id}`}>
                  <img width="20%" src={video.thumbnail} alt={video.name} />
                </Box>
              ))}
            </Flex>
          )}
        </Stack>
      ) : brandModalVisible ? (
        <Stack>
          <Heading fontSize="">My Items</Heading>
          {loadingVideos ? (
            <LoadingBox></LoadingBox>
          ) : errorVideos ? (
            <MessageBox variant="danger">{errorVideos}</MessageBox>
          ) : (
            <Flex>
              {videos.map((video: any) => (
                <Box key={video._id} as={RouterLink} to={`/video/${video._id}`}>
                  <img width="20%" src={video.thumbnail} alt={video.name} />
                </Box>
              ))}
            </Flex>
          )}
        </Stack>
      ) : (
        <Stack>
          <Heading fontSize="">My Views</Heading>
          {loadingVideos ? (
            <LoadingBox></LoadingBox>
          ) : errorVideos ? (
            <MessageBox variant="danger">{errorVideos}</MessageBox>
          ) : (
            <Flex>
              {videos.map((video: any) => (
                <Box p="10px" width="20%" key={video._id} as={RouterLink} to={`/video/${video._id}/${video.video.split('https://arweave.net/')[1]}`}>
                  <img  src={video.thumbnail} alt={video.name} />
                </Box>
              ))}
            </Flex>
          )}
        </Stack>
      )}
      <hr />
      <Box shadow="card" p="10px">
        {masterModalVisible ? (
          <Stack>
            <Flex justify="space-between">
              <Heading fontSize="">My Screens</Heading>
              <Button >Add New Screen</Button>
            </Flex>
            <hr />
            {loadingScreens ? (
              <LoadingBox></LoadingBox>
            ) : errorScreens ? (
              <MessageBox variant="danger">{errorScreens}</MessageBox>
            ) : (
              <SimpleGrid gap="8" columns={[1, 2, 3]}>
                {screens.map((screen: any) => (
                  <Box p="1px" shadow="card" key={screen._id} as={RouterLink} to={`/screen/${screen._id}`}>
                    <HStack>
                      <img width="30%" src={screen.image} alt={screen.name} />
                      <Flex>
                        <Heading fontSize="70%">{screen.name}</Heading>
                        {loadingScreenDelete && <LoadingBox></LoadingBox>}
                        {errorScreenDelete && <MessageBox variant="danger">{errorScreenDelete}</MessageBox>}
                        <HStack>
                          <AiOutlineEdit onClick={() => props.history.push(`/screen/${screen._id}/edit`)} />
                          <AiOutlineDelete onClick={() => deleteScreenHandler(screen)} />
                        </HStack>
                      </Flex>
                    </HStack>
                  </Box>
                ))}
              </SimpleGrid>
            )}
          </Stack> 
        ) : allyModalVisible ? (
          <Stack>
            <Flex justify="space-between">
              <Heading fontSize="">My Channels</Heading>
              <Button >Add New Channel</Button>
            </Flex>
            <hr />
            {loadingChannels ? (
              <LoadingBox></LoadingBox>
            ) : errorChannels ? (
              <MessageBox variant="danger">{errorChannels}</MessageBox>
            ) : (
              <SimpleGrid gap="8" columns={[1, 2, 3]}>
                {channels.map((channel: any) => (
                  <Box p="1px" shadow="card" key={channel._id} as={RouterLink} to={`/channel/${channel._id}`}>
                    <HStack>
                      <img width="30%" src={channel.image} alt={channel.name} />
                      <Flex>
                        <Heading fontSize="">{channel.name}</Heading>
                        {loadingChannelDelete && <LoadingBox></LoadingBox>}
                        {errorChannelDelete && <MessageBox variant="danger">{errorChannelDelete}</MessageBox>}
                        <HStack>
                          <AiOutlineEdit onClick={() => props.history.push(`/channel/${channel._id}/edit`)} />
                          <AiOutlineDelete onClick={() => deleteChannelHandler(channel)} />
                        </HStack>
                      </Flex>
                    </HStack>
                  </Box>
                ))}
              </SimpleGrid>
            )}
          </Stack> 
        ) : brandModalVisible ? (
          <Stack>
            <Flex justify="space-between">
              <Heading fontSize="">My Shops</Heading>
              <Button>Add New Shop</Button>
            </Flex>
            <hr />
            {loadingShops ? (
              <LoadingBox></LoadingBox>
            ) : errorShops ? (
              <MessageBox variant="danger">{errorShops}</MessageBox>
            ) : (
              <SimpleGrid gap="8" columns={[1, 2, 3]}>
                {shops.map((shop: any) => (
                  <Box p="1px" shadow="card" key={shop._id} as={RouterLink} to={`/shop/${shop._id}`}>
                    <HStack>
                      <img width="20%" src={shop.image} alt={shop.name} />
                      <Flex justify="space-between">
                        <Heading fontSize="">{shop.name}</Heading>
                        {loadingShopDelete && <LoadingBox></LoadingBox>}
                        {errorShopDelete && <MessageBox variant="danger">{errorShopDelete}</MessageBox>}
                        <HStack>
                          <AiOutlineEdit onClick={() => props.history.push(`/shop/${shop._id}/edit`)} />
                          <AiOutlineDelete onClick={() => deleteShopHandler(shop)} />
                        </HStack>
                      </Flex>
                    </HStack>
                    
                  </Box>
                ))}
              </SimpleGrid>
            )}
          </Stack>
        ) : (
          null
        )}
      </Box>
    </Stack>
    
  )
}
