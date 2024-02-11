import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { format, render, cancel, register } from "timeago.js";
import axios from "axios";

const Container = styled.div`
  width: ${(props) => props.type !== "sm" && "330px"};
  margin-bottom: ${(props) => (props.type === "sm" ? "20px" : "45px")};
  cursor: pointer;
  display: ${(props) => props.type === "sm" && "flex"};
  gap: ${(props) => props.type === "sm" && "20px"};
  // align-items: ${(props) => props.type === "sm" && "center"};
`;

const Image = styled.img`
  width: 100%;
  height: ${(props) => (props.type === "sm" ? "120px" : "202px")};
  background-color: #999;
  cursor: pointer;
  // flex: ${(props) => props.type === "sm" && "1"};
  flex: 1;
`;

const Details = styled.div`
  width: 100%;
  display: flex;
  margin-top: ${(props) => (props.type === "sm" ? "0" : "16px")};
  gap: 12px;
  cursor: pointer;
  // flex: ${(props) => props.type === "sm" && "1"};
  flex: 1;
`;

const ChannelImage = styled.img`
  display: ${(props) => props.type === "sm" && "none"};
  width: 36px;
  height: 36px;
  border-radius: 50%;
  cursor: pointer;
`;

const Texts = styled.div`
  color: white;
`;

const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
`;

const ChannelName = styled.h2`
  font-size: 14px;
  margin: 8px 0px;
`;

const Info = styled.div`
  font-size: 14px;
`;

const Card = ({ type, video }) => {
  const [channel, setChannel] = useState();
  // console.log(video);

  useEffect(() => {
    const getChannel = async () => {
      try {
        const result = await axios.get(
          `http://192.168.0.100:5001/api/users/${video.userId}`
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
      <Container type={type}>
        {/* <Image type={type} src={video.videoImg}></Image> */}
        <video
          style={{ flex: 1, height: "200px" }}
          controls
          //   autoPlay
          muted
          //   poster="https://plus.unsplash.com/premium_photo-1673624400092-0e8fd6910570?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          onMouseEnter={handleVideoHover}
          onMouseLeave={handleVideoHoverOut}
        >
          <source
            // src={`http://192.168.1.213:9001/${video.filename}`}
            src={`http://192.168.0.100:5001/public/videos/${video.filename}`}
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <Details type={type}>
          <ChannelImage type={type} src={channel?.img}></ChannelImage>
          <Texts>
            <Title>{video.title}</Title>
            <ChannelName>{channel?.name}</ChannelName>
            <Info>
              {video.views} views &nbsp; ‧ &nbsp;
              {format(video.createdAt)}
            </Info>
          </Texts>
        </Details>
      </Container>
    </Link>
  );
};

export default Card;
