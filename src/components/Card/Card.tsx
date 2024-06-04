import categoriesToPreLoad from '@/helpers/category';
import { IProduct } from '@/types'
import React from 'react'

const Card:React.FC<IProduct> = ({name, price, image, description, stock, categoryId}) => {
  return (
    <div className='flex flex-col items-center justify-between bg-slate-400 text-black rounded-xl p-4 border gap-2 m-4 max-w-[300px] h-[300px] max-h-[300px] shadow'>
      <img className='w-full max-w-[100px] h-full max-h-[150px] rounded-xl' src={image} alt="Imagen del producto" />
      <h2>{name}</h2>
      <p>${price}</p>     
      <p>Category: {categoriesToPreLoad[categoryId].name}</p>
      <p>Stock: {stock}</p>
    </div>
  )
}

export default Card;