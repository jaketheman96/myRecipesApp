import React, { useEffect, useState } from 'react';
import DrinkDoneCard from '../components/DrinkDoneCard';
import FoodDoneCard from '../components/FoodDoneCard';
import Header from '../components/header/Header';

function DoneRecipes() {
  const [infosOfStorage, setInfosOfStorage] = useState([]);
  const [isDrinkOrFood, setIsDrinkOrFood] = useState('all');
  const [filteredInfos, setFilteredInfos] = useState([]);

  useEffect(() => {
    const getInfosOfStorage = () => {
      const getItem = JSON.parse(localStorage.getItem('doneRecipes'));
      if (getItem) {
        setInfosOfStorage(getItem.map((item) => item));
      }
    };
    getInfosOfStorage();
  }, []);

  useEffect(() => {
    const handleConditional = () => {
      if (infosOfStorage.length && isDrinkOrFood === 'foods') {
        setFilteredInfos(infosOfStorage.filter((e) => e.type === 'food'));
      }
      if (infosOfStorage.length && isDrinkOrFood === 'drinks') {
        setFilteredInfos(infosOfStorage.filter((e) => e.type === 'drink'));
      }
      if (infosOfStorage.length && isDrinkOrFood === 'all') {
        setFilteredInfos(infosOfStorage);
      }
    };
    handleConditional();
  }, [isDrinkOrFood, infosOfStorage]);

  useEffect(() => {
    localStorage.removeItem('inProgressInfos');
  }, []);

  return (
    <>
      <Header />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => setIsDrinkOrFood('all') }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ () => setIsDrinkOrFood('foods') }
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => setIsDrinkOrFood('drinks') }
      >
        Drinks
      </button>
      {isDrinkOrFood === 'all' && filteredInfos.map((e, index) => (
        e.type === 'food'
          ? <FoodDoneCard key={ index } cardIndex={ index } />
          : <DrinkDoneCard key={ index } cardIndex={ index } />
      ))}
      { isDrinkOrFood === 'foods' && filteredInfos.map((e, index) => (
        e.type === 'food'
        && <FoodDoneCard key={ index } cardIndex={ index } />
      )) }
      { isDrinkOrFood === 'drinks' && filteredInfos.map((e, index) => (
        e.type === 'drink'
        && <DrinkDoneCard key={ index } cardIndex={ index } />
      )) }
    </>
  );
}

export default DoneRecipes;
