import React from "react";
import { Link } from "react-router-dom";
import "./RecipeCard.css";

const RecipeCard = ({ recipe }) => {
  const { label, image, uri } = recipe.recipe;

  return (
    <div className="recipeCard-grid">
      <div className="recipeCard-item">
        <Link to={`/recipe/${encodeURIComponent(uri)}`}>
          <div>
            <img src={image} className="recipeCard-image" alt={label} />
          </div>
        </Link>
        <div>
          <h2 className="recipeCard-title">" {label} "</h2>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
