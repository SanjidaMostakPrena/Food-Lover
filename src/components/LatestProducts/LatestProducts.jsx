import React, { useState, useEffect } from 'react';
import Product from '../Product/Product';
import { Link } from 'react-router-dom';

const LatestProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err));
  }, []);

  // Get the first 6 products
  const latest6 = products.slice(0, 6);

  return (
    <div className="p-4">
      {/* Grid of Product Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {latest6.map(product => (
          <Product key={product._id} product={product} />
        ))}
      </div>

      {/* Show All Button below all cards */}
      <div className="flex justify-center mt-6">
        <Link
          to="/AllFood"
          className="btn btn-outline btn-primary"
        >
          Show All
        </Link>
      </div>
    </div>
  );
};

export default LatestProducts;
