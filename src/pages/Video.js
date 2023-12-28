import React from "react";
import styled from "styled-components";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import IosShareIcon from "@mui/icons-material/IosShare";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import Comment from "../components/Comment";
import Comments from "../components/Comments";
import Card from "../components/Card";

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
  return (
    <Container>
      <Content>
        <VideoWrapper>
          <iframe
            width={"100%"}
            // maxWidth="100%"
            height="720"
            src="https://www.youtube.com/embed/k3Vfj-e1Ma4"
            title="YOutube video player"
            frameBorder={0}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </VideoWrapper>

        <Title>Video Title</Title>

        <Details>
          <Info>776,886 views May 8, 2022</Info>

          <Buttons>
            <Button>
              <ThumbUpOffAltIcon style={{ color: "white" }}></ThumbUpOffAltIcon>{" "}
              123
            </Button>

            <Button>
              <ThumbDownOffAltIcon
                style={{ color: "white" }}
              ></ThumbDownOffAltIcon>{" "}
              5
            </Button>

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
            <ChannelImage src="https://yt3.googleusercontent.com/ytc/AIf8zZTDkajQxPa4sjDOW-c3er1szXkSAO-H9TiF4-8u_Q=s176-c-k-c0x00ffffff-no-rj"></ChannelImage>
            <ChannelDetails>
              <ChannelName>Abdullah</ChannelName>
              <ChannelCounter>268K subscribers</ChannelCounter>
              <ChannelDescription>
                Lorem 10 ipsum asdfa adjkhdksj jahfkjlahk kjadkjf kjhdah
                kjahskjf hakjfajkh kja
              </ChannelDescription>
            </ChannelDetails>
          </ChannelInfo>

          <SubscribeBtn>Subscribe</SubscribeBtn>
        </Channel>

        <Comment></Comment>

        <Comments></Comments>
        <Comments></Comments>
        <Comments></Comments>
        <Comments></Comments>
        <Comments></Comments>
        <Comments></Comments>
        <Comments></Comments>
        <Comments></Comments>
        <Comments></Comments>
      </Content>
      <Recommendation>
        <Card type="sm"></Card>
        <Card type="sm"></Card>
        <Card type="sm"></Card>
        <Card type="sm"></Card>
        <Card type="sm"></Card>
        <Card type="sm"></Card>
        <Card type="sm"></Card>
        <Card type="sm"></Card>
        <Card type="sm"></Card>
      </Recommendation>
    </Container>
  );
};

export default Video;
