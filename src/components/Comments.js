import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { format, render, cancel, register } from "timeago.js";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../redux/userSlice";
import axios from "axios";

const Container = styled.div`
  display: flex;
  gap: 20px;
  margin: 40px 0px;
`;

const ChannelImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  cursor: pointer;
`;

const CommentDetails = styled.div`
  flex: 1;
`;

const CommentName = styled.div`
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 10px;
`;

const Date = styled.span`
  font-size: 10px;
`;

const CommentText = styled.div`
  font-size: 12px;
`;

const Comments = ({ comment }) => {
  const [userById, setUserById] = useState();

  useEffect(() => {
    const getUserById = async () => {
      try {
        const res = await axios.get(
          `http://192.168.0.100:5001/api/users/${comment.userId}`
        );

        if (res.status === 200) {
          setUserById(res.data.userWithoutPassword);
          console.log("this is res.data from comments:", res.data);
        }
      } catch (error) {
        console.log("This is error:", error);
      }
    };

    getUserById();
  }, [comment.userId]);

  const { userId, description, videoId, createdAt } = comment;

  return (
    <Container>
      <ChannelImage src={userById?.img}></ChannelImage>

      <CommentDetails>
        <CommentName>
          {userById?.name} <Date>&nbsp;&nbsp;{format(createdAt)}</Date>
        </CommentName>
        <CommentText>{description}</CommentText>
      </CommentDetails>
    </Container>
  );
};

export default Comments;
