import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import { fetchCoffeeStores } from "../../lib/coffee-stores";
import { StoreContext } from "../_app";
import { isEmpty } from "../../utils/index";

export async function getStaticProps(staticProps) {
  const params = staticProps.params;

  const coffeeStores = await fetchCoffeeStores();
  const findCoffeeStoreById = coffeeStores.find((coffeeStore) => {
    return coffeeStore.fsq_id.toString() === params.id; //dyamnamic id
  });
  return {
    props: {
      coffeeStore: findCoffeeStoreById ? findCoffeeStoreById : {},
    },
  };
}

export async function getStaticPaths() {
  const coffeeStores = await fetchCoffeeStores();
  const paths = coffeeStores.map((coffeeStore) => {
    return {
      params: {
        id: coffeeStore.fsq_id.toString(),
      },
    };
  });

  return {
    paths: paths,
    fallback: true,
  };
}

const CoffeeStore = (initialProps) => {
  const router = useRouter();
  

  const id = router.query.fsq_id;

  const [coffeeStore, setCoffeeStore] = useState(
    initialProps.coffeeStore
  );


  const {
    state: { coffeeStores },
  } = useContext(StoreContext);

  console.log('TEST - ', coffeeStores);
  console.log('STATE - ', state);

  useEffect(() => {
    if (isEmpty(initialProps.coffeeStore)) {
      if (coffeeStores.length > 0) {
        const findCoffeeStoreById = coffeeStores.find((coffeeStore) => {
          return coffeeStore.fsq_id.toString() === id; //dyamnamic id
        });
        setCoffeeStore(findCoffeeStoreById);
      }
    }
  }, [id]);


  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const { name, location, imgUrl } = coffeeStore;



  const handleUpvoteButton = () => {
    console.log("Upvote button clicked");
  };

  return (
    <>
      <Head>
        <title>{name} | Coffee Store Locations</title>
      </Head>

      <div className="mt-12 ">
        <div className="mb-12 max-w-max hover:-ml-2 transition-all duration-300 ease-in-out active:scale-95">
          <Link href="/">
            <a className="text-blue-500 font-bold flex items-center gap-2 max-w-max">
              <span className="-rotate-[50deg] max-w-max font-bold">
                &#8598;
              </span>
              Back to home
            </a>
          </Link>
        </div>

        <div>
          <div className="mb-12 flex flex-col md:flex-row justify-between items-center gap-x-4">
            <div className="flex flex-1 flex-col text-center md:text-left">
              <h1 className="text-3xl text-yellow-500 font-bold">{name || 'test'}</h1>
              <span className="text-blue-500 font-bold">
                {location?.address}
              </span>
              {location?.neighborhood && (
                <span className="text-blue-500 font-bold">
                  {" "}
                  {location?.neighborhood}
                </span>
              )}
            </div>

            <div className="bg-white mt-4 md:mt-0  w-full md:w-4/12 flex flex-col items-center justify-center bg-opacity-50 p-4 rounded-2xl pointer-events-none hover:bg-opacity-100">
              <button
                className="p-4 font-bold w-full text-white transition-all duration-300 ease-in-out bg-blue-400 rounded active:border-white active:bg-blue-500 active:scale-95 mb-4 pointer-events-auto"
                onClick={handleUpvoteButton}
              >
                Up Vote!
              </button>
              <span className="text-3xl font-bold text-yellow-500">3</span>
            </div>
          </div>

          <div className="h-[500px] relative">
            <Image
              className="rounded-2xl"
              src={
                imgUrl ||
                "https://images.unsplash.com/photo-1498804103079-a6351b050096?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2468&q=80"
              }
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
