import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Recipes from './pages/Recipes';
import RecipeDetailsFoods from './pages/RecipeDetailsFoods';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import RecipesProvider from './context/RecipesProvider';
import RecipeDetailsDrinks from './pages/RecipeDetailsDrinks';
import RecipeInProgressFood from './pages/RecipeInProgressFood';
import RecipeInProgressDrink from './pages/RecipeInProgressDrink';

function App() {
  return (
    <BrowserRouter>
      <RecipesProvider>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/profile" component={ Profile } />
          <Route exact path="/foods" component={ Recipes } />
          <Route exact path="/drinks" component={ Recipes } />
          <Route exact path="/foods/:id" component={ RecipeDetailsFoods } />
          <Route
            exact
            path="/drinks/:id"
            component={ RecipeDetailsDrinks }
          />
          <Route
            path="/foods/:id/in-progress"
            component={ RecipeInProgressFood }
          />
          <Route
            path="/drinks/:id/in-progress"
            component={ RecipeInProgressDrink }
          />
          <Route path="/done-recipes" component={ DoneRecipes } />
          <Route path="/favorite-recipes" component={ FavoriteRecipes } />
        </Switch>
      </RecipesProvider>
    </BrowserRouter>
  );
}

export default App;
