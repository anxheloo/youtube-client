import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Cookies from "js-cookie";

import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../redux/userSlice";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  height: calc(
    100vh - 70px
  ); // we remove 70px which is the header from the height so it goes right in the middle
  // background-color: red;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #202020;
  padding: 20px 30px;
  border: 1px solid black;
  gap: 10px;
  width: 20%;
  min-width: 300px;
`;

const Title = styled.div``;

const SubTitle = styled.div``;

const InputField = styled.input`
  padding: 10px 15px;
  background-color: transparent;
  outline: none;
  border: 1px solid black;
  caret-color: white;
  width: 80%;
  color: white;
`;

const Button = styled.button`
  padding: 7px 15px;
  background-color: transparent;
  color: white;
  border: 1px solid black;
  cursor: pointer;

  &:hover {
    background-color: #26282a;
  }
`;

const Login = () => {
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
    const data = { email: userLogin.email, password: userLogin.password };

    dispatch(userActions.loginStart());

    try {
      const response = await axios.post(
        `http://192.168.0.102:5001/api/auth/login`,
        // `https://youtube-server-pua8.onrender.com/api/auth/login`,
        data,
        {
          // credentials: "include",
          // withCredentials: true,
        }
      );
      console.log(`These is response:`, response);

      if (response.status === 200) {
        dispatch(userActions.loginSuccess(response.data.user));
        localStorage.setItem("token", JSON.stringify(response.data.token));
        //we install it : > npm i js-cookie
        //we import Cookies: import Cookies from "js-cookie";
        // await Cookies.set("access_token", response.data.token);
      } else {
        console.log("Else case: something went wrong!");
      }
    } catch (error) {
      console.log("This is error:", error);
      dispatch(userActions.loginFailure());
    }
  };

  const signInWithGoogle = async () => {
    dispatch(userActions.loginStart());
    try {
      const result = await signInWithPopup(auth, provider);

      console.log("THIS IS result from signInWithPopup:", result);

      // axios.post("http://192.168.1.236:5001/api/auth/google/", data);
      //  const response = await axios.post("http://192.168.0.102:5001/api/auth/google", data)
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

  return (
    <Container>
      <Wrapper>
        <Title>Sign in</Title>
        <SubTitle>to continue to AbdullahTube</SubTitle>

        <InputField
          placeholder="email"
          value={userLogin.email}
          onChange={handleInputEmail}
        ></InputField>
        <InputField
          placeholder="password"
          value={userLogin.password}
          onChange={handleInputPassword}
        ></InputField>

        <Button
          onClick={() => {
            console.log("These are values:", userLogin);
            login();
          }}
        >
          Sign in
        </Button>

        <SubTitle>or</SubTitle>

        <Button onClick={signInWithGoogle}>Sign in with Google</Button>

        <InputField
          placeholder="username"
          value={userRegister.username}
          onChange={handleRegisterUsername}
        ></InputField>
        <InputField
          placeholder="email"
          value={userRegister.email}
          onChange={handleRegisterEmail}
        ></InputField>
        <InputField
          placeholder="password"
          value={userRegister.password}
          onChange={handleRegisterPassword}
        ></InputField>

        <Button
          onClick={() => {
            console.log("These are user register values:", userRegister);
          }}
        >
          Sign up{" "}
        </Button>
      </Wrapper>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: "12px",
          width: "18%",
          padding: "10px 0px",
        }}
      >
        <div>English(USA)</div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "10px",
          }}
        >
          <div>Help</div>
          <div>Privacy</div>
          <div>Terms</div>
        </div>
      </div>
    </Container>
  );
};

export default Login;
