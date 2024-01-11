import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import axios from "axios";
import Cookies from "js-cookie";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 22px 96px;
`;

const Home = ({ type }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const getVideos = async () => {
      try {
        const result = await axios.get(
          // `http://192.168.1.236:5001/api/videos/${type}`,
          `https://youtube-server-pua8.onrender.com/api/videos/${type}`,
          {
            // credentials: "include",
            withCredentials: true,
          }
        );
        console.log(`These are results from ${type}:`, result);

        if (result.data.status === 200) {
          setVideos(result.data.videos);
          console.log(`these are ${type} videos:`, result);
        }
      } catch (error) {
        console.log("This is error:", error);
      }
    };

    getVideos();
  }, [type]);

  return (
    <Container>
      {videos.length > 0
        ? videos.map((video) => {
            return <Card key={video._id} video={video}></Card>;
          })
        : "Videos are fetching"}
    </Container>
  );
};

export default Home;
