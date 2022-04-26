import React from "react";
import Image from "next/image";
import Link from "next/link";

const Card = (props) => {
  return (
    
      <Link href={props.href} passHref>
        <div className="p-4 transition-all duration-300 ease-in-out bg-white bg-opacity-50 cursor-pointer ease rounded-xl hover:bg-opacity-100 drop-shadow-2xl group">
        <div>
          <h2 className="mb-2 text-2xl font-bold text-blue-400 transition-all duration-300 ease-in-out group-hover:text-yellow-500">{props.name}</h2>
          <img className="w-full rounded-2xl" src={props.imgUrl} alt={props.name}  />
        </div>
        </div>

      </Link>
  );
};

export default Card;
