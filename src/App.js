import styled from "styled-components";
import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import "../src/App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Video from "./pages/Video";
import Login from "./components/Login";

const Container = styled.div`
  display: flex;
  height: auto;
`;

const Main = styled.div`
  flex: 7;
  background-color: #181818;
`;

const Wrapper = styled.div``;

function App() {
  return (
    <Container>
      <BrowserRouter>
        <Menu></Menu>
        <Main>
          <Navbar></Navbar>

          <Wrapper>
            <Routes>
              <Route path="/">
                <Route index element={<Home />} />

                <Route path="video">
                  <Route path=":id" element={<Video />}></Route>
                </Route>

                <Route path="login" element={<Login />}></Route>
              </Route>
            </Routes>
          </Wrapper>
        </Main>
      </BrowserRouter>
    </Container>
  );
}

export default App;
