import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { buttonCss } from ".";
import Image from "next/image";

const Favorites = () => {
  const [apiData, setApiData] = useState([]);
  const [favs, setFavs] = useState([]);

  useEffect(() => {
    // Fetch favorited IDs from local storage
    const storedFavs = localStorage.getItem("channlWorksFavs") ?? "";
    setFavs(storedFavs.split(","));

    // Fetch data for favorited images from the Unsplash API based on the favorited IDs
    axios
      .get(
        `https://api.unsplash.com/photos?client_id=evIfAYXLhT_Cm7LZaQ-XIjZIGS-LvYLjLzNqlZ6Hh5M`
      )
      .then((data) => {
        setApiData(data.data);
      });
  }, []);

  const removeFav = (id) => {
    const updatedFavs = favs.filter((favId) => favId !== id);
    setFavs(updatedFavs);
    localStorage.setItem("channlWorksFavs", updatedFavs.join(","));
  };

  return (
    <>
      <Link style={{ ...buttonCss, marginRight: "16px" }} href="/">
        Go to Home
      </Link>
      <Link style={buttonCss} href="/gallery">
        Got to Gallery
      </Link>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {apiData
          .filter((data) => {
            return favs.includes(data.id);
          })
          .map((fav) => (
            <div
              key={fav.id}
              style={{
                display: "flex",
                flexDirection: "column",
                flex: "1 0 21%",
                padding: "32px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                }}
              >
                <Image
                  src={fav.urls.full}
                  width={200}
                  height={200}
                  alt={`Fav Image ${fav.id}`}
                />
              </div>
              <p style={{ color: "green", textAlign: "center" }}>
                Marked as Favorite
              </p>
              <button
                onClick={() => {
                  removeFav(fav.id);
                }}
                style={{ ...buttonCss, backgroundColor: "red" }}
              >
                Remove from Fav
              </button>
            </div>
          ))}
      </div>
    </>
  );
};

export default Favorites;
