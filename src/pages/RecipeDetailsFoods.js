import React, { useContext } from 'react';
/* import { match } from 'react-router-dom'; */
import RecipesContext from '../context/RecipesContext';

function RecipeDetailsFoods() {
  const { searchedData, loading } = useContext(RecipesContext);
  /*   const id = match.param.id;
  console.log(id); */

  async function fetchSearchDetails(cat) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${cat}`)
      .then((raw) => raw.json())
      .then((data) => setFoodDetails(data))
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    fetchCategoria().then((data) => {
      setCategoriaFood(data.meals);
    });
  }, []);

  return (
    <section>
      Recipe Details Food
      {!loading
        ? searchedData.meals.map((element, index) => (
          <div key={ index }>
            <img
              src={ element.strMealThumb }
              alt={ element.strMeal }
              data-testid="recipe-photo"
              width="50"
              height="50"
            />
            <h1 data-testid="recipe-title">{ element.strMeal }</h1>
          </div>
        ))
        : <p>Loading...</p>}
    </section>
  );
}

export default RecipeDetailsFoods;
