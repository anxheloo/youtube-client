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
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../redux/userSlice";
import { useState } from "react";

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const currentUser = useSelector((state) => state.user.currentUser);
  const darkMode = useSelector((state) => state.user.darkMode);

  const dispatch = useDispatch();

  const toggleDarkMode = () => {
    dispatch(userActions.darkMode());
  };

  console.log("this is isOpen:", isOpen);
  console.log("This is darkMode:", darkMode);

  return (
    // <Container>
    //   <Wrapper>
    //     <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
    //       <LogoContainer>
    //         <Img src={logo} alt="website logo"></Img>
    //         Tube
    //       </LogoContainer>
    //     </Link>

    //     <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
    //       <Item>
    //         <HomeIcon></HomeIcon>
    //         Home
    //       </Item>
    //     </Link>

    //     <Link to={"/trends"} style={{ textDecoration: "none", color: "white" }}>
    //       <Item>
    //         <ExploreIcon></ExploreIcon>
    //         Explore
    //       </Item>
    //     </Link>

    //     <Link
    //       to={"/subscriptions"}
    //       style={{ textDecoration: "none", color: "white" }}
    //     >
    //       <Item>
    //         <SubscriptionsIcon></SubscriptionsIcon>
    //         Subscriptions
    //       </Item>
    //     </Link>

    //     <HorizontalLine></HorizontalLine>

    //     <Item>
    //       <VideoLibraryIcon></VideoLibraryIcon>
    //       Library
    //     </Item>

    //     <Item>
    //       <HistoryIcon></HistoryIcon>
    //       History
    //     </Item>

    //     {!currentUser && (
    //       <>
    //         <HorizontalLine></HorizontalLine>
    //         <Link
    //           to={"/login"}
    //           style={{ textDecoration: "none", color: "white" }}
    //         >
    //           <LoginPart>
    //             Sign in to like videos, comment, and subscribe.
    //             <SignInButton>
    //               <AccountCircleIcon color="#3ea6ff"></AccountCircleIcon>
    //               Sign in
    //             </SignInButton>
    //           </LoginPart>
    //         </Link>
    //       </>
    //     )}

    //     <HorizontalLine></HorizontalLine>

    //     <Title>BEST OF TUBE</Title>

    //     <Item>
    //       <LibraryMusicIcon></LibraryMusicIcon>
    //       Music
    //     </Item>

    //     <Item>
    //       <SportsBasketballIcon></SportsBasketballIcon>
    //       Sports
    //     </Item>

    //     <Item>
    //       <SportsEsportsIcon></SportsEsportsIcon>
    //       Gaming
    //     </Item>

    //     <Item>
    //       <MovieCreationIcon></MovieCreationIcon>
    //       Movies
    //     </Item>

    //     <Item>
    //       <ArticleIcon></ArticleIcon>
    //       News
    //     </Item>
    //     <Item>
    //       <LiveTvIcon></LiveTvIcon>
    //       Live
    //     </Item>

    //     <HorizontalLine></HorizontalLine>

    //     <Item>
    //       <SettingsIcon></SettingsIcon>
    //       Settings
    //     </Item>

    //     <Item>
    //       <FlagIcon></FlagIcon>
    //       Report
    //     </Item>

    //     <Item>
    //       <HelpOutlineIcon></HelpOutlineIcon>
    //       Help
    //     </Item>

    //     <Item>
    //       <LightModeIcon></LightModeIcon>
    //       Light Mode
    //     </Item>
    //   </Wrapper>
    // </Container>

    <div
      id="container"
      className={` ${
        isOpen ? "w-fit" : ""
      }  bg-[#202020] text-[14px] text-white min-h-screen sticky top-[0px] overflow-y-scroll scrollbar`}
    >
      <div
        className={`flex flex-col gap-3  w-full h-full ${
          isOpen ? "px-[7px]" : "px-[18px]"
        } pb-[26px] `}
      >
        <div className="flex gap-5 items-center h-[70px] mb-[15px]">
          <button
            onClick={() => setIsOpen((prevValue) => !prevValue)}
            className={`w-[45px] h-[45px] rounded-[100%] bg-transparent hover:bg-[#2f2f2f]`}
          >
            <MenuIcon></MenuIcon>
          </button>

          {/* <Link to="/" className="no-underline text-inherit ">
            <div
              id="logo-container"
              className="flex items-center gap-[5px] font-bold"
            >
              <img src={logo} alt="website logo" className="h-[25px]"></img>
              Tube
            </div>
          </Link> */}
        </div>

        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <div className="flex justify-center items-center cursor-pointer gap-[15px] py-[7.5px] px-[5px] hover:bg-[#26282a]">
            <HomeIcon
              className={`h-full ${isOpen ? "w-12 h-12" : "w-6 h-6"}`}
            ></HomeIcon>

            <div className={`hidden md:${isOpen ? "hidden" : "flex flex-1"}`}>
              Home
            </div>
          </div>
        </Link>

        <Link to="/trends" style={{ textDecoration: "none", color: "inherit" }}>
          <div className="flex justify-center items-center cursor-pointer gap-[15px] py-[7.5px] px-[5px] hover:bg-[#26282a]">
            <ExploreIcon
              className={`h-full ${isOpen ? "w-12 h-12" : "w-6 h-6"}`}
            ></ExploreIcon>
            <div className={`hidden md:${isOpen ? "hidden" : "flex flex-1"}`}>
              Explore
            </div>
          </div>
        </Link>

        <Link
          to={"/subscriptions"}
          style={{ textDecoration: "none", color: "white" }}
        >
          <div className="flex justify-center items-center cursor-pointer gap-[15px] py-[7.5px] px-[5px] hover:bg-[#26282a]">
            <SubscriptionsIcon
              className={`h-full ${isOpen ? "w-12 h-12" : "w-6 h-6"}`}
            ></SubscriptionsIcon>
            <div className={`hidden md:${isOpen ? "hidden" : "flex flex-1"}`}>
              Subscriptions
            </div>
          </div>
        </Link>
        <hr className="my-[15px] bg-gray-400 border-[0.5px] border-[#373737]"></hr>

        <div
          onClick={toggleDarkMode}
          className="flex justify-center items-center cursor-pointer gap-[15px] py-[7.5px] px-[5px] hover:bg-[#26282a]"
        >
          <LightModeIcon
            className={`h-full ${isOpen ? "w-12 h-12" : "w-6 h-6"}`}
          ></LightModeIcon>
          <div className={`hidden md:${isOpen ? "hidden" : "flex flex-1"}`}>
            Light Mode
          </div>
        </div>

        {/* 

        {!currentUser && (
          <>
            <Link
              to={"/login"}
              style={{ textDecoration: "none", color: "white" }}
            >
              <div>
                Sign in to like videos, comment, and subscribe.
                <button
                  id="sign-in-button"
                  className=" bg-transparent border border-[#3ea6ff] rounded-[5px] text-[#3ea6ff] font-bold py-[5px] px-[15px] mt-[10px] flex items-center gap-[5px] cursor-pointer uppercase"
                >
                  <AccountCircleIcon color="#3ea6ff"></AccountCircleIcon>
                  Sign in
                </button>
              </div>

              <hr className="my-[15px] bg-gray-400 border-[0.5px] border-[#373737]"></hr>
            </Link>
          </>
        )}

        <h2 className="text-[14px] font-medium mb-[20px]">BEST OF TUBE</h2>

        <div className="flex items-center cursor-pointer gap-[15px] py-[7.5px] px-[5px] hover:bg-[#26282a]">
          <LibraryMusicIcon></LibraryMusicIcon>
          <div className={`${isOpen ? "hidden" : "flex-1"} `}>Library</div>
        </div>

        <div className="flex items-center cursor-pointer gap-[15px] py-[7.5px] px-[5px] hover:bg-[#26282a]">
          <SportsBasketballIcon></SportsBasketballIcon>
          <div className={`${isOpen ? "hidden" : "flex-1"} `}>Sports</div>
        </div>

        <div className="flex items-center cursor-pointer gap-[15px] py-[7.5px] px-[5px] hover:bg-[#26282a]">
          <SportsEsportsIcon></SportsEsportsIcon>
          <div className={`${isOpen ? "hidden" : "flex-1"} `}>Gaming</div>
        </div>

        <div className="flex items-center cursor-pointer gap-[15px] py-[7.5px] px-[5px] hover:bg-[#26282a]">
          <MovieCreationIcon></MovieCreationIcon>
          <div className={`${isOpen ? "hidden" : "flex-1"} `}>Movies</div>
        </div>

        <div className="flex items-center cursor-pointer gap-[15px] py-[7.5px] px-[5px] hover:bg-[#26282a]">
          <ArticleIcon></ArticleIcon>
          <div className={`${isOpen ? "hidden" : "flex-1"} `}>News</div>
        </div>

        <div className="flex items-center cursor-pointer gap-[15px] py-[7.5px] px-[5px] hover:bg-[#26282a]">
          <LiveTvIcon></LiveTvIcon>
          <div className={`${isOpen ? "hidden" : "flex-1"} `}>Live</div>
        </div>

        <hr className="my-[15px] bg-gray-400 border-[0.5px] border-[#373737]"></hr>

        <div className="flex items-center cursor-pointer gap-[15px] py-[7.5px] px-[5px] hover:bg-[#26282a]">
          <SettingsIcon></SettingsIcon>
          <div className={`${isOpen ? "hidden" : "flex-1"} `}>Settings</div>
        </div>

        <div className="flex items-center cursor-pointer gap-[15px] py-[7.5px] px-[5px] hover:bg-[#26282a]">
          <FlagIcon></FlagIcon>
          <div className={`${isOpen ? "hidden" : "flex-1"} `}>Report</div>
        </div>

        <div className="flex items-center cursor-pointer gap-[15px] py-[7.5px] px-[5px] hover:bg-[#26282a]">
          <HelpOutlineIcon></HelpOutlineIcon>
          <div className={`${isOpen ? "hidden" : "flex-1"} `}>Help</div>
        </div>

        <div
          onClick={toggleDarkMode}
          className="flex items-center cursor-pointer gap-[15px] py-[7.5px] px-[5px] hover:bg-[#26282a]"
        >
          <LightModeIcon></LightModeIcon>
          <div className={`${isOpen ? "hidden" : "flex-1"} `}>Light Mode</div>
        </div> */}
      </div>
    </div>
  );
};

export default Menu;
