import React from "react";
import { Link } from "react-router-dom";
import "./RecipeCard.css";

const RecipeCard = ({ recipe }) => {
  const { label, image, uri } = recipe.recipe;

  return (
    <div className="card">
      <Link to={`/recipe/${encodeURIComponent(uri)}`}>
        <div className="card__image-container">
          <img src={image} className="card__image" alt={label} />
        </div>
      </Link>
      <div>
        <h2 className="card__title">{label}</h2>
      </div>
    </div>
  );
};

export default RecipeCard;