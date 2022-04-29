//initialise unsplash api
import { createApi } from "unsplash-js";

// on your node server
const unsplashApi = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY,
  //...other fetch options
});

const getUrlForCoffeeStores = (query, latLong, radius) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&radius=${radius}`;
};

const getListofCoffeeStorePhotos = async () => {
  const photos = await unsplashApi.search.getPhotos({
    query: "coffee shops",
    perPage: 10,

  });

  const unsplashResults = photos.response.results;
  return unsplashResults.map((result) => result.urls["regular"]);
};

export const fetchCoffeeStores = async () => {
  const photos = await getListofCoffeeStorePhotos();

  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: process.env.FOURSQUARE_AUTH_TOKEN,
    },
  };

  const response = await fetch(
    getUrlForCoffeeStores("coffee shop", "53.27290,-9.05692", 16000),
    options
  );

  const data = await response.json();

  const transformedData =
    data?.results?.map((venue) => {
      return {
        id: venue.fsq_id,
        ...venue,
      };
    }) || [];

  // console.log("TEST ---", transformedData);

  return data.results.map((result, idx) => {
    return {
      ...result,
      imgUrl: photos[idx],
    };
  });
};
