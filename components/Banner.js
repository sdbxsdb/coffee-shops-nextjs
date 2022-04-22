import React from "react";

const Banner = (props) => {
  return (
    <div className="flex px-12 w-full h-screen items-center">
      <div className="w-1/2">
        <h1 className="text-3xl font-bold">
          <span className="text-white ">Coffee</span>{" "}
          <span className="text-blue-300">Connoisseur</span>
        </h1>
        <p className='bannerSubtext'>Discover your local coffee shops</p>
        <div className="mt-12">
          <button
            className="rounded p-4 bg-blue-400 text-white font-bold hover:ml-2 transition-all duration-300 ease-in-out"
            onClick={props.handleOnClick}
          >
            {props.buttonText}
          </button>
        </div>
      </div>
      <div className='w-1/2 coffeeCupWrapper'>

      </div>
    </div>
  );
};

export default Banner;
