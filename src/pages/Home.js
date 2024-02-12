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
      const token = await localStorage.getItem("token");
      const tokenParsed = await JSON.parse(token);

      try {
        const result = await axios.post(
          `http://192.168.0.101:5001/api/videos/${type}`,
          { token: tokenParsed },
          {
            // credentials: "include",
            // withCredentials: true,
          }
          // ,
          // `https://youtube-server-pua8.onrender.com/api/videos/${type}`,
          //  {token : tokenParsed},
          // {
          //   // credentials: "include",
          //   withCredentials: true,
          // }
        );
        console.log(`These are results from ${type}:`, result);

        if (result.data.status === 200) {
          setVideos(result.data.videos);
          console.log(`these are ${type} videos:`, result);
        }
      } catch (error) {
        if (error.response.status === 401) {
          setVideos([]);
          alert("Please Log In!");
        }
        console.log("This is error:", error);
      }
    };

    getVideos();
  }, [type]);

  return (
    // <Container>
    //   {videos.length > 0
    //     ? videos.map((video) => {
    //         return <Card key={video._id} video={video}></Card>;
    //       })
    //     : "Videos are fetching"}
    // </Container>

    <div
      id="container"
      className="flex w-full h-screen justify-between flex-wrap p-[10px] lg:py-[22px]  "
    >
      {videos.length > 0
        ? videos.map((video) => {
            return <Card key={video._id} video={video}></Card>;
          })
        : "Videos are fetching"}
    </div>
  );
};

export default Home;
