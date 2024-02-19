import React, { useState, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../redux/userSlice";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";

const Login = () => {
  const navigate = useNavigate();

  const emailInputRef = useRef(null);

  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });

  const [userRegister, setUserRegister] = useState({
    username: "",
    email: "",
    password: "",
  });

  const currentUser = useSelector((state) => state.user.currentUser);
  const loading = useSelector((state) => state.user.loading);
  const error = useSelector((state) => state.user.error);
  const dispatch = useDispatch();

  const handleInputEmail = (event) => {
    setUserLogin((prevUserLogin) => ({
      ...prevUserLogin,
      email: event.target.value,
    }));
  };

  const handleInputPassword = (event) => {
    setUserLogin((prevUserLogin) => ({
      ...prevUserLogin,
      password: event.target.value,
    }));
  };

  const handleRegisterUsername = (event) => {
    setUserRegister((prevUserLogin) => ({
      ...prevUserLogin,
      username: event.target.value,
    }));
  };

  const handleRegisterEmail = (event) => {
    setUserRegister((prevUserLogin) => ({
      ...prevUserLogin,
      email: event.target.value,
    }));
  };

  const handleRegisterPassword = (event) => {
    setUserRegister((prevUserLogin) => ({
      ...prevUserLogin,
      password: event.target.value,
    }));
  };

  const login = async () => {
    dispatch(userActions.loginStart());

    try {
      const data = { email: userLogin.email, password: userLogin.password };

      const response = await axios.post(
        `https://youtube-server-pua8.onrender.com/api/auth/login`,
        // `https://youtube-server-pua8.onrender.com/api/auth/login`,
        data,
        {
          // credentials: "include",
          // withCredentials: true,
        }
      );
      console.log(`These is response:`, response);

      if (response.status === 401 || response.status === 404) {
        alert("Wrong credentials, provide a valid email or password!");
      } else if (response.status === 200) {
        dispatch(userActions.loginSuccess(response.data.user));
        alert("Login Successful!");
        localStorage.setItem("token", JSON.stringify(response.data.token));
        //we install it : > npm i js-cookie
        //we import Cookies: import Cookies from "js-cookie";
        // await Cookies.set("access_token", response.data.token);
        navigate("/");
      } else {
        alert("Internal Error, try again later!");
      }
    } catch (error) {
      console.log("Error:", error);
      console.error("Caught error:", error); // Log caught error
      dispatch(userActions.loginFailure());
    }
  };

  const signInWithGoogle = async () => {
    dispatch(userActions.loginStart());
    try {
      const result = await signInWithPopup(auth, provider);

      console.log("THIS IS result from signInWithPopup:", result);

      // axios.post("http://192.168.1.236:5001/api/auth/google/", data);
      //  const response = await axios.post("https://youtube-server-pua8.onrender.com/api/auth/google", data)
      const response = await axios.post(
        "https://youtube-server-pua8.onrender.com/api/auth/google",
        {
          name: result.user.displayName,
          email: result.user.email,
          img: result.user.photoURL,
        },
        {
          withCredentials: true,
        }
      );

      console.log("this is response:", response);
      console.log("this is response.status:", response.status);

      if (response.status === 200) {
        dispatch(userActions.loginSuccess(response.data.user));
        localStorage.setItem("token", JSON.stringify(response.data.token));
      } else {
        console.log(
          "Response not 200:",
          "SOmething went wrong with response:",
          "this is response.status:",
          response.status
        );
      }
    } catch (error) {
      console.error("Error during Google sign-in:", error);
      dispatch(userActions.loginFailure());
    }
  };

  const registerUser = async () => {
    const data = {
      username: userRegister.username,
      email: userRegister.email,
      password: userRegister.password,
    };

    try {
      const response = await axios.post(
        `https://youtube-server-pua8.onrender.com/api/auth/signup`,
        // `https://youtube-server-pua8.onrender.com/api/auth/login`,
        data,
        {
          // credentials: "include",
          // withCredentials: true,
        }
      );

      if (response.status === 401) {
        alert("User already exists, please log in!");
      }

      if (response.status === 201) {
        alert("Register Successful, Please Log-in!");
        setUserRegister({
          username: "",
          email: "",
          password: "",
        });

        emailInputRef.current.focus();
      }
    } catch (error) {
      alert("Error registering user!");
      console.log("Error registering user!,", error);
    }
  };

  return (
    <div
      id="container"
      className="flex flex-col justify-center items-center text-white h-full pt-[30px] px-[20px]"
    >
      <div className="flex flex-col  items-center bg-[#202020] py-[20px] px-[30px] border border-black gap-[10px] w-full max-w-[400px]">
        <div>Sign in</div>
        <div>to continue to video app</div>
        <input
          ref={emailInputRef}
          type="email"
          className="py-[10px] px-[15px] bg-transparent outline-none border border-black w-[80%] text-white"
          placeholder="email"
          value={userLogin.email}
          onChange={handleInputEmail}
        ></input>
        <input
          type="password"
          className="py-[10px] px-[15px] bg-transparent outline-none border border-black w-[80%] text-white"
          placeholder="password"
          value={userLogin.password}
          onChange={handleInputPassword}
        ></input>
        <button
          className="py-[7px] px-[15px] bg-transparent text-white border border-black cursor-pointer hover:bg-[#26282a]"
          onClick={() => {
            login();
          }}
        >
          Sign in
        </button>
        <div>or</div>
        <button
          className="py-[7px] px-[15px] bg-transparent text-white border border-black cursor-pointer hover:bg-[#26282a]"
          onClick={signInWithGoogle}
        >
          Sign in with Google
        </button>

        <input
          className="py-[10px] px-[15px] bg-transparent outline-none border border-black w-[80%] text-white"
          placeholder="username"
          value={userRegister.username}
          onChange={handleRegisterUsername}
        ></input>
        <input
          className="py-[10px] px-[15px] bg-transparent outline-none border border-black w-[80%] text-white"
          placeholder="email"
          value={userRegister.email}
          onChange={handleRegisterEmail}
        ></input>
        <input
          type="password"
          className="py-[10px] px-[15px] bg-transparent outline-none border border-black w-[80%] text-white"
          placeholder="password"
          value={userRegister.password}
          onChange={handleRegisterPassword}
        ></input>
        <button
          className="py-[7px] px-[15px] bg-transparent text-white border border-black cursor-pointer hover:bg-[#26282a]"
          onClick={registerUser}
        >
          Sign up{" "}
        </button>
      </div>

      <div className="flex justify-between text-[12px] w-[18%] py-[10px]">
        <div>English(USA)</div>

        <div className="flex justify-between gap-[10px]">
          <div>Help</div>
          <div>Privacy</div>
          <div>Terms</div>
        </div>
      </div>
    </div>
  );
};

export default Login;
