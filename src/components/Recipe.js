import React, { useState} from "react";
import { FiSearch } from "react-icons/fi";
import RecipeCard from "./RecipeCard";
import axios from "axios";
import "./Recipe.css";

const Recipe = () => {
  const [search, setSearch] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false); 

  const APP_ID = "bf8986d8";
  const APP_KEY = "2f82b75d0c7b1061b549c413852d2333";

  const handleSearch = async () => {
    setIsLoading(true); 
    const response = await axios.get(
      `https://api.edamam.com/search?q=${search}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    console.log(response);
    setRecipes(response.data.hits);
    setIsLoading(false); 
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="recipe-container">
      <div className="search-container">
        <input
          type="text"
          id="search-bar"
          placeholder="What do you want to eat?"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <FiSearch className="search-icon" onClick={handleSearch} />
      </div>
      {isLoading && <div className="loader"></div>}
      <br />
      <br />
      <br />
      <div className="recipe-cards">
        {recipes.map((recipe, index) => (
          <RecipeCard key={index} recipe={recipe} />
        ))}
        
      </div>
    </div>
  );
};

export default Recipe;
