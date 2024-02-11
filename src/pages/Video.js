/* eslint-disable quotes */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import IosShareIcon from "@mui/icons-material/IosShare";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import Comment from "../components/Comment";
import Comments from "../components/Comments";
import Card from "../components/Card";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "../redux/videoSlice";
import { userActions } from "../redux/userSlice";
import axios from "axios";
import { useLocation } from "react-router";
import { format, render, cancel, register } from "timeago.js";

const Container = styled.div`
  display: flex;
  padding: 22px 96px;
  gap: 20px;
  color: white;
`;

const Content = styled.div`
  flex: 5;
`;

const VideoWrapper = styled.div``;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Info = styled.span`
  font-size: 14px;
  font-weight: 400;
  margin: 30px 0px;
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: white;
`;

const Button = styled.button`
  background-color: transparent;
  border-style: none;
  display: flex;
  align-items: center;
  color: white;
  gap: 10px;
  cursor: pointer;
`;

const Recommendation = styled.div`
  flex: 2;
  // background-color: red;
  // display: flex;
  // // justify-content: center;
`;

const Hr = styled.hr`
  border: 0.5px solid #202020;
`;

const Channel = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 30px;
`;

const ChannelImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  cursor: pointer;
`;

const ChannelDetails = styled.div``;

const ChannelName = styled.div`
  font-size: 18px;
  // background-color: red;
`;

const ChannelCounter = styled.div`
  margin-top: 3px;
  font-size: 12px;
`;

const ChannelDescription = styled.div`
  margin-top: 20px;
  font-size: 14px;
`;

const SubscribeBtn = styled.div`
  color: white;
  font-weight: bold;
  background-color: red;
  border-radius: 5px;
  padding: 10px 20px;
  height: max-content;
  border: none;
  cursor: pointer;
`;

