import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { buttonClass } from ".";
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
      <div className="flex space-x-4 my-4">
        <Link className={buttonClass} href="/">
          Go to Home
        </Link>
        <Link className={buttonClass} href="/favorites">
          Go to Favorites
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {apiData.map((fake) => (
          <div key={fake.id} className="flex flex-col flex-1 flex-shrink-0 p-8">
            <div className="flex flex-col flex-1 flex-shrink-0 justify-center items-center">
              <Image
                src={fake.urls.full}
                alt={`Image ${fake.id}`}
                width={200}
                height={200}
              />
            </div>

            {isFav(fake.id) ? (
              <button
                onClick={() => removeFav(fake.id)}
                className={`${buttonClass} bg-red-500`}
              >
                Remove from Fav
              </button>
            ) : (
              <button onClick={() => addFav(fake.id)} className={buttonClass}>
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
