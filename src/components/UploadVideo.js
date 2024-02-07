import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
  background-color: #000000a7;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  background-color: #202020;
  //   border-style: solid;
  //   border-color: black;
  border: none;
  border-radius: 5px;
  width: 400px;
  //   height: 600px;
  max-width: 500px;
  max-height: 700px;
  position: fixed;
  top: 70px;
  //   z-index: 100;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  gap: 25px;
  padding: 20px;
`;

const UploadVideo = ({ setOpen }) => {
  //   useEffect(() => {
  //     function disableScroll() {
  //       // Get the current page scroll position
  //       const scrollTop =
  //         window.pageYOffset || document.documentElement.scrollTop;
  //       const scrollLeft =
  //         window.pageXOffset || document.documentElement.scrollLeft;

  //       // if any scroll is attempted,
  //       // set this to the previous value
  //       window.onscroll = function () {
  //         window.scrollTo(scrollLeft, scrollTop);
  //       };
  //     }

  //     function enableScroll() {
  //       window.onscroll = function () {};
  //     }

  //     // Disable scroll when the component mounts
  //     disableScroll();

  //     // Enable scroll when the component is unmounted or when you want to enable scrolling again
  //     return () => enableScroll();
  //   }, []);

  const [img, setImg] = useState(undefined);
  const [video, setVideo] = useState(undefined);
  const [imagePercentage, setImagePercentage] = useState(0);
  const [videoPercentage, setVideoPercentage] = useState(0);

  const [videoTitle, setVideoTitle] = useState("");
  const [videoDescription, setVideoDescription] = useState("");
  const [videoTags, setVideoTags] = useState([]);

  const inputRef = React.useRef();
  const [source, setSource] = React.useState();

  useEffect(() => {
    // Store the initial overflow value
    const initialOverflow = document.body.style.overflow;

    // Disable scroll when the component mounts
    document.body.style.overflow = "hidden";

    // Enable scroll when the component is unmounted or when you want to enable scrolling again
    return () => {
      document.body.style.overflow = initialOverflow;
    };
  }, []);

  //   const convertToBase64 = async (input, event) => {
  //     const reader = new FileReader();
  //     // await reader.readAsArrayBuffer(img);
  //     // const myVideo = reader.readAsDataURL(video);
  //     // reader.readAsDataURL(img);
  //     reader.readAsDataURL(event.target.files[0]);
  //     console.log("This is e.target.files:", event.target.files);
  //     console.log("This is e.target.files[0]:", event.target.files[0]);
  //     // await reader.readAsBinaryString(img);
  //     // await reader.readAsBinaryString(img);

  //     reader.onload = () => {
  //       if (input === "video") {
  //         setVideo(reader.result);
  //         // setVideo(event.target.files[0]);
  //       } else {
  //         setImg(reader.result);
  //       }
  //       //   setVideo(reader.result);
  //       console.log(
  //         "This is reader Result:",
  //         reader.result,
  //         "This is reader Result.data:",
  //         reader.result.data
  //       );
  //     };

  //     reader.onerror = (error) => console.log(error);
  //   };

  const convertToBase64 = async (data, event) => {
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    // setImg(event.target.files[0]);
    // console.log(video);

    reader.onload = () => {
      setImg(reader.result);
      console.log(video);
    };

    reader.onerror = (error) => console.log(error);
  };

  const handleFileChange = (event) => {
    setVideo(event.target.files[0]);
    console.log(video);
  };

  const uploadVideo = async () => {
    try {
      const token = await localStorage.getItem("token");
      const tokenParsed = await JSON.parse(token);

      const formData = new FormData();
      formData.append("title", videoTitle);
      formData.append("description", videoDescription);
      formData.append("video", video);
      formData.append("image", img);

      const response = await axios.post(
        "http://192.168.0.102:5001/api/videos",
        formData
      );
      console.log(response.data);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <Container>
      <Wrapper>
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <div
            style={{
              // textAlign: "end",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              //   backgroundColor: "red",
            }}
          >
            <button
              onClick={() => setOpen(false)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 30,
                height: 30,
                fontSize: "15px",
                borderRadius: "150px",
                backgroundColor: "black",
                color: "white",
                border: "none",
                cursor: "pointer",
              }}
            >
              X
            </button>
          </div>

          <h1
            style={{
              textAlign: "center",
              color: "white",
              //   backgroundColor: "white",
            }}
          >
            Upload a new video
          </h1>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <label style={{ color: "white" }}>Video:</label>
          <input
            // enctype="multipart/form-data"
            required
            type="file"
            accept="video/*"
            style={{
              color: "white",
              backgroundColor: "#202020",
              borderStyle: "solid",
              borderWidth: "1px",
              borderColor: "#000000a7",
              outline: "none",
              padding: "10px",
            }}
            onChange={(event) => setVideo(event.target.files[0])}
            // onChange={(event) => convertToBase64("video", event)}
            // onChange={(event) => handleFileChange(event)}
          ></input>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <input
            required
            type="text"
            placeholder="Title"
            style={{
              backgroundColor: "#202020",
              borderStyle: "solid",
              borderWidth: "1px",
              borderColor: "#000000a7",
              outline: "none",
              color: "white",
              padding: "10px",
            }}
            value={videoTitle}
            onChange={(event) => setVideoTitle(event.target.value)}
          ></input>
          <textarea
            required
            placeholder="Description"
            rows={8}
            style={{
              backgroundColor: "#202020",
              borderStyle: "solid",
              borderWidth: "1px",
              borderColor: "#000000a7",
              outline: "none",
              color: "white",
              padding: "10px",
            }}
            value={videoDescription}
            onChange={(event) => setVideoDescription(event.target.value)}
          ></textarea>
          <input
            required
            type="text"
            placeholder="Separate tags with commas"
            style={{
              backgroundColor: "#202020",
              borderStyle: "solid",
              borderWidth: "1px",
              borderColor: "#000000a7",
              outline: "none",
              color: "white",
              padding: "10px",
            }}
            value={videoTags}
            onChange={(event) => setVideoTags(event.target.value.split(","))}
          ></input>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <label style={{ color: "white" }}>Image:</label>
          <input
            required
            type="file"
            accept="image/*"
            style={{
              color: "white",
              backgroundColor: "#202020",
              borderStyle: "solid",
              borderWidth: "1px",
              borderColor: "#000000a7",
              outline: "none",
              padding: "10px",
            }}
            onChange={(event) => setImg(event.target.files[0])}
            // onChange={(event) => convertToBase64(event)}
            // onChange={(event) => {
            //   convertToBase64("image", event);
            // }}
          ></input>
        </div>

        <button
          style={{
            backgroundColor: "#202020",
            borderStyle: "solid",
            borderWidth: "1px",
            borderColor: "#000000a7",
            outline: "none",
            color: "white",
            padding: "10px",
            fontWeight: "bold",
          }}
          onClick={() => {
            uploadVideo();
            // const body = {
            //   img: img,
            //   video: video,
            //   videoTitle: videoTitle,
            //   videoDescription: videoDescription,
            //   videoTags: videoTags,
            // };

            // console.log("this is body:", body);
          }}
        >
          Upload
        </button>
      </Wrapper>

      <img
        src={img}
        width={"200px"}
        height={"200px"}
        style={{ position: "absolute", top: 0, left: 0 }}
      ></img>

      <div style={{ position: "absolute", top: "200px", left: 0 }}>
        <video width="320" height="240" controls autoPlay>
          <source src={video} type="video/mp4"></source>
        </video>
      </div>

      {/* <div style={{ position: "absolute", top: "50px", right: "100px" }}>
        <iframe
          width={"100%"}
          // maxWidth="100%"
          height="720"
          src={video}
          // src={currentVideo?.videoUrl}
          //   src="https://www.youtube.com/embed/CCF-xV3RSSs&t=8612s"
          title={"Uploaded Video"}
          frameBorder={0}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div> */}

      {/* <div className="VideoInput">
        <input
          ref={inputRef}
          className="VideoInput_input"
          type="file"
          onChange={handleFileChange}
          accept=".mov,.mp4"
        />
        {!source && <button onClick={handleChoose}>Choose</button>}
        {source && (
          <video
            className="VideoInput_video"
            width="100%"
            height={"300px"}
            controls
            src={source}
          />
        )}
        <div className="VideoInput_footer">{source || "Nothing selectd"}</div>
      </div> */}
    </Container>
  );
};

export default UploadVideo;
