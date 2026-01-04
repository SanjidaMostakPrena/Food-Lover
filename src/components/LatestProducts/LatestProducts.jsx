import React, { useState, useEffect } from 'react';
import Product from '../Product/Product';
import { Link } from 'react-router-dom';

const LatestProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://food-server-green.vercel.app/products')
      .then(res => res.json())
      .then(data => {
        const sortedData = data.sort((a, b) => b.rating - a.rating);
        setProducts(sortedData);
      })
      .catch(err => console.error(err));
  }, []);


  const top6 = products.slice(0, 6);

  return (
    <div className="p-4 ">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {top6.map(product => (
          <Product key={product._id} product={product} />
        ))}
      </div>
      <div className="flex justify-center mt-6">
        <Link
          to="/AllReviews"
          className="btn btn-outline bg-yellow-500"
        >
          Show All
        </Link>
      </div>
    </div>
  );
};

export default LatestProducts;
