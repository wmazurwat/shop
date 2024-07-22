"use client";

import React, { useState } from "react";
import { Typography } from "@mui/material";
import ProductCard from "./ProductCard";
import ShoppingCart from "./ShoppingCart";
import { Product, CartItem } from "../types";

interface ProductPageProps {
  products: Product[];
}

const ProductPage: React.FC<ProductPageProps> = ({ products }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product, quantity: number, unit: string) => {
    const newItem: CartItem = {
      name: product.name,
      quantity,
      unit,
      price: product.price,
      image: product.image.url,
    };
    setCartItems((prevItems) => [...prevItems, newItem]);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1">
        <div className="w-1/4 p-4 bg-gray-100">
          <ShoppingCart cartItems={cartItems} />
        </div>
        <div className="w-3/4 p-4">
          <Typography variant="h4" component="div" className="m-4">
            Owoce
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products && products.length > 0 ? (
              products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  addToCart={addToCart}
                />
              ))
            ) : (
              <Typography variant="h6" component="div">
                Brak produktów do wyświetlenia
              </Typography>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
