import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { buttonCss } from ".";
import Image from "next/image";

const Gallery = () => {
  const [apiData, setApiData] = useState([]);
  const [favs, setFavs] = useState([]);

  useEffect(() => {
    // Fetch data from API
    axios
      .get(
        "https://api.unsplash.com/photos?client_id=evIfAYXLhT_Cm7LZaQ-XIjZIGS-LvYLjLzNqlZ6Hh5M"
      )
      .then((data) => {
        setApiData(data.data);
      });

    // Fetch favorited IDs from local storage
    const storedFavs = localStorage.getItem("channlWorksFavs") ?? "";
    setFavs(storedFavs.split(","));
  }, []);

  const addFav = (id) => {
    const updatedFavs = [...favs, id];
    setFavs(updatedFavs);
    localStorage.setItem("channlWorksFavs", updatedFavs.join(","));
  };

  const removeFav = (id) => {
    const updatedFavs = favs.filter((favId) => favId !== id);
    setFavs(updatedFavs);
    localStorage.setItem("channlWorksFavs", updatedFavs.join(","));
  };

  const isFav = (id) => favs.includes(id);

  return (
    <>
      <Link style={buttonCss} href="/">
        Go to Home
      </Link>
      <Link style={buttonCss} href="/favorites">
        Got to favorites
      </Link>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {apiData.map((fake) => (
          <div
            key={fake.id}
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
                src={fake.urls.full}
                width={200}
                height={200}
                alt={`Image ${fake.id}`}
              />
            </div>

            {isFav(fake.id) ? (
              <>
                <p style={{ color: "green", textAlign: "center" }}>
                  Marked as Favorite
                </p>
                <button
                  onClick={() => {
                    removeFav(fake.id);
                  }}
                  style={{ ...buttonCss, backgroundColor: "red" }}
                >
                  Remove from Fav
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  addFav(fake.id);
                }}
                style={buttonCss}
              >
                Add to Fav
              </button>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default Gallery;
