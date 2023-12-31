import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  width: ${(props) => props.type !== "sm" && "340px"};
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

const Card = ({ type }) => {
  return (
    <Link to="/video/test" style={{ textDecoration: "none" }}>
      <Container type={type}>
        <Image
          type={type}
          src="https://i.ytimg.com/vi/PcxN5y-NbGo/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDa5hZHfU-B1rKXZDlhoadu7nhSDw"
        ></Image>
        <Details type={type}>
          <ChannelImage
            type={type}
            src="https://yt3.googleusercontent.com/ytc/AIf8zZTDkajQxPa4sjDOW-c3er1szXkSAO-H9TiF4-8u_Q=s176-c-k-c0x00ffffff-no-rj"
          ></ChannelImage>
          <Texts>
            <Title>Title</Title>
            <ChannelName>freeCodeCamp.org</ChannelName>
            <Info>1.3M views 1 year ago</Info>
          </Texts>
        </Details>
      </Container>
    </Link>
  );
};

export default Card;
