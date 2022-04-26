import React from 'react'
import { useRouter } from 'next/router';
import Link from 'next/link';

const CoffeeStore = () => {
  const router = useRouter();
  console.log('ROUTER -', router);
  return (
    <div>CoffeeStore {router.query.id}
      <Link href='/'>Back to Home</Link>
    </div>
  )
}

export default CoffeeStore