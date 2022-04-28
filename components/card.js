import React from "react";
import Image from "next/image";
import Link from "next/link";

const Card = (props) => {
  return (
    
      <Link href={props.href} passHref>
        <div className="flex flex-col items-stretch p-4 transition-all duration-300 ease-in-out bg-white bg-opacity-50 cursor-pointer ease rounded-xl hover:bg-opacity-100 drop-shadow-2xl group ">
        
        
          <div className='flex-1 '>
            <h2 className="mb-2 text-2xl font-bold text-blue-400 transition-all duration-300 ease-in-out group-hover:text-yellow-500">{props.name}</h2>
          </div>
          
          <div className='w-full flex justify-center'>
            <div className='h-[160px] md:max-w-[260px] w-full relative flex justify-center'>
              <Image className="rounded-2xl" src={props.imgUrl} alt={props.name} layout='fill' objectFit='cover' />
            </div>
          </div>
          
        
        </div>

      </Link>
  );
};

export default Card;
