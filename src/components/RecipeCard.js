import React from "react";
import { Link } from "react-router-dom";
import "./RecipeCard.css";

const RecipeCard = ({ recipe }) => {
  const { label, image, uri } = recipe.recipe;

  return (
    <div className="recipeCard-grid">
      <div className="recipeCard-item">
        <Link to={`/recipe/${encodeURIComponent(uri)}`}>
          <img src={image} className="recipeCard-image" alt={label} />
        </Link>
        <div></div>
      </div>
      <div className="recipeCard-title">
        <p>{label.split(" ").slice(0, 3).join(" ")}</p>
      </div>
    </div>
  );
};

export default RecipeCard;
