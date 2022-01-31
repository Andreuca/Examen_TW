import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import FavoriteCard from "./FavoriteCard";

function FavoriteList({ favoriteList, setFavoriteList, description }) {
  return (
    <Box>
      <Flex wrap={"wrap"}>
        {favoriteList.map((a) => {
          if (a.description.includes(description))
            return <FavoriteCard
              favorite={a}
              key={a.id}
              setFavoriteList={setFavoriteList}
            />;
        })}
      </Flex>
    </Box>
  );
}

export default FavoriteList;
