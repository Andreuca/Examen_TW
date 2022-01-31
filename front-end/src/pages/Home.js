import {
  Box,
  Button,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import FavoriteList from "../components/favorite/FavoriteList";

function Home({ favoriteList, setFavoriteList }) {
  const [description, setDescription] = useState("");

  return (
    <Box>
      <Box textAlign="center" marginBottom="2em">
        <Heading>Favorite</Heading>
        <Box width="60vw" mx="auto" mt="1em">
          <Text as="h4">Filter by description</Text>
          <Input
            placeholder="Description"
            marginBottom={"1em"}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Box>
      </Box>
      <Link to="/favorite/add">
        <Button colorScheme="green" marginBottom="1em">
          Add Favorite
        </Button>
      </Link>

      <FavoriteList
        favoriteList={favoriteList}
        setFavoriteList={setFavoriteList}
        description={description}
      />
    </Box>
  );
}

export default Home;
