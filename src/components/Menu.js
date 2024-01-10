import styled from "styled-components";
import logo from "../images/logo.png";
import HomeIcon from "@mui/icons-material/Home";
import ExploreIcon from "@mui/icons-material/Explore";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import HistoryIcon from "@mui/icons-material/History";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import MovieCreationIcon from "@mui/icons-material/MovieCreation";
import ArticleIcon from "@mui/icons-material/Article";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import SettingsIcon from "@mui/icons-material/Settings";
import FlagIcon from "@mui/icons-material/Flag";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import LightModeIcon from "@mui/icons-material/LightMode";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";

const Container = styled.div`
  flex: 1;
  background-color: #202020;
  height: 100vh;
  color: white;
  font-size: 14px;
  position: sticky;
  top: 0;
`;

const Wrapper = styled.div`
  padding: 18px 26px;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: bold;
  margin-bottom: 25px;
`;

const Img = styled.img`
  height: 25px;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 15px;
  padding: 7.5px 5px;

  &:hover {
    background-color: #26282a;
  }
`;

const HorizontalLine = styled.hr`
  margin: 15px 0px;
  background-color: gray;
  border: 0.5px solid #373737;
`;

const LoginPart = styled.div``;

const SignInButton = styled.button`
  background-color: transparent;
  border: 1px solid #3ea6ff;
  border-radius: 5px;
  color: #3ea6ff;
  font-weight: 500;
  padding: 5px 15px;
  margin-top: 10px;
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  text-transform: uppercase;
`;

const Title = styled.h2`
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 20px;
`;

const Menu = () => {
  return (
    <Container>
      <Wrapper>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <LogoContainer>
            <Img src={logo} alt="website logo"></Img>
            Tube
          </LogoContainer>
        </Link>

        <Item>
          <HomeIcon></HomeIcon>
          Home
        </Item>

        <Link to={"/trends"} style={{ textDecoration: "none", color: "white" }}>
          <Item>
            <ExploreIcon></ExploreIcon>
            Explore
          </Item>
        </Link>

        <Link
          to={"/subscriptions"}
          style={{ textDecoration: "none", color: "white" }}
        >
          <Item>
            <SubscriptionsIcon></SubscriptionsIcon>
            Subscriptions
          </Item>
        </Link>

        <HorizontalLine></HorizontalLine>

        <Item>
          <VideoLibraryIcon></VideoLibraryIcon>
          Library
        </Item>

        <Item>
          <HistoryIcon></HistoryIcon>
          History
        </Item>

        <HorizontalLine></HorizontalLine>

        <Link to={"/login"} style={{ textDecoration: "none", color: "white" }}>
          <LoginPart>
            Sign in to like videos, comment, and subscribe.
            <SignInButton>
              <AccountCircleIcon color="#3ea6ff"></AccountCircleIcon>
              Sign in
            </SignInButton>
          </LoginPart>
        </Link>

        <HorizontalLine></HorizontalLine>

        <Title>BEST OF TUBE</Title>

        <Item>
          <LibraryMusicIcon></LibraryMusicIcon>
          Music
        </Item>

        <Item>
          <SportsBasketballIcon></SportsBasketballIcon>
          Sports
        </Item>

        <Item>
          <SportsEsportsIcon></SportsEsportsIcon>
          Gaming
        </Item>

        <Item>
          <MovieCreationIcon></MovieCreationIcon>
          Movies
        </Item>

        <Item>
          <ArticleIcon></ArticleIcon>
          News
        </Item>
        <Item>
          <LiveTvIcon></LiveTvIcon>
          Live
        </Item>

        <HorizontalLine></HorizontalLine>

        <Item>
          <SettingsIcon></SettingsIcon>
          Settings
        </Item>

        <Item>
          <FlagIcon></FlagIcon>
          Report
        </Item>

        <Item>
          <HelpOutlineIcon></HelpOutlineIcon>
          Help
        </Item>

        <Item>
          <LightModeIcon></LightModeIcon>
          Light Mode
        </Item>
      </Wrapper>
    </Container>
  );
};

export default Menu;
