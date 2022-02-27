import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import { useFinnie } from "components/finnie";
import { signout } from '../../../Actions/userActions';

import { Button, Box, Flex, Heading, HStack, Stack, Menu, MenuButton, MenuList, MenuItem, Text, IconButton, Tooltip, Image } from "@chakra-ui/react";
// icons
import { IoRemoveCircle } from "react-icons/io5";
import { ArweaveIcon, KoiiIcon } from "components/icons";
import { RiUser4Line, RiLogoutCircleRLine } from "react-icons/ri";
// assets
export function Nav() {
  const {
    state: { connectFinnie, disconnectFinnie, isLoading, isFinnieConnected, walletBalance, walletAddress }
  } = useFinnie();
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  }
  return (
    <Box bg="white" borderBottom='1px' px="4" color="red.400">
      <Flex mx="auto" maxW="container.lg" justify="space-between" align="center" py="3">
        <Stack as={Link} to="/" direction="row" align="center">
          <Image width={{ base: 30, lg: "40px" }} src='https://h6dz652xl5xdkm7szacl76itimaoo2ylkws2pfc6amk3o66nsp3q.arweave.net/P4efd1dfbjUz8sgEv_kTQwDnawtVpaeUXgMVt3vNk_c' />
          <Heading color="red.400" fontWeight="999" size="xl">Blinds</Heading>
        </Stack>
        {/* Connect to finnie button */}
        {isFinnieConnected ? (
          <Stack direction="row" align="center" spacing="1">
            <Menu>
              <MenuButton>
                <Stack align="center" direction="row" spacing="4" cursor="pointer" bg="red.400" px="2" py="1" rounded="md" fontSize="sm" color="black" fontWeight="400">
                  {/* Koii balance */}
                  <Stack direction="row" align="center">
                    <KoiiIcon boxSize="25px" />
                    <Text lineHeight="1">{walletBalance?.koii?.toFixed?.(2)}</Text>
                  </Stack>
                  {/* Arweave balance */}
                  <Stack direction="row" align="center">
                    <ArweaveIcon boxSize="22px" />
                    <Text lineHeight="1">{walletBalance?.ar?.toFixed?.(3)}</Text>
                  </Stack>
                </Stack>
              </MenuButton>
              <MenuList>
                <MenuItem onClick={disconnectFinnie} color="red.400" icon={<IoRemoveCircle size="20px" />}>
                  Disconnect finnie
                </MenuItem>
              </MenuList>
            </Menu>
            <Tooltip bg="red.400" color="white" hasArrow placement="bottom" label="My content">
              <IconButton as={Link} to={`/artist/${walletAddress}`} icon={<RiUser4Line size="20px" />} aria-label="go-to-my-page" bg="red.400" isRound={true} />
            </Tooltip>
          </Stack>
        ) : (
          <HStack>
            <Button isLoading={isLoading} onClick={connectFinnie}>
              {isLoading ? "Connecting..." : "Connect finnie"}
            </Button>
            <RiLogoutCircleRLine onClick={signoutHandler} fontSize="100%" />
          </HStack>
        )}
      </Flex>
    </Box>
  );
}
