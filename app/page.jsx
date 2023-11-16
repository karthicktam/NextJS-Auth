import React from "react";
import img1 from "../public/pexels-photo-1.jpeg";
import img2 from "../public/pexels-photo-2.jpeg";
import img3 from "../public/pexels-photo-3.jpeg";
import img4 from "../public/pexels-photo-4.jpeg";
import Image from "next/image";

const Home = async () => {
  const data = await fetch("https://jsonplaceholder.typicode.com/photos")
    .then((response) => response.json())
    .then((data) => data);

  const urls = [img1, img2, img3, img4];

  return (
    <div className="flex flex-col items-center p-5">
      <h1>Home</h1>
      {data.slice(0, 10).map((d) => (
        <div
          class="max-w-sm rounded overflow-hidden shadow-lg bg-white m-5"
          key={d.id}
        >
          <Image
            className="w-full"
            src={urls[Math.floor(Math.random() * urls.length)]}
            alt="Sunset in the mountains"
          />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{d.title}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
