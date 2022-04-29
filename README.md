This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.



4SQ  fsq3bBmHCj2gzkghwhvraQeqX4fQtebJMqEETBAewJqUEzI=

4SQ  fsq3FntT9k4LxuSsmG0t14jDoEuYP/fXvJYjSo9dlCIVD/4=





Important Note: Foursquare V3 Changes
If you want to use Foursquare V3 version, Foursquare has made a few changes to their API's. You can take a look at https://developer.foursquare.com/docs/migrate-to-newest-places-api-version to learn how to migrate from v2 to v3.

Please note, the next video shows the V2 version (notice the URL we use has v2 in it) but for V3, you need to use the following instructions:



The API URL for Latest Places API has now changed to https://api.foursquare.com/v3/places/nearby from https://api.foursquare.com/v2/venues/search. You can see the docs here

Foursquare Latest Places API now requires Authorization Header which will take in Access Token instead of Client ID and Client Secret so in order to obtain the access token for the authorization header, you need to follow the docs here.

We need to pass Access token as Authorization header over client id and client secret so you no longer need to pass those in. Instead we need to pass like the following code:

const response = await fetch("<URL>",
    {
      "headers": {
        'Authorization': process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY
      }
    }
  );
You can read about it here.

The Access token that you obtain from the previous step now needs to be stored in your project in your .env.local file. Let's create a new environment variable called NEXT_PUBLIC_FOURSQUARE_API_KEY and store it inside .env.local and set the value to be the access token we obtained in the previous step. Please take a look at the docs here. Please note, you will need to access it using process.env.

Lastly, you will no longer get "id" from the response (data.results) but will get fsq_id so we need to transform the data as well

so we need to use the following code:

without async await:

fetch('https://api.foursquare.com/v3/places/nearby?ll=43.65267326999575,-79.39545615725015&query=coffee stores&v=20220105',
    {
      "headers": {
        'Authorization': process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY
      }
    }
  ).then(response => response.json())
  .then(data => {
    const transformedData = data?.results?.map((venue) => {
        return {
            id: venue.fsq_id,
            ...venue
        }
    }) || [];
    console.log(transformedData);
  });
using async await:

const response = await fetch('https://api.foursquare.com/v3/places/nearby?ll=43.65267326999575,-79.39545615725015&query=coffee stores&v=20220105', {
  "headers": {
    'Authorization': process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY
  }
})
const data = await response.json();
 
const transformedData = data?.results?.map((venue) => {
    return {
        id: venue.fsq_id,
        ...venue
    }}) || [];
 
console.log(transformedData)


⭐️ Please note, ALL the V3 changes that will be covered in the upcoming lessons are also listed in this Pull Request so you can see these changes easily if you are curious to see what's coming:

https://github.com/kulkarniankita/discover-coffee-stores/pull/3/files