import React from 'react';
import LatestProducts from '../LatestProducts/LatestProducts.jsx';
import Banner from '../Banner/Banner.jsx';
const LatestProductsPromise = fetch('http://localhost:3000/latestproducts').
then(res => res.json());
const Home = () => {
    return (
        <div>
               <Banner />
            <LatestProducts testProductsPromise={LatestProductsPromise}></LatestProducts>
        </div>
    );
};

export default Home;