import styled from "styled-components";
import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import "../src/App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Video from "./pages/Video";
import Login from "./components/Login";
import { useState } from "react";

function App() {
  // const [open, setOpen] = useState(false);

  return (
    <div
      id="container"
      className="flex h-screen w-full bg-red-600 overflow-hidden"
    >
      <BrowserRouter>
        <Menu></Menu>
        <div
          id="main-section"
          className={`w-full bg-[#181818] overflow-y-scroll`}
        >
          <Navbar></Navbar>

          <div>
            <Routes>
              <Route path="/">
                <Route index element={<Home type="random" />} />
                <Route path="trends" element={<Home type="trend" />} />
                <Route
                  path="subscriptions"
                  element={<Home type="subscriptions" />}
                />

                <Route path="video">
                  <Route path=":id" element={<Video />}></Route>
                </Route>

                <Route path="login" element={<Login />}></Route>
              </Route>
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
