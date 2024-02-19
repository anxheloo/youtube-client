import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import axios from "axios";
import Cookies from "js-cookie";
import { actions } from "../redux/videoSlice";
import { useDispatch, useSelector } from "react-redux";

const Home = ({ type }) => {
  const dispatch = useDispatch();
  const videoFromSearch = useSelector((state) => state.video.searchVideosList);
  const [videos, setVideos] = useState([]);

  console.log("This is videoFromSearch:", videoFromSearch);

  const cleanVideoSearchStateFromRedux = () => {
    dispatch(actions.search(null));
  };

  useEffect(() => {
    const getVideos = async () => {
      const token = await localStorage.getItem("token");
      const tokenParsed = await JSON.parse(token);

      try {
        const result = await axios.post(
          `https://youtube-server-pua8.onrender.com/api/videos/${type}`,
          { token: tokenParsed },
          {
            // credentials: "include",
            withCredentials: true,
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

    return cleanVideoSearchStateFromRedux();
  }, [type]);

  return (
    <div
      id="container"
      className="flex flex-col justify-center md:flex-row lg:justify-normal w-full h-screen gap-[10px] lg:gap-[20px] flex-wrap p-[10px] lg:py-[22px]  "
    >
      {videoFromSearch
        ? videoFromSearch.map((video) => {
            return <Card key={video._id} video={video}></Card>;
          })
        : videos.length > 0
        ? videos.map((video) => {
            return <Card key={video._id} video={video}></Card>;
          })
        : "Videos are fetching"}
    </div>
  );
};

export default Home;
