import { Box, Button, Heading, Input, Select } from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { patch } from "../utils/useAxios";
import { isValidHttpUrl } from "../utils/useUrl";
function EditVideo({ favoriteList, setVideoList, videoList }) {
  let { id } = useParams();
  id = parseInt(id);
  const video = videoList.filter((v) => v.id == id)[0];
  const [title, setTitle] = useState(video.title);
  const [description, setDescription] = useState(video.description);
  const [url, setUrl] = useState(video.url);
  const [favorite, setFavorite] = useState(video.favoriteListId);

  const navigate = useNavigate();

  const onChangeSelect = (e) => {
    setFavorite(e.target.value);
  };

  async function onEditClick() {
    const video = {
      title: title,
      description: description,
      url: url,
      favoriteListId: favorite,
    };
    const valid = isValidHttpUrl(url);
    if (valid) {
      try {
        const response = await patch(`/video/${id}`, { ...video });
        if (response.status === 200) {
          setVideoList((value) => {
            let newVideos = videoList.filter((v) => v.id != id);
            newVideos = [...newVideos, response.data.video];
            return newVideos;
          });
          navigate("/videos");
        } else {
          alert("Invalid");
        }
      } catch (error) {
        alert("Invalid");
        console.log(error);
      }
    } else {
      alert("url invalid");
    }
  }

  return (
    <Box textAlign="center" marginBottom="2em">
      <Heading>Add Video</Heading>
      <Box width={"60vw"} marginX="auto" marginTop="2em">
        <Input
          placeholder="Title"
          marginBottom={"1em"}
          value={title}
          isRequired={true}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          placeholder="Description"
          marginBottom={"1em"}
          value={description}
          isRequired={true}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Input
          placeholder="Url"
          marginBottom={"1em"}
          value={url}
          isRequired={true}
          onChange={(e) => setUrl(e.target.value)}
        />
        <Select
          placeholder="Favorite"
          onChange={onChangeSelect}
          defaultValue={favorite}
        >
          {favoriteList.map((f) => (
            <option value={f.id} key={f.id}>
              {f.description}
            </option>
          ))}
        </Select>
      </Box>
      <Button colorScheme="green" marginTop="2em" onClick={onEditClick}>
        Edit Video
      </Button>
    </Box>
  );
}

export default EditVideo;
