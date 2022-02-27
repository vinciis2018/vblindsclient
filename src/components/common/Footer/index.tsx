// ui
import { Box, Flex, Link, Heading, VStack, HStack, Image, Stack, Text, IconButton } from "@chakra-ui/react";
import { FaFacebookSquare, FaInstagramSquare, FaDiscord, FaMedium, FaLinkedin, FaYoutube, FaTwitter, FaWhatsapp, FaTelegram } from "react-icons/fa";

export function Footer() {
  return (
    <Box color="white" bg="black">
      <Flex mx="auto" maxW="container.lg" justify="space-between" align="center" py="2" px="4">
        <Box >
          <HStack py="2" >
            <Image
              width={{ base: 30, lg: "25px" }}
              src="https://h6dz652xl5xdkm7szacl76itimaoo2ylkws2pfc6amk3o66nsp3q.arweave.net/P4efd1dfbjUz8sgEv_kTQwDnawtVpaeUXgMVt3vNk_c" 
              alt="blinds logo here"
              />
              <Heading fontSize="20px">Blinds by Vinciis</Heading>
          </HStack>
          <HStack >
            <VStack >
              <Heading fontSize="10px">Contact Us</Heading>
              <Text fontSize="10px">Registered Office Address: Vinciis Creations Private Limited, D 65/319 C, Lahartara, B Shivdaspur, Varanasi, UP, 221002</Text>
              <Text fontSize="10px">Write to us @ vinciis2018@gmail.com and Call @ +917250283664.</Text>
            </VStack>
            <VStack>
              <Heading fontSize="10px">Important Links</Heading>
                <Link to='/home' fontSize="10px">
                  About Us
                </Link>
                <Link to='/home' fontSize="10px">
                  Vinciis
                </Link>
                <Link to='/home' fontSize="10px">
                  Venetian Blinds
                </Link>
                <Link to='/home' fontSize="10px">
                  More
                </Link>
            </VStack>
            <VStack>
              <Heading fontSize="10px">Demo Links</Heading>
              {/* <Link to='/' className="white">
                <p>Mobile Application</p>
              </Link> */}
              <Link fontSize="10px" to='https://drive.google.com/file/d/1Nvtee-s5zPkCaPOYz29aQOTJJvt2lGIU/view?usp=sharing' className="white">
                Minting Hardware
              </Link>
              <Link fontSize="10px" to='https://docs.google.com/document/d/1datLSwSXYT7L99IEoc_03c6VArlwlmnSBJuNpi2Wlgc/edit?usp=sharing' className="white">
                Lite Paper*
              </Link>
              <Link fontSize="10px" to='https://drive.google.com/file/d/1Cmt6S0v9hZmvqUG_mLAXzVYlxjwyMmZ9/view?usp=sharing' className="white">
                Venetian Demo
              </Link>
              <Link fontSize="10px" to='https://drive.google.com/file/d/1smjuwkWB5vvcZQKAONZ5ot9JKVpmimki/view' className="white">
                User Demo
              </Link>
            </VStack>
          </HStack>
          <HStack >
            <Flex width="auto" maxW="container.md" justify="space-between" align="center">
              <Text fontSize="10px">
                Copyright @ VINCIIS CREATIONS PRIVATE LIMITED, 2022. All rights reserved.
              </Text>
            </Flex>
            <Flex width="auto" maxW="container.md" justify="space-between" align="center">
              <IconButton as={Link} to={`/#`} bg="none" icon={<FaFacebookSquare size="20px" />} aria-label="Vinciis Facebook"></IconButton><span />
              <IconButton as={Link} to={`/#`} bg="none" icon={<FaInstagramSquare size="20px" />} aria-label="Vinciis Instagram"></IconButton><span />
              <IconButton as={Link} to={`/#`} bg="none" icon={<FaDiscord size="20px" />} aria-label="Vinciis Discord"></IconButton><span />
              <IconButton as={Link} to={`/#`} bg="none" icon={<FaTwitter size="20px" />} aria-label="Vinciis Twitter"></IconButton><span />
              <IconButton as={Link} to={`/#`} bg="none" icon={<FaTelegram size="20px" />} aria-label="Vinciis Telegram"></IconButton><span />
              <IconButton as={Link} to={`/#`} bg="none" icon={<FaMedium size="20px" />} aria-label="Vinciis Medium"></IconButton><span />
              <IconButton as={Link} to={`/#`} bg="none" icon={<FaLinkedin size="20px" />} aria-label="Vinciis Linkedin"></IconButton><span />
              <IconButton as={Link} to={`/#`} bg="none" icon={<FaWhatsapp size="20px" />} aria-label="Vinciis Whatsapp"></IconButton><span />
              <IconButton as={Link} to={`/#`} bg="none" icon={<FaYoutube size="20px" />} aria-label="Vinciis Youtube"></IconButton><span />
            </Flex>
          </HStack>
        </Box>
      </Flex>
    </Box>
  );
}
