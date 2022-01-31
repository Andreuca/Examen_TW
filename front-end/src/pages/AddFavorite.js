import {
  Box, Button, Heading,
  Input,
  NumberInput,
  NumberInputField
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { post } from "../utils/useAxios";

function AddFavorite({ setFavoriteList }) {
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  async function onAddClick() {
    const favorite = {
      description
    };
    try {
      const response = await post("/favorite/", { ...favorite });
      if (response.status === 201) {
        setFavoriteList((value) => [...value, response.data.favorite]);
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
      <Heading>Add Favorite</Heading>
      <Box width={"60vw"} marginX="auto" marginTop="2em">
        <Input
          placeholder="Favorite descritpion"
          marginBottom={"1em"}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Box>
      <Button colorScheme="green" marginTop="2em" onClick={onAddClick}>
        Add Favorite
      </Button>
    </Box>
  );
}

export default AddFavorite;
