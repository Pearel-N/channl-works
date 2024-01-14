import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Home() {
  return <HomePage />;
}

const HomePage = () => {
  const [randomeImage, setRandomImage] = useState();
  useEffect(() => {
    axios
      .get(
        "https://api.unsplash.com/photos/random?client_id=evIfAYXLhT_Cm7LZaQ-XIjZIGS-LvYLjLzNqlZ6Hh5M"
      )
      .then((data) => {
        setRandomImage(data.data.urls.raw);
      });
  }, []);
  if (!randomeImage) return null;
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: "32px",
          flexDirection: "column",
        }}
      >
        <h1>Welcome</h1>
        <Image src={randomeImage} width={400} height={400} />
        <div>
          <Link style={{ ...buttonCss, marginRight: "16px" }} href="/gallery">
            Got to Gallery
          </Link>
          <Link style={buttonCss} href="/favorites">
            Got to favorites
          </Link>
        </div>
      </div>
    </>
  );
};

export const buttonCss = {
  marginTop: "64px",
  backgroundColor: "#04AA6D",
  color: "white",
  padding: "15px 32px",
  textAlign: "center",
  fontSize: "16px",
  margin: "4px 2px",
  cursor: "pointer",
};
