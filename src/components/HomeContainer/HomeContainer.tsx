import React from 'react'
import Cards from '../Cards/Cards';
import Carousel from '../carousel/Carousel';
import carouselImagesToPreLoad from '@/helpers/images';
import { getProductsDB } from '@/helpers/product.helper';

const HomeContainer = async () => {
  const products = await getProductsDB();
  return (
    <div>
        <Carousel images={carouselImagesToPreLoad} />
        <Cards products={products} />
    </div>
  )
}

export default HomeContainer;