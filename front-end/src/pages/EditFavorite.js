import {
  Box,
  Button,
  Heading,
  Input,
  NumberInput,
  NumberInputField,
  Flex,
  Text
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import VideoCard from "../components/video/VideoCard";
import { get, patch } from "../utils/useAxios";

function EditFavorite({ favoriteList, setFavoriteList, canEdit }) {
  let { id } = useParams();
  id = parseInt(id);
  const favorite = favoriteList.filter((f) => f.id == id)[0];
  const [description, setDescription] = useState(favorite.description);
  const [videos, setVideos] = useState([]);
  const [offset, setOffset] = useState(0);
  const [count, setCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await get(`/video/byFavorite/${favorite.id}/${offset}`);
        if (response.status === 200) {
          setVideos(response.data.rows);
          setCount((value) => value + 1);
          setTotalCount(response.data.count);
        }
      } catch (error) {
        alert("error");
      }
    };

    fetchVideos();
  }, []);

  const onNextPageClick = async () => {
    try {
      const response = await get(`/video/byFavorite/${favorite.id}/${offset + 1}`);
      if (response.status === 200) {
        setOffset((value) => value + 1);
        setCount((value) => value + 1);
        setVideos(response.data.rows);
      }
    } catch (error) {
      alert("error");
    }
  };

  const onPreviousPageClick = async () => {
    try {
      const response = await get(`/video/byFavorite/${favorite.id}/${offset - 1}`);
      if (response.status === 200) {
        setOffset((value) => value - 1);
        setCount((value) => value - 1);
        setVideos(response.data.rows);
      }
    } catch (error) {
      alert("error");
    }
  };

  async function onEditClick() {
    try {
      const response = await patch(`/favorite/${favorite.id}`, {
        description
      });
      if (response.status === 200) {
        setFavoriteList((value) => {
          let newFavorite = favoriteList.filter((f) => f.id != id);
          newFavorite = [...newFavorite, response.data.favorite];
          return newFavorite;
        });
        navigate("/");
      } else {
        alert("Invalid");
      }
    } catch (error) {
      alert("Invalid");
      console.log(error);
    }
  }

  return (
    <Box textAlign="center" marginBottom="2em">
      <Heading>Edit Favorite </Heading>
      <Text>{favorite.description}</Text>
      <Box width={"60vw"} marginX="auto" marginTop="2em">
        <Input
          placeholder="Favorite description"
          marginBottom={"1em"}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Box>
      <Button colorScheme="green" marginTop="2em" onClick={onEditClick}>
        Edit Favorite
      </Button>
      <Box w="80vh" mx="auto">
        {videos.map((video) => (
          <Box textAlign={"left"} key={video.id}>
            <VideoCard video={video} canEdit={canEdit} />
          </Box>
        ))}
        {totalCount > 0 && (
          <Flex justifyContent={"space-between"}>
            <Button
              colorScheme="green"
              marginTop="2em"
              onClick={onPreviousPageClick}
              disabled={offset <= 0}
            >
              Previous page
            </Button>
            <Button
              colorScheme="green"
              marginTop="2em"
              onClick={onNextPageClick}
              disabled={totalCount <= count}
            >
              Next page
            </Button>
          </Flex>
        )}
      </Box>
    </Box>
  );
}

export default EditFavorite;
