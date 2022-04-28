import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import coffeeStoresData from "../../data/coffee-stores.json";
import Image from "next/image";

export function getStaticProps(staticProps) {
  const params = staticProps.params;
  console.log("PARAMS -", params);

  return {
    props: {
      coffeeStore: coffeeStoresData.find((coffeeStore) => {
        return coffeeStore.id.toString() === params.id; //dyamnamic id
      }),
    },
  };
}

export function getStaticPaths() {
  const paths = coffeeStoresData.map((coffeeStore) => {
    return {
      params: {
        id: coffeeStore.id.toString(),
      },
    };
  });

  return {
    paths: paths,
    fallback: true,
  };
}

const CoffeeStore = (props) => {
  const router = useRouter();
  // console.log("ROUTER -", router);
  // console.log("PRops -", props);

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const { name, address, neighbourhood, imgUrl } = props.coffeeStore;

  const handleUpvoteButton = () => {
    console.log("Upvote button clicked");
  }

  return (
    <>
      <Head>
        <title>{name} | Coffee Store Locations</title>
      </Head>

      <div className="mt-12 ">

        <div className="mb-12 max-w-max hover:-ml-2 transition-all duration-300 ease-in-out active:scale-95">
          <Link href="/">
            <a className="text-blue-500 font-bold flex items-center gap-2 max-w-max">
              <span className='-rotate-[50deg] max-w-max font-bold'>&#8598;</span> 
              Back to home
            </a>
          </Link>
        </div>

        <div>
          <div className="mb-12 flex flex-col md:flex-row justify-between items-center gap-x-4">
            <div className="flex flex-1 flex-col text-center md:text-left">
              <h1 className="text-3xl text-yellow-500 font-bold">{name}</h1>
              <p className="text-blue-500">
                {address} - {neighbourhood}
              </p>
            </div>
            <div className="bg-white mt-4 md:mt-0  w-full md:w-4/12 flex flex-col items-center justify-center bg-opacity-50 p-4 rounded-2xl pointer-events-none hover:bg-opacity-100">
              <button className="p-4 font-bold w-full text-white transition-all duration-300 ease-in-out bg-blue-400 rounded active:border-white active:bg-blue-500 active:scale-95 mb-4 pointer-events-auto" onClick={handleUpvoteButton}>
                Up Vote!
              </button>
              <span className='text-3xl font-bold text-yellow-500'>3</span>
            </div>
          </div>

          <div className="h-[500px] relative">
            <Image
              className="rounded-2xl"
              src={imgUrl}
              alt={name}
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CoffeeStore;
