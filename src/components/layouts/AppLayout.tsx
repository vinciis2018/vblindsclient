import React, { useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Link as Router } from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux';

import { Flex, Stack, Box, IconButton } from "@chakra-ui/react";
import { Nav, Footer } from "components/common";
import {GoHome, GoDashboard} from 'react-icons/go';
import {CgWebsite, CgUserlane} from 'react-icons/cg';
import {MdOutlineSmartScreen, MdOutlineAccountBalanceWallet} from 'react-icons/md';
import {GrChannel} from 'react-icons/gr';
import {BsShop, BsFillPinMapFill} from 'react-icons/bs';

import { getWalletDetails, atomicNftUploadUser, editWallet, transferTokens } from '../../Actions/walletActions';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {

  const userSignin = useSelector((state: any) => state.userSignin);
  const {userInfo} = userSignin;


  const walletDetails = useSelector((state: any) => state.walletDetails);
  const { wallet } = walletDetails;

  return (
    <Flex flexDir="column" minH="100%" w="100%">
      <Nav />
      <BrowserRouter>
        <Box py="10px" align="center">
          <IconButton onClick={() => window.location.replace('/')} color="black" bg="none" icon={<GoHome size="20px" />} aria-label="Home"></IconButton>
          <IconButton onClick={() => window.location.replace('/assets')} color="black" bg="none" icon={<CgWebsite size="20px" />} aria-label="Assets"></IconButton>
          <IconButton onClick={() => window.location.replace('/screens')} color="black" bg="none" icon={<MdOutlineSmartScreen size="20px" />} aria-label="Screens"></IconButton>
          <IconButton onClick={() => window.location.replace('/channels')} color="black" bg="none" icon={<GrChannel size="20px" />} aria-label="Channels"></IconButton>
          <IconButton onClick={() => window.location.replace('/shops')} color="black" bg="none" icon={<BsShop size="20px" />} aria-label="Shops"></IconButton>
          <IconButton onClick={() => window.location.replace('/mapbox')} color="black" bg="none" icon={<BsFillPinMapFill size="20px" />} aria-label="Map"></IconButton>
          <IconButton onClick={() => window.location.replace('/dashboard')} color="black" bg="none" icon={<GoDashboard size="20px" />} aria-label="Dashboard"></IconButton>
          <IconButton onClick={() => window.location.replace(`/wallet/${userInfo.defaultWallet}/${wallet.walletAddAr}`)} color="black" bg="none" icon={<MdOutlineAccountBalanceWallet size="20px" />} aria-label="Wallet"></IconButton>
          <IconButton onClick={() => window.location.replace(`/userProfile/${userInfo._id}`)} color="black" bg="none" icon={<CgUserlane size="20px" />} aria-label="UserProfile"></IconButton>
        </Box>
      </BrowserRouter>
      <hr />
      <Stack p="20px" align="center top" width="100%" minHeight="720px">
        {children}
      </Stack>
      <Footer />
    </Flex>
  );
};
