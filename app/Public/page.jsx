import React from "react";

const Public = async () => {
  const data = await fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => response.json())
    .then((data) => data);

  return (
    <div className="flex flex-col justify-center items-center p-5">
      <h1>Public Posts</h1>
      {data.slice(0, 10).map((d) => (
        <div
          className="max-w-sm rounded overflow-hidden shadow-lg bg-white m-5"
          key={d.id}
        >
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{d.title}</div>
            <p className="text-gray-700 text-base">{d.body}</p>
          </div>
          <div className="px-6 pt-4 pb-2">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              #photography
            </span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              #travel
            </span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              #winter
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Public;
