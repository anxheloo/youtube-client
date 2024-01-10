import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";
import { actions } from "../redux/userSlice";

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

    dispatch(actions.loginStart());

    try {
      const response = await axios.post(
        `http://192.168.1.236:5001/api/auth/login`,
        data
      );

      console.log(`These is response:`, response);
      console.log(`These is response.status`, response.status);
      console.log(`These is response.data`, response.data);
      console.log(`These is response.data.user`, response.data.user);

      if (response.status === 200) {
        dispatch(actions.loginSuccess(response.data.user));
      } else {
        console.log("Else case: something went wrong!");
      }
    } catch (error) {
      console.log("This is error:", error);
      dispatch(actions.loginFailure());
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
