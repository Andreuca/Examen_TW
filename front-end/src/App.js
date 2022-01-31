import { Box, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import AddFavorite from "./pages/AddFavorite";
import AddVideo from "./pages/AddVideo";
import EditFavorite from "./pages/EditFavorite";
import EditVideo from "./pages/EditVideo";
import Home from "./pages/Home";
import VideoPage from "./pages/VideoPage";
import { get } from "./utils/useAxios";

function App() {
  const [favoriteList, setFavoriteList] = useState([]);
  const [videoList, setVideoList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await get("/favorite/");
        if (response.status === 200) {
          setFavoriteList(response.data.favorite);
        }
      } catch (error) {}
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await get("/video/");
        if (response.status === 200) {
          setVideoList(response.data.videos);
        }
      } catch (error) {}
    };

    fetchData();
  }, []);

  return (
    <Box marginX={"1em"}>
      <Router>
        <Flex justifyContent={"flex-end"}>
          <Box marginRight={"1em"}>
            <Link to="/">Home</Link>
          </Box>
          <Box marginRight={"1em"}>
            <Link to="/videos">Videos</Link>
          </Box>
        </Flex>

        <Routes>
          <Route
            path="/video/add/"
            element={<AddVideo favoriteList={favoriteList} setVideoList={setVideoList} />}
          />
          <Route
            path="/video/edit/:id"
            element={<EditVideo favoriteList={favoriteList} setVideoList={setVideoList} videoList={videoList}/>}
          />
          <Route
            path="/favorite/add/"
            element={<AddFavorite setFavoriteList={setFavoriteList} />}
          />
          <Route
            path="/favorite/edit/:id"
            element={
              <EditFavorite
                favoriteList={favoriteList}
                setFavoriteList={setFavoriteList}
                canEdit={false}
              />
            }
          />
          <Route
            path="/videos"
            element={
              <VideoPage videoList={videoList} setVideoList={setVideoList} canEdit={true} />
            }
          />
          <Route
            path="/"
            element={
              <Home favoriteList={favoriteList} setFavoriteList={setFavoriteList} />
            }
          />
        </Routes>
      </Router>
    </Box>
  );
}

export default App;
