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

const UploadVideo = ({ setOpen, open }) => {
  const [image, setImage] = useState(undefined);
  const [video, setVideo] = useState(undefined);
  const [imagePercentage, setImagePercentage] = useState(0);
  const [videoPercentage, setVideoPercentage] = useState(0);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
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

  const uploadVideo = async (event) => {
    event.preventDefault();

    console.log(event);

    try {
      const tokenNotParsed = await localStorage.getItem("token");
      const token = await JSON.parse(tokenNotParsed);

      const formData = new FormData();
      formData.append("token", token);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("video", video);
      formData.append("image", image);
      formData.append("videoTags", videoTags.join(","));

      const response = await axios.post(
        "https://youtube-server-pua8.onrender.com/api/videos/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            // Authorization: `Bearer ${tokenParsed}`,
          },
        }
      );

      console.log(response);

      if (response.status === 200) {
        console.log("response ok");
        alert("Uploaded Successful!");
        setOpen(!open);
        // window.location.href = "/";
        // history.push("/");
        // Reload the page after successful upload
        window.location.reload();
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div
      id="container"
      className="bg-[rgba(0,0,0,0.8)] fixed inset-0 w-full h-full z-1000 flex items-center justify-center p-[30px]"
    >
      <div
        id="wrapper"
        className="bg-[#202020] border-none rounded-[5px] w-full h-full max-w-[500px] max-h-[600px] flex flex-col justify-around p-[20px] gap-[25px]"
      >
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
              onClick={() => setOpen(!open)}
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

        <form onSubmit={uploadVideo}>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <label style={{ color: "white" }}>Video:</label>
            <input
              encType="multipart/form-data"
              name="video"
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
              // onChange={(e) => console.log(e)}
            ></input>
          </div>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <input
              required
              type="text"
              placeholder="Title"
              name="title"
              style={{
                backgroundColor: "#202020",
                borderStyle: "solid",
                borderWidth: "1px",
                borderColor: "#000000a7",
                outline: "none",
                color: "white",
                padding: "10px",
              }}
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            ></input>
            <textarea
              required
              name="description"
              placeholder="Description"
              rows={4}
              style={{
                backgroundColor: "#202020",
                borderStyle: "solid",
                borderWidth: "1px",
                borderColor: "#000000a7",
                outline: "none",
                color: "white",
                padding: "10px",
              }}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            ></textarea>
            <input
              required
              name="videoTags"
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

          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <label style={{ color: "white" }}>Image:</label>
            <input
              encType="multipart/form-data"
              name="image"
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
              onChange={(event) => setImage(event.target.files[0])}
              // onChange={(event) => convertToBase64(event)}
              // onChange={(event) => {
              //   convertToBase64("image", event);
              // }}
              // onChange={(event) => handleFileChange(event)}
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
            type="submit"
            // onClick={() => {
            //   uploadVideo();
            //   // const body = {
            //   //   img: img,
            //   //   video: video,
            //   //   videoTitle: videoTitle,
            //   //   videoDescription: videoDescription,
            //   //   videoTags: videoTags,
            //   // };

            //   // console.log("this is body:", body);
            // }}
          >
            Upload
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadVideo;
