import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { format, render, cancel, register } from "timeago.js";
import axios from "axios";

const Card = ({ type, video }) => {
  const [channel, setChannel] = useState();
  // console.log(video);

  useEffect(() => {
    const getChannel = async () => {
      try {
        const result = await axios.get(
          `https://youtube-server-pua8.onrender.com/api/users/${video.userId}`
          // `https://youtube-server-pua8.onrender.com/api/users/${video.userId}`
          // {
          //   // credentials: "include",
          //   withCredentials: true,
          // }
        );

        console.log("These are results:", result);

        setChannel(result.data.existingUser);

        console.log("this is result:", result);
      } catch (error) {
        console.log("This is error:", error);
      }
    };

    // getChannel();
  }, [video.userId]);

  const handleVideoHover = (event) => {
    const video = event.target;
    if (video.paused) {
      video.play();
    }
  };

  const handleVideoHoverOut = (event) => {
    const video = event.target;
    video.pause();
    // video.currentTime = 0; // Reset video to beginning
  };

  return (
    <Link to={`/video/${video._id}`} style={{ textDecoration: "none" }}>
      <div
        type={type}
        className={`w-full lg:w-[330px] ${
          type === "sm" ? "mb-[20px]" : "mb-[45px]"
        } ${type === "sm" && "gap-[20px]"} cursor-pointer`}
      >
        <video
          style={{ flex: 1, height: "200px", marginBottom: "10px" }}
          controls
          //   autoPlay
          muted
          //   poster="https://plus.unsplash.com/premium_photo-1673624400092-0e8fd6910570?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          onMouseEnter={handleVideoHover}
          onMouseLeave={handleVideoHoverOut}
        >
          <source
            // src={`http://192.168.1.213:9001/${video.filename}`}
            src={`https://youtube-server-pua8.onrender.com/public/videos/${video.filename}`}
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <div
          type={type}
          className="w-[100%] flex gap-[12px] cursor-pointer flex-1"
        >
          <img
            alt="img"
            type={type}
            src={channel?.img}
            className={`${
              type === "sm" && "hidden"
            } w-[36px] h-[36px] rounded-[50%] cursor-pointer`}
          ></img>
          <div className="text-white">
            <h1 className="text-[16px] font-medium">{video.title}</h1>
            <h2 className="my-[8px] text-[14px]">{channel?.name}</h2>
            <div className="text-14px">
              {video.views} views &nbsp; ‧ &nbsp;
              {format(video.createdAt)}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
