import React from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

const Dynamic = () => {
  const router = useRouter();

  return (
    <>
    <Head>
       {/* Removing all but the firs letter, making it capital then adding all but the first letter back to the string */}
      <title>{router.query.dynamic.charAt(0).toUpperCase() + router.query.dynamic.slice(1)}</title>
      <meta name="description" content={router.query.dynamic} />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <div>This is a dynamic page route: =  {router.query.dynamic}</div>
    </>
  )
}

export default Dynamic