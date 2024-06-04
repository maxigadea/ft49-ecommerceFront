import { IProduct } from "@/types";
import React from "react";
import Card from "../Card/Card";
import Link from "next/link";

const Cards = ({ products }: { products: IProduct[] }) => {
  return (
    <div className="flex justify-center items-center flex-wrap">
      {products &&
        products?.map((product) => {
          return (
            <Link key={product.id} href={`/product/${product.id}`}>
                <Card key={product.id} {...product} />
            </Link>
            ) 
        })}
    </div>
  );
};

export default Cards;
