import { Box, Button, Heading, Input, Select } from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { post } from "../utils/useAxios";
import { isValidHttpUrl } from "../utils/useUrl";
function AddVideo({ favoriteList, setVideoList }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [favorite, setFavorite] = useState();

  const navigate = useNavigate();

  const onChangeSelect = (e) => {
    setFavorite(e.target.value);
  };

  async function onAddClick() {
    const video = {
      title: title,
      description: description,
      url: url,
      favoriteListId: favorite,
    };
    const valid = isValidHttpUrl(url);
    if (valid) {
      try {
        const response = await post("/video/", { ...video });
        if (response.status === 201) {
          setVideoList((value) => [...value, response.data.video]);
          navigate("/videos");
        } else {
          alert("Invalid");
        }
      } catch (error) {
        alert("Invalid");
        console.log(error);
      }
    } else {
      alert("invalid Url");
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
          isRequired={true}
          defaultValue={favorite}
        >
          {favoriteList.map((f) => (
            <option value={f.id} key={f.id}>
              {f.description}
            </option>
          ))}
        </Select>
      </Box>
      <Button colorScheme="green" marginTop="2em" onClick={onAddClick}>
        Add Video
      </Button>
    </Box>
  );
}

export default AddVideo;
