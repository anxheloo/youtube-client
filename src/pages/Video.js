/* eslint-disable quotes */
import React, { useCallback, useEffect, useRef, useState } from "react";
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

const Video = () => {
  const videoRef = useRef();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const currentVideo = useSelector((state) => state.video.currentVideo);
  const [video, setVideo] = useState(null);
  const [channel, setChannel] = useState();
  const [comments, setComments] = useState([]);
  let path = useLocation().pathname.split("/")[2];

  const cleanUpFunction = () => {
    // dispatch(actions.clearVideo());
    setVideo(null);
  };

  const addView = async () => {
    try {
      const addViewRes = await axios.put(
        `https://youtube-server-pua8.onrender.com/api/videos/view/${path}`
      );
      if (addViewRes.status === 200) {
        console.log(
          "this is addViewRes:",
          addViewRes.data.message,
          addViewRes.data.views
        );

        fetchData();
      }
    } catch (error) {
      console.log("Error while adding view:", error);
    }
  };

  const fetchData = async () => {
    try {
      const videoRes = await axios.get(
        // `https://youtube-server-pua8.onrender.com/api/videos/${path}`
        `https://youtube-server-pua8.onrender.com/api/videos/${path}`
      );

      dispatch(actions.videoSuccess(videoRes.data.video));
      setVideo(videoRes.data.video);

      const channelRes = await axios.get(
        // `https://youtube-server-pua8.onrender.com/api/users/${videoRes.data.video._id}`
        `https://youtube-server-pua8.onrender.com/api/users/${videoRes.data.video.userId}`
      );
      setChannel(channelRes.data.userWithoutPassword);

      const commentsRes = await axios.get(
        `https://youtube-server-pua8.onrender.com/api/comments/${path}`
      );

      setComments(commentsRes.data.comments);
    } catch (error) {
      console.log("This is error from useEffect:", error);
      dispatch(actions.failToGet());
    }
  };

  useEffect(() => {
    addView();
    videoRef.current.play();

    return cleanUpFunction();
  }, [path]);

  const handleLike = async () => {
    if (currentUser) {
      try {
        const token = await localStorage.getItem("token");
        const tokenParsed = await JSON.parse(token);

        const res = await axios.put(
          `https://youtube-server-pua8.onrender.com/api/users/like/${video?._id}`,
          { token: tokenParsed },
          {
            withCredentials: true,
          }
        );

        if (res.status === 200) {
          console.log("status 200: this is res.data:", res.data);
          setVideo(res.data.video);
          dispatch(actions.videoSuccess(res.data.video));
        }

        // if (res.status === 200) {
        //   dispatch(actions.videoSuccess(res.data.video));
        // }
      } catch (error) {
        console.log("This is Error from handleLike:", error);
      }
    } else {
      alert("Please log in!");
    }

    console.log("Button Pressed!");
  };

  const handleDislike = async () => {
    if (currentUser) {
      try {
        const token = await localStorage.getItem("token");
        const tokenParsed = await JSON.parse(token);

        const res = await axios.put(
          `https://youtube-server-pua8.onrender.com/api/users/dislike/${video?._id}`,
          { token: tokenParsed },
          {
            withCredentials: true,
          }
        );

        if (res.status === 200) {
          console.log("status 200: this is res.data:", res.data);
          setVideo(res.data.video);
          dispatch(actions.videoSuccess(res.data.video));
        }

        // if (res.status === 200) {
        //   dispatch(actions.videoSuccess(res.data.video));
        // }
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
          `https://youtube-server-pua8.onrender.com/api/users/subscribe/${channel?._id}`,
          { token: tokenParsed },
          {
            withCredentials: true,
          }
        );

        console.log("Success! This is res.data:", res.data);

        if (res.status === 200) {
          // setVideo(res.data)
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
          `https://youtube-server-pua8.onrender.com/api/users/unsubscribe/${channel?._id}`,
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
    <div
      id="container"
      className="flex w-full h-screen justify-center p-[15px] lg:py-[22px] lg:px-[96px] gap-[20px] text-white lg:mb-[400px]"
    >
      <div id="content" className="w-full h-full ">
        <div>
          <video
            ref={videoRef}
            className="w-full lg:h-full max-h-[700px]"
            // style={{ width: "100%", height: "720px" }}
            controls
            //   autoPlay
            muted
            //   poster="https://plus.unsplash.com/premium_photo-1673624400092-0e8fd6910570?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            // onMouseEnter={handleVideoHover}
            // onMouseLeave={handleVideoHoverOut}
          >
            {video && (
              <source
                // src={`http://192.168.1.213:9001/${video.filename}`}
                src={`https://youtube-server-pua8.onrender.com/public/videos/${video?.filename}`}
                // src={`https://youtube-server-pua8.onrender.com/public/videos/${videoById?.filename}`}
                type="video/mp4"
              />
            )}
            Your browser does not support the video tag.
          </video>
        </div>

        <h1 className="text-[18px] font-normal mt-[20px] lg:mb-[10px]">
          {video?.title}
        </h1>

        <div className="flex items-center justify-between">
          <span className="text-[14px] font-normal my-[10px] lg:my-[30px]">
            {video?.views} views {format(video?.createdAt)}
          </span>

          <div className="flex gap-[20px] text-white ">
            {video?.likes?.includes(currentUser?._id) ? (
              <button className="bg-transparent border-none flex items-center text-white gap-[10px] cursor-pointer">
                <ThumbUpAltIcon style={{ color: "white" }}></ThumbUpAltIcon>
                {video?.likes?.length}
              </button>
            ) : (
              <button
                className="bg-transparent border-none flex items-center text-white gap-[10px] cursor-pointer"
                onClick={handleLike}
              >
                <ThumbUpOffAltIcon
                  style={{ color: "white" }}
                ></ThumbUpOffAltIcon>
                {video?.likes?.length}
              </button>
            )}

            {video?.dislikes?.includes(currentUser?._id) ? (
              <button className="bg-transparent border-none flex items-center text-white gap-[10px] cursor-pointer">
                <ThumbDownAltIcon style={{ color: "white" }}></ThumbDownAltIcon>{" "}
                {video?.dislikes.length}
              </button>
            ) : (
              <button
                className="bg-transparent border-none flex items-center text-white gap-[10px] cursor-pointer"
                onClick={handleDislike}
              >
                <ThumbDownOffAltIcon
                  style={{ color: "white" }}
                ></ThumbDownOffAltIcon>{" "}
                {video?.dislikes.length}
              </button>
            )}

            <button className="bg-transparent border-none flex items-center text-white gap-[10px] cursor-pointer">
              <IosShareIcon style={{ color: "white" }}></IosShareIcon>
            </button>

            <button className="bg-transparent border-none flex items-center text-white gap-[10px] cursor-pointer">
              <LibraryAddIcon style={{ color: "white" }}></LibraryAddIcon>
            </button>
          </div>
        </div>

        <hr className="border-[0.5px] border-[#202020]"></hr>

        <div id="channel" className="flex justify-between my-[20px]">
          <div className="flex gap-[10px] lg:gap-[30px]">
            <img
              className="w-[36px] h-[36px] rounded-[50%] cursor-pointer"
              src={channel?.img}
              alt="channel"
            ></img>

            <div>
              <div className="text-[18px]">{channel?.name}</div>
              <div className="mt-[3px] text-[12px]">
                {channel?.subscribers} subscribers
              </div>
              {/* <div className="flex-1 mt-[10px] lg:mt-[20px] text-14px">
                {video?.description}
              </div> */}
            </div>
          </div>

          {currentUser?.subscribedUsers?.includes(channel?._id) ? (
            <button
              onClick={handleUnSubscribe}
              className="text-white font-medium bg-red-600 rounded-[5px] py-[10px] px-[20px] h-full border-none cursor-pointer"
            >
              Unsubscribe
            </button>
          ) : (
            <button
              className="text-white font-medium bg-red-600 rounded-[5px] py-[10px] px-[20px] h-full border-none cursor-pointer"
              onClick={handleSubscribe}
            >
              Subscribe
            </button>
          )}
        </div>

        <div className="flex-1 mt-[10px] lg:mt-[20px] text-14px">
          {video?.description}
        </div>

        <Comment videoId={video?._id} setComments={setComments}></Comment>

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
      </div>
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
    </div>
  );
};

export default Video;
