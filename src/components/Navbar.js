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

const SearchInput = styled.input`
  flex: 1;
  height: 40px;
  background-color: transparent;
  outline: none;
  border: none;
  caret-color: white;
  color: white;
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

  const createVideo = () => {};

  return (
    <>
      {open && <UploadVideo setOpen={setOpen}></UploadVideo>}

      <Container>
        <SearchInputContainer>
          <SearchInput placeholder="Search"></SearchInput>
          <SearchIconStyled></SearchIconStyled>
        </SearchInputContainer>

        {currentUser ? (
          <User>
            <VideoCallOutlined
              style={{ color: "white", fontSize: "35px" }}
              onClick={() => {
                setOpen(true);
                console.log("this is open:", open);
              }}
            ></VideoCallOutlined>
            <Avatar></Avatar>
            <div style={{ color: "white" }}>{currentUser.name}</div>
          </User>
        ) : (
          <Link to={"/login"} style={{ textDecoration: "none" }}>
            <SignInButton>
              <AccountCircleIcon></AccountCircleIcon>
              SIGN IN
            </SignInButton>
          </Link>
        )}
      </Container>
    </>
  );
};

export default Navbar;