const Video = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const currentVideo = useSelector((state) => state.video.currentVideo);

  const [channel, setChannel] = useState();
  const [comments, setComments] = useState([]);
  // const [videoById, setVideoById] = useState();

  const path = useLocation().pathname.split("/")[2];
  console.log(
    "This is path from useLocation().pathanme:",
    useLocation().pathname
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const videoRes = await axios.get(
          // `https://youtube-server-pua8.onrender.com/api/videos/${path}`
          `http://192.168.0.100:5001/api/videos/${path}`
        );

        console.log("THis is videoRes:", videoRes);

        const channelRes = await axios.get(
          // `https://youtube-server-pua8.onrender.com/api/users/${videoRes.data.video._id}`
          `http://192.168.0.100:5001/api/users/${videoRes.data.video.userId}`
        );

        const commentsRes = await axios.get(
          `http://192.168.0.100:5001/api/comments/${path}`
        );

        setComments(commentsRes.data.comments);

        await dispatch(actions.videoSuccess(videoRes.data.video));
        setChannel(channelRes.data.userWithoutPassword);

        console.log("This is videoRes:", videoRes.data);
        console.log("This is channelRes:", channelRes.data);

        console.log("This is current Video:", currentVideo);
      } catch (error) {
        console.log("This is error from useEffect:", error);
        dispatch(actions.failToGet());
      }
    };

    fetchData();
  }, [path, currentUser, dispatch]);

  const handleLike = async () => {
    if (currentUser) {
      try {
        const token = await localStorage.getItem("token");
        const tokenParsed = await JSON.parse(token);

        const res = await axios.put(
          `http://192.168.0.100:5001/api/users/like/${currentVideo?._id}`,
          { token: tokenParsed },
          {
            withCredentials: true,
          }
        );

        if (res.status === 200) {
          dispatch(actions.videoSuccess(res.data.video));
        }
      } catch (error) {
        console.log("This is Error from handleLike:", error);
      }
    } else {
      alert("Please log in!");
    }
  };

  const handleDislike = async () => {
    if (currentUser) {
      try {
        const token = await localStorage.getItem("token");
        const tokenParsed = await JSON.parse(token);

        const res = await axios.put(
          `http://192.168.0.100:5001/api/users/dislike/${currentVideo?._id}`,
          { token: tokenParsed },
          {
            withCredentials: true,
          }
        );

        if (res.status === 200) {
          dispatch(actions.videoSuccess(res.data.video));
        }
      } catch (error) {
        console.log("This is Error from handleDislike:", error);
      }
    } else {
      alert("Please log in!");
    }
  };

  const handleSubscribe = async () => {
    if (currentUser) {
      try {
        const token = await localStorage.getItem("token");
        const tokenParsed = await JSON.parse(token);

        const res = await axios.put(
          `http://192.168.0.100:5001/api/users/subscribe/${channel?._id}`,
          { token: tokenParsed },
          {
            withCredentials: true,
          }
        );

        console.log("This is res.data:", res.data);

        if (res.status === 200) {
          dispatch(userActions.currentUserUpdate(res.data.user));
        }
      } catch (error) {
        console.log("This is error from handleSubscribe:", error);
      }
    } else {
      alert("Please Log in!");
    }
  };

  const handleUnSubscribe = async () => {
    if (currentUser) {
      try {
        const token = await localStorage.getItem("token");
        const tokenParsed = await JSON.parse(token);

        const res = await axios.put(
          `http://0:5001/api/users/unsubscribe/${channel?._id}`,
          { token: tokenParsed },
          {
            withCredentials: true,
          }
        );

        console.log("This is res.data:", res.data);

        if (res.status === 200) {
          dispatch(userActions.currentUserUpdate(res.data.user));
        }
      } catch (error) {
        console.log("This is error from handleSubscribe:", error);
      }
    } else {
      alert("Please Log in!");
    }
  };

  return (
    <Container>
      <Content>
        <VideoWrapper>
          <video
            style={{ width: "100%", height: "720px" }}
            controls
            //   autoPlay
            muted
            //   poster="https://plus.unsplash.com/premium_photo-1673624400092-0e8fd6910570?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            // onMouseEnter={handleVideoHover}
            // onMouseLeave={handleVideoHoverOut}
          >
            <source
              // src={`http://192.168.1.213:9001/${video.filename}`}
              src={`http://192.168.0.100:5001/public/videos/${currentVideo?.filename}`}
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </VideoWrapper>

        <Title>{currentVideo?.title}</Title>

        <Details>
          <Info>
            {currentVideo?.views} views {format(currentVideo?.createdAt)}
          </Info>

          <Buttons>
            {currentVideo?.likes?.includes(currentUser?._id) ? (
              <Button>
                <ThumbUpAltIcon style={{ color: "white" }}></ThumbUpAltIcon>
                {currentVideo?.likes?.length}
              </Button>
            ) : (
              <Button onClick={handleLike}>
                <ThumbUpOffAltIcon
                  style={{ color: "white" }}
                ></ThumbUpOffAltIcon>
                {currentVideo?.likes?.length}
              </Button>
            )}

            {currentVideo?.dislikes?.includes(currentUser?._id) ? (
              <Button>
                <ThumbDownAltIcon style={{ color: "white" }}></ThumbDownAltIcon>{" "}
                {currentVideo?.dislikes.length}
              </Button>
            ) : (
              <Button onClick={handleDislike}>
                <ThumbDownOffAltIcon
                  style={{ color: "white" }}
                ></ThumbDownOffAltIcon>{" "}
                {currentVideo?.dislikes.length}
              </Button>
            )}

            <Button>
              <IosShareIcon style={{ color: "white" }}></IosShareIcon>
            </Button>

            <Button>
              <LibraryAddIcon style={{ color: "white" }}></LibraryAddIcon>
            </Button>
          </Buttons>
        </Details>

        <Hr></Hr>

        <Channel>
          <ChannelInfo>
            <ChannelImage src={channel?.img}></ChannelImage>
            <ChannelDetails>
              <ChannelName>{channel?.name}</ChannelName>
              <ChannelCounter>
                {channel?.subscribers} subscribers
              </ChannelCounter>
              <ChannelDescription>
                {currentVideo?.description}
              </ChannelDescription>
            </ChannelDetails>
          </ChannelInfo>

          {currentUser?.subscribedUsers?.includes(channel?._id) ? (
            <SubscribeBtn onClick={handleUnSubscribe}>Unsubscribe</SubscribeBtn>
          ) : (
            <SubscribeBtn onClick={handleSubscribe}>Subscribe</SubscribeBtn>
          )}
        </Channel>

        <Comment
          videoId={currentVideo?._id}
          setComments={setComments}
        ></Comment>

        {comments &&
          comments.map((comment) => {
            return <Comments key={comment._id} comment={comment}></Comments>;
          })}
        {/* <Comments></Comments>
        <Comments></Comments>
        <Comments></Comments>
        <Comments></Comments>
        <Comments></Comments>
        <Comments></Comments>
        <Comments></Comments>
        <Comments></Comments>
        <Comments></Comments> */}
      </Content>
      {/* <Recommendation>
        <Card type="sm"></Card>
        <Card type="sm"></Card>
        <Card type="sm"></Card>
        <Card type="sm"></Card>
        <Card type="sm"></Card>
        <Card type="sm"></Card>
        <Card type="sm"></Card>
        <Card type="sm"></Card>
        <Card type="sm"></Card>
      </Recommendation> */}
    </Container>
  );
};

export default Video;
