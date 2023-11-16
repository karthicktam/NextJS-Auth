import React from "react";

const Denied = () => {
  return (
    <div className="w-full h-screen m-0 flex flex-col justify-center items-center">
      <h1 className="text-red-400 text-5xl mb-5">
        <code>Access Denied</code>
      </h1>
      <hr className="bg-black w-full h-1" />
      <h3 className="text-black mt-5 text-2xl">
        You dont have permission to view this site.
      </h3>
    </div>
  );
};

export default Denied;
