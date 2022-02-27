import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { Box, Heading, Flex, Stack, HStack, VStack, Text, IconButton } from "@chakra-ui/react";

import { listAllVideos } from '../../Actions/videoActions';
import LoadingBox from '../../components/helpers/LoadingBox';
import MessageBox from '../../components/helpers/MessageBox';

export function Adverts(props: any) {
  
  const videoListAll = useSelector((state: any) => state.videoListAll);
  const { allVideos, loading, error } = videoListAll;
  
  console.log(allVideos);

  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(listAllVideos());
  }, [dispatch]);

  function getIST(dateStr: any) {
    var theDate = new Date(Date.parse(
      dateStr));

      var IST = theDate.toLocaleString();
      return IST;
    
  }

  return (
    <Flex>
      <Stack align="center">
        <Heading textAlign="center" fontSize="20px">Adverts</Heading>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <HStack>
            <li className="row top start">
              {allVideos.map((video: any) => (
                <ul key={video._id}>
                  <li className="card">
                    <Link to={'/video/' + video._id}>
                      <div className="row">
                        <img
                          className="xxsmallThumbnail"
                          src={video.thumbnail}
                          alt={video.name}
                        />
                      </div>
                      <div className="card-body-small">
                        <h5><p className="thumbTitle">{video.title}</p></h5>
                        <div className=" row small">
                          <q>{video.uploaderName}</q>
                          <q>{video.views} views</q>
                        </div>
                        <hr />
                        <p>Uploaded on {getIST(video.createdAt).substring(0, 8)}</p>
                      </div>
                    </Link>
                  </li>
                </ul>
              ))}
            </li>
          </HStack>
        )}
      </Stack>
    </Flex>
  );
}