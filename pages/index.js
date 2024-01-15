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
      <div className="flex items-center mt-8 flex-col">
        <p className="text-3xl font-bold ">Welcome</p>
        <Image src={randomeImage} width={400} height={400} />
        <div>
          <Link className={buttonClass + "mr-6"} href="/gallery">
            Got to Gallery
          </Link>
          <Link className={buttonClass} href="/favorites">
            Got to favorites
          </Link>
        </div>
      </div>
    </>
  );
};

export const buttonClass =
  "mt-16 bg-green-600 text-white p-4 text-center text-lg mx-2 my-4 cursor-pointer";
