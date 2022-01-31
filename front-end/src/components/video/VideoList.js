import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import VideoCard from "./VideoCard";

function VideoList({ videoList, setVideoList, videoTitle, canEdit }) {
  return (
    <Box>
      <Flex wrap={"wrap"}>
        {videoList.map((a) => {
          if (a.title.includes(videoTitle))
            return (
              <VideoCard
                key={a.id}
                video={a}
                setVideoList={setVideoList}
                canEdit={canEdit}
              />
            );
        })}
      </Flex>
    </Box>
  );
}

export default VideoList;
