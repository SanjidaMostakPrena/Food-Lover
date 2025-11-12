import React, { useState, useEffect } from 'react';
import Product from '../Product/Product';

const LatestProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err));
  }, []);

  //6 product
  const latest6 = products.slice(0, 6);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
      {latest6.map(product => (
        <Product key={product._id} product={product} />
      ))}
    </div>
  );
};

export default LatestProducts;

