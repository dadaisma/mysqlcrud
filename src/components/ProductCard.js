
import Link from 'next/link'
import axios from "axios";
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
//import {deleteProduct} from '../pages/api/products/[id]'


const ProductCard = ({ product }) => {
  const router = useRouter();
  
  


  return (
    <Link href={`/products/${product.id}`} key={product.id}>
      <div className="flex flex-col">
        <div className="border border-gray-200 shadow-md p-6 text-center">
          <h1 className="font-bold border border-black text-center">{product.name}</h1>
          <p>{product.description}</p>
          <p>€ {product.price}</p>
          <div className="flex justify-between">
            <button className="bg-blue-500 text-white" >
              EDIT
            </button>
            
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;