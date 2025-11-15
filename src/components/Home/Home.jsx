import React, { useEffect } from 'react';
import LatestProducts from '../LatestProducts/LatestProducts.jsx';
import Banner from '../Banner/Banner.jsx';
import LocalFoodTips from '../LocalFoodTips/LocalFoodTips.jsx';
import TopLocalDishes from '../TopLocalDishes/TopLocalDishes.jsx';
const LatestProductsPromise = fetch('https://food-server-green.vercel.app/latestproducts').
  then(res => res.json());
const Home = () => {
  useEffect(() => {
    document.title = "Home";
  }, []);

  return (
    <div>
      <Banner />
      <LatestProducts testProductsPromise={LatestProductsPromise}></LatestProducts>
      <TopLocalDishes />
      <LocalFoodTips />
    </div>
  );
};

export default Home;