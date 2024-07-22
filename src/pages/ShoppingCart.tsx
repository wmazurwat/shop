"use client";

import React from "react";
import Image from "next/image";
import { Typography, Button } from "@mui/material";
import { CartItem } from "../types";

interface ShoppingCartProps {
  cartItems: CartItem[];
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({ cartItems }) => (
  <div className="m-4 p-4 bg-gray-100 rounded">
    <Typography variant="h6" component="div">
      Twój koszyk
    </Typography>
    {cartItems.map((item, index) => (
      <div
        key={index}
        className="flex justify-between items-center p-2 bg-white rounded mt-2"
      >
        <Image
          src={item.image}
          alt={item.name}
          width={50}
          height={50}
          className="rounded"
        />
        <Typography variant="body1" component="div">
          {item.name}
        </Typography>
        <Typography variant="body1" component="div">
          {item.quantity} {item.unit}
        </Typography>
        <Typography variant="body1" component="div">
          {item.price} zł
        </Typography>
      </div>
    ))}
    <Button variant="contained" color="primary" className="mt-4 w-full">
      Zapłać
    </Button>
  </div>
);

export default ShoppingCart;
