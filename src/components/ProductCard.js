import React from 'react'
import Link from 'next/link'

const ProductCard = ({product}) => {
  return (
    <Link href={`/products/${product.id}`} key={product.id}>
    
    <div  className="border border-gray-200 shadow-md p-6 ">
      <h1 className='font-bold border border-black text-center  '>{product.name}  </h1>
      <p>{product.description}  </p>
      <p>€ {product.price} </p>
    </div>
    
    </Link>
  )
}

export default ProductCard