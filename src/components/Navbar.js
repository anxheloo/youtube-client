import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "../redux/videoSlice";
import { VideoCallOutlined } from "@mui/icons-material";
import UploadVideo from "./UploadVideo";
import axios from "axios";

const Navbar = () => {
  const dispatch = useDispatch();
  const searchVideosList = useSelector((state) => state.video.searchVideosList);
  const currentUser = useSelector((state) => state.user.currentUser);
  const [open, setOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const clearSearch = () => {
    setSearchInput("");
    dispatch(actions.search(null)); // Dispatch action to reset search state
  };

  const search = async () => {
    console.log(";Inside Search");

    if (searchInput.trim() === "") {
      clearSearch(); // Clear search input and reset search state
      return;
    }

    try {
      const searchRes = await axios.get(
        // `https://youtube-server-pua8.onrender.com/api/videos/${path}`
        `https://youtube-server-pua8.onrender.com/api/videos/search?q=${searchInput}`
      );

      if (searchRes.status === 200) {
        console.log("This are videos:", searchRes.data);
        dispatch(actions.search(searchRes.data));
      } else {
        alert("Video not found!");
        setSearchInput("");
      }
    } catch (error) {
      alert("Error while searching!");
    }
  };

  return (
    <div
      id="container"
      className="bg-[#202020] h-[70px] flex items-center sticky  top-0 px-[10px] lg:px-[20px] justify-between gap-[15px] lg:justify-end z-10"
    >
      {open && <UploadVideo open setOpen={setOpen}></UploadVideo>}
      <div
        id="search-input-container"
        className="flex justify-between items-center px-[10px] lg:px-[20px] w-full max-w-[500px] flex-1 border border-gray-400 rounded-[20px] overflow-hidden  m-auto"
        // lg:absolute lg:right-0 lg:left-0
      >
        <input
          placeholder="Search"
          className="w-[90%] h-[40px] bg-transparent outline-none border-[0px] caret-white text-white"
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
        ></input>

        <SearchIcon
          onClick={search}
          className="text-white cursor-pointer "
        ></SearchIcon>
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
          <img
            alt="img"
            className="w-[32px] h-[32px] rounded-[50%] bg-[#999]"
          ></img>
          <div style={{ color: "white" }}>{currentUser.name}</div>
        </div>
      ) : (
        <Link to={"/login"} style={{ textDecoration: "none" }}>
          <button className="bg-transparent border border-[#3ea6ff] rounded-[5px] h-[40px] text-[#3ea6ff] font-medium py-[5px] px-[10px] lg:px-[15px] flex items-center gap-[5px] cursor-pointer uppercase">
            <AccountCircleIcon></AccountCircleIcon>
            SIGN IN
          </button>
        </Link>
      )}
    </div>
  );
};

export default Navbar;
