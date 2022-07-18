import React from 'react';
import SearchTopBtn from '../components/SearchTopBtn';
import Footer from '../components/Footer';
import FoodCard from '../components/FoodCard';
import DrinkCard from '../components/DrinkCard';

function Recipes() {
  /* const history = useHistory(); */
  return (
    <header>
      <SearchTopBtn />
      {/* { history.location.pathname === '/foods' ? <FoodCard /> : <DrinkCard /> } */}
      <DrinkCard />
      <FoodCard />
      <Footer />
    </header>
  );
}

export default Recipes;
