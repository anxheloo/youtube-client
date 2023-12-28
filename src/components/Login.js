import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  height: calc(
    100vh - 70px
  ); // we remove 70px which is the header from the height so it goes right in the middle
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
  return (
    <Container>
      <Wrapper>
        <Title>Sign in</Title>
        <SubTitle>to continue to AbdullahTube</SubTitle>

        <InputField placeholder="username"></InputField>
        <InputField placeholder="password"></InputField>

        <Button>Sign in</Button>

        <SubTitle>or</SubTitle>

        <InputField placeholder="username"></InputField>
        <InputField placeholder="email"></InputField>
        <InputField placeholder="password"></InputField>

        <Button>Sign up</Button>
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
