"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { Product } from "../types";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [quantity, setQuantity] = useState<number>(0);
  const [unit, setUnit] = useState<string>("kg");

  const handleQuantityChange = (amount: number) => {
    setQuantity((prev) => Math.max(0, prev + amount));
  };

  return (
    <Card className="m-4 p-4 flex flex-col items-center">
      <Image
        src={product.image.url}
        alt={product.name}
        width={150}
        height={150}
        className="rounded"
      />
      <CardContent className="flex flex-col items-center">
        <Typography variant="h6" component="div">
          {product.name}
        </Typography>
        <RadioGroup row value={unit} onChange={(e) => setUnit(e.target.value)}>
          <FormControlLabel value="szt" control={<Radio />} label="szt" />
          <FormControlLabel value="kg" control={<Radio />} label="kg" />
        </RadioGroup>
        <div className="flex items-center justify-center">
          <IconButton onClick={() => handleQuantityChange(-1)}>
            <Remove />
          </IconButton>
          <Typography variant="h6" component="div">
            {quantity}
          </Typography>
          <IconButton onClick={() => handleQuantityChange(1)}>
            <Add />
          </IconButton>
        </div>
        <Button variant="contained" className="mt-2">
          Dodaj produkt
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
