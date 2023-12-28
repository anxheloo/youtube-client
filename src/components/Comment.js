import React from "react";
import styled from "styled-components";

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
`;

const Hr = styled.hr`
  border: 0.5px solid #202020;
  width: 100%;
  margin-top: 5px;
`;

const Comment = () => {
  return (
    <Container>
      <AvatarImage src="https://yt3.googleusercontent.com/ytc/AIf8zZTDkajQxPa4sjDOW-c3er1szXkSAO-H9TiF4-8u_Q=s176-c-k-c0x00ffffff-no-rj"></AvatarImage>

      <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <CommentInput placeholder="Add a comment"></CommentInput>

        <Hr></Hr>
      </div>
    </Container>
  );
};

export default Comment;
