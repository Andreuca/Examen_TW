import { Box, Button } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { remove } from "../../utils/useAxios";

function VideoCard({ video, setVideoList, canEdit }) {
  const onDeleteClick = async () => {
    try {
      const response = await remove(`/video/${video.id}`);
      if (response.status == 200) {
        if (setVideoList) {
          setVideoList((oldVideos) => {
            const newVideos = oldVideos.filter((v) => v.id != video.id);
            return newVideos;
          });
        }
      }
    } catch (error) {
      alert("error");
    }
  };

  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      marginRight="2em"
      mt={"1em"}
    >
      <Box p="6">
        <Box display="flex" alignItems="baseline">
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            isTruncated
          >
            {video.url}
          </Box>
        </Box>

        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          {video.title}
        </Box>
        <Box
          mt="1"
          lineHeight="tight"
          isTruncated
        >
          {video.description}
        </Box>
        {canEdit && (
          <Box>
            <Link to={`/video/edit/${video.id}`}>
              <Button colorScheme="blue" marginTop="2em" size={"sm"} mr="1em">
                Edit video
              </Button>
            </Link>
            <Button
              colorScheme="red"
              marginTop="2em"
              size={"sm"}
              onClick={onDeleteClick}
            >
              Delete video
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default VideoCard;
