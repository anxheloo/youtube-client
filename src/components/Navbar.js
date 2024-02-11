import React, { useState } from "react";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { VideoCallOutlined } from "@mui/icons-material";
import UploadVideo from "./UploadVideo";

const Container = styled.div`
  background-color: #202020;
  height: 70px;
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  padding: 0px 20px;
  justify-content: flex-end;
  // position: relative;
`;

// const Wrapper = styled.div`
//   max-width: 700px;
//   flex: 1;
//   display: flex;
//   height: 100%;
// `;

const SearchInputContainer = styled.div`
  display: flex;
  max-width: 500px;
  flex: 1;
  border: 1px solid gray;
  border-radius: 20px;
  overflow: hidden;
  align-items: center;
  padding: 0px 10px;

  //We can also use this way to center the searchContainer
  // left: 80%;
  // transform: translateX(-80%);

  //We can also use this way to center the searchContainer
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
`;

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

const SearchIconStyled = styled(SearchIcon)`
  color: white; /* Set the desired color */
`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
`;

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #999;
`;

const Navbar = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [open, setOpen] = useState(false);

  return (
    // <>
    //   {open && <UploadVideo setOpen={setOpen}></UploadVideo>}

    //   <Container>
    //     <SearchInputContainer>
    //       <SearchInput placeholder="Search"></SearchInput>
    //       <SearchIconStyled></SearchIconStyled>
    //     </SearchInputContainer>

    //     {currentUser ? (
    //       <User>
    //         <VideoCallOutlined
    //           style={{ color: "white", fontSize: "35px" }}
    //           onClick={() => {
    //             setOpen(true);
    //             console.log("this is open:", open);
    //           }}
    //         ></VideoCallOutlined>
    //         <Avatar></Avatar>
    //         <div style={{ color: "white" }}>{currentUser.name}</div>
    //       </User>
    //     ) : (
    //       <Link to={"/login"} style={{ textDecoration: "none" }}>
    //         <SignInButton>
    //           <AccountCircleIcon></AccountCircleIcon>
    //           SIGN IN
    //         </SignInButton>
    //       </Link>
    //     )}
    //   </Container>
    // </>

    <>
      {open && <UploadVideo setOpen={setOpen}></UploadVideo>}

      <div
        id="container"
        className="bg-[#202020] h-[70px] flex items-center sticky top-0 px-[20px] justify-end z-10"
      >
        <div
          id="search-input-container"
          className="flex items-center px-[20px] max-w-[500px] flex-1 border border-gray-400 rounded-[20px] overflow-hidden absolute right-0 left-0 m-auto"
        >
          <input
            placeholder="Search"
            className="flex-1 h-[40px] bg-transparent outline-none border-[0px] caret-white text-white"
          ></input>

          <SearchIcon className="text-white cursor-pointer"></SearchIcon>
        </div>

        {currentUser ? (
          <div className="flex items-center gap-[10px] font-medium">
            <VideoCallOutlined
              style={{ color: "white", fontSize: "35px" }}
              onClick={() => {
                setOpen(true);
                console.log("this is open:", open);
              }}
            ></VideoCallOutlined>
            <img className="w-[32px] h-[32px] rounded-[50%] bg-[#999]"></img>
            <div style={{ color: "white" }}>{currentUser.name}</div>
          </div>
        ) : (
          <Link to={"/login"} style={{ textDecoration: "none" }}>
            <button className="bg-transparent border border-[#3ea6ff] rounded-[5px] text-[#3ea6ff] font-medium py-[5px] px-[15px] mt-[10px] flex items-center gap-[5px] cursor-pointer uppercase">
              <AccountCircleIcon></AccountCircleIcon>
              SIGN IN
            </button>
          </Link>
        )}
      </div>
    </>
  );
};

export default Navbar;
