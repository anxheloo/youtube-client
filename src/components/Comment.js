import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  margin-top: 20px;
`;

const AvatarImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  cursor: pointer;
`;

const CommentInput = styled.input`
  flex: 1;
  border: none;
  background-color: transparent;
  outline: none;
  caret-color: white;
  color: white;
`;

const Hr = styled.hr`
  border: 0.5px solid #202020;
  width: 100%;
  margin-top: 5px;
`;

const Comment = ({ videoId, setComments }) => {
  const [commentText, setCommentText] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  console.log("this si commentText:", commentText);

  const handleCommentSubmit = async () => {
    // Add your logic to handle comment submission using Axios
    if (commentText.trim() !== "") {
      try {
        const token = localStorage.getItem("token");
        const tokenParsed = JSON.parse(token);

        const res = await axios.post(
          "http://192.168.0.101:5001/api/comments", // Adjust the endpoint
          {
            token: tokenParsed,
            videoId, // Replace with the actual videoId
            description: commentText,
          },
          {
            // credentials: "include",
            withCredentials: true,
          }
        );

        const commentsRes = await axios.get(
          `http://192.168.0.101:5001/api/comments/${videoId}`
        );

        setComments(commentsRes.data.comments);

        // Handle the response, e.g., update the UI with the new comment
        console.log("Comment posted successfully:", res.data);
        // setComments((prevComments) => [...prevComments, res.data.comment]);
        // Reset the comment input
        setCommentText("");
      } catch (error) {
        console.error("Error posting comment:", error);
      }
    } else {
      alert("Please enter something before submiting your comment.");
    }
  };

  const handleKeyPress = (event) => {
    // Check if the Enter key is pressed (key code 13)
    if (event.key === "Enter") {
      // Prevent the default behavior (e.g., form submission)
      event.preventDefault();

      // Trigger the comment submission
      handleCommentSubmit();
    }
  };

  return (
    // <Container>
    //   <AvatarImage src="https://yt3.googleusercontent.com/ytc/AIf8zZTDkajQxPa4sjDOW-c3er1szXkSAO-H9TiF4-8u_Q=s176-c-k-c0x00ffffff-no-rj"></AvatarImage>

    //   <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
    //     <CommentInput
    //       placeholder="Add a comment"
    //       value={commentText}
    //       onChange={(e) => {
    //         setCommentText(e.target.value);
    //       }}
    //       onFocus={() => {
    //         setIsFocused(true);
    //         console.log("Focused: true:", isFocused);
    //       }}
    //       onBlur={() => {
    //         setIsFocused(false);
    //         console.log("Focused: false:", isFocused);
    //       }}
    //       onKeyPress={handleKeyPress}
    //     ></CommentInput>

    //     <Hr></Hr>
    //   </div>
    // </Container>

    <div id="container" className="flex gap-[20px] items-center mt-[20px]">
      <img
        alt="avatar"
        className="w-[36px] h-[36px] rounded-[50%] cursor-pointer"
        src="https://yt3.googleusercontent.com/ytc/AIf8zZTDkajQxPa4sjDOW-c3er1szXkSAO-H9TiF4-8u_Q=s176-c-k-c0x00ffffff-no-rj"
      ></img>
      <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <input
          className="flex-1 border-none bg-transparent outline-none caret-white text-white"
          placeholder="Add a comment"
          value={commentText}
          onChange={(e) => {
            setCommentText(e.target.value);
          }}
          onFocus={() => {
            setIsFocused(true);
            console.log("Focused: true:", isFocused);
          }}
          onBlur={() => {
            setIsFocused(false);
            console.log("Focused: false:", isFocused);
          }}
          onKeyPress={handleKeyPress}
        ></input>

        <hr className="border-[0.5px] border-[#202020] w-[100%] mt-[5px]"></hr>
      </div>
    </div>
  );
};

export default Comment;
