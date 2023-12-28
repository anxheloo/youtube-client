import React from "react";
import styled from "styled-components";

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

const Comments = () => {
  return (
    <Container>
      <ChannelImage src="https://yt3.googleusercontent.com/ytc/AIf8zZTDkajQxPa4sjDOW-c3er1szXkSAO-H9TiF4-8u_Q=s176-c-k-c0x00ffffff-no-rj"></ChannelImage>

      <CommentDetails>
        <CommentName>
          Abdullah <Date>&nbsp;&nbsp;3 days ago</Date>
        </CommentName>
        <CommentText>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </CommentText>
      </CommentDetails>
    </Container>
  );
};

export default Comments;
