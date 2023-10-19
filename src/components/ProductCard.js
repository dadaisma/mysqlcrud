
import Link from 'next/link'
import axios from "axios";
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
//import {deleteProduct} from '../pages/api/products/[id]'


const ProductCard = ({ product }) => {
  const router = useRouter();
  
  


  return (
    <Link href={`/products/${product.id}`} key={product.id}>
      <div className='bg-gray-100'>
      <div className="bg-gray-300  shadow border-2 rounded grid grid-cols-1 md:grid-cols-4 justify-center text-center ml-10 mr-10  items-center ">
          <p className='font-bold text-xl'>{product.name}</p>
          <p className='italic'>{product.description}</p>
          <p className=''>€ {product.price}</p>
          
          <div className="flex items-center justify-center mt-3 mb-3">
      <button className="bg-blue-500 text-white rounded-lg w-1/2">
        View/Edit
      </button>
    </div>
         
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;