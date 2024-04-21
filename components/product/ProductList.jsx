import React from 'react';
import ProductCard from './ProductCard';

const dummyData = [
  {
    id: 1,
    title: "Product 1",
    imageUrl: "https://via.placeholder.com/150",
    price: 1500,
    dailyPrice: 200,
    cycle: "50 days",
    hourlyPrice: 120,
  },
  {
    id: 2,
    title: "Product 2",
    imageUrl: "https://via.placeholder.com/150",
    price: 2000,
    dailyPrice: 250,
    cycle: "60 days",
    hourlyPrice: 150,
  },
  {
    id: 3,
    title: "Product 3",
    imageUrl: "https://via.placeholder.com/150",
    price: 1800,
    dailyPrice: 180,
    cycle: "45 days",
    hourlyPrice: 110,
  },
];

const ProductList = () => {
  return (
    <div>
      {dummyData.map(product => (
        <ProductCard
          key={product.id}
          title={product.title}
          imageUrl={product.imageUrl}
          price={product.price}
          dailyPrice={product.dailyPrice}
          cycle={product.cycle}
          hourlyPrice={product.hourlyPrice}
        />
      ))}
    </div>
  );
};

export default ProductList;
