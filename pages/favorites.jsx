import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { buttonClass } from ".";
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
      <div className="flex space-x-4 my-4">
        <Link className={buttonClass} href="/">
          Go to Home
        </Link>
        <Link className={buttonClass} href="/gallery">
          Go to Gallery
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {apiData
          .filter((data) => {
            return favs.includes(data.id);
          })
          .map((fav) => (
            <div
              key={fav.id}
              className="flex flex-col flex-1 flex-shrink-0 p-8"
            >
              <div className="flex flex-col flex-1 flex-shrink-0 justify-center items-center">
                <Image
                  src={fav.urls.full}
                  width={200}
                  height={200}
                  alt={`Fav Image ${fav.id}`}
                />
              </div>
              <button
                onClick={() => {
                  removeFav(fav.id);
                }}
                className={`${buttonClass} + bg-red-500`}
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
