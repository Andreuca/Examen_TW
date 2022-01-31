import { Box, Button, Heading, Text, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import VideoList from "../components/video/VideoList";

function VideoPage({ videoList, setVideoList, canEdit }) {
  const [videoTitle, setVideoTitle] = useState("");

  return (
    <Box>
      <Box textAlign="center" marginBottom="2em">
        <Heading>Videos</Heading>
        <Box width="60vw" mx="auto" mt="1em">
          <Text as="h4">Filter by video title</Text>
          <Input
            placeholder="Video title"
            marginBottom={"1em"}
            value={videoTitle}
            onChange={(e) => setVideoTitle(e.target.value)}
          />
        </Box>
      </Box>
      <Link to="/video/add">
        <Button colorScheme="green" marginBottom="1em">
          Add Video
        </Button>
      </Link>

      <VideoList
        videoList={videoList}
        setVideoList={setVideoList}
        videoTitle={videoTitle}
        canEdit={canEdit}
      />
    </Box>
  );
}

export default VideoPage;
