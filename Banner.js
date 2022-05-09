import React, { useState, useEffect } from "react";
import Image from "next/image";
import coffeeStores from "../data/coffee-stores.json";



const Banner = (props) => {

  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    window.addEventListener("scroll", listenToScroll);
    return () => window.removeEventListener("scroll", listenToScroll);
  });

  const listenToScroll = () => {
    let heightToHideFrom = 100;
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;

    if (winScroll > heightToHideFrom) {
      isVisible && // to limit setting state only the first time
        setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  };

  return (
    <div className="flex flex-col items-start justify-center w-full h-screen md:flex-row">
      <div className="flex flex-col items-center justify-center w-full h-1/2 md:h-full md:items-start md:w-1/2">
        <h1 className="text-3xl font-bold">
          <span className="text-[#DA9A07]">Coffee</span>{" "}
          <span className="text-blue-400">Connoisseur</span>
        </h1>
        <p className="bannerSubtext">Discover your local coffee shops</p>
        <div className="mt-12">
          <button
            className="p-4 font-bold text-white transition-all duration-300 ease-in-out bg-blue-400 border-2 border-transparent rounded active:border-white active:bg-blue-500 hover:ml-2 active:scale-95"
            onClick={props.handleOnClick}
          >
            {props.buttonText}
          </button>
                  
        </div>
      </div>
      <div className="w-full max-h-[300px] min-w-[200px] md:min-h-screen h-full md:h-1/2 md:w-1/2 relative">
        <Image
          src="/images/Yellow_Cup_of_Coffee_PNG_Clipart-551.png"
          layout="fill"
          objectFit="contain"
          alt=""
        />
      </div>

      {coffeeStores.length > 0 && (
          <div
            className={`${
              isVisible ? "opacity-100" : "opacity-0"
            } absolute bottom-0 left-1/2 transform -translate-x-1/2 py-4 transition-all duration-300 ease-in-out `}
          >
            <h5 className="text-5xl text-yellow-500 animate-bounce">&#x25BC;</h5>
          </div>
      )}
    </div>
  );
};

export default Banner;
