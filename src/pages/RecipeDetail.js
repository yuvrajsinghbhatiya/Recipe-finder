import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { LuUtensilsCrossed } from "react-icons/lu";
import axios from "axios";
import "./RecipeDetail.css";

const RecipeDetail = () => {
  const { uri } = useParams();
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.edamam.com/search?r=${encodeURIComponent(
            uri
          )}&app_id=bf8986d8&app_key=2f82b75d0c7b1061b549c413852d2333`
        );
        setRecipeDetails(response.data[0]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching recipe details:", error);
        setLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [uri]);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const isFavoritedInLocalStorage = favorites.some(
      (favorite) => favorite.uri === uri
    );
    setIsFavorited(isFavoritedInLocalStorage);
  }, [uri]);

  const handleToggleFavorite = () => {
    setIsFavorited(!isFavorited);

    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (isFavorited) {
      const updatedFavorites = favorites.filter(
        (favorite) => favorite.uri !== uri
      );
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    } else {
      const newFavorite = { uri, recipeDetails };
      localStorage.setItem(
        "favorites",
        JSON.stringify([...favorites, newFavorite])
      );
    }
  };

  const handleViewRecipe = () => {
    window.open(recipeDetails.url, "_blank");
  }

  return (
    <div className="recipe-detail">
      {loading ? (
        <div className="loader"></div>
      ) : recipeDetails ? (
        <>
          <h1 className="recipe-title">{recipeDetails.label.split(" ").slice(0, 3).join(" ")}</h1>

          <div className="recipe-info-container">
            <div className="info-row">
              <div className="info-item">
                <strong>Meal Type:</strong> {recipeDetails.mealType}
              </div>
              <div className="info-item">
                <strong>Cuisine Type:</strong> {recipeDetails.cuisineType}
              </div>
            </div>
            <img
              src={recipeDetails.image}
              alt={recipeDetails.label}
              className="recipe-image-large"
            />

            <div className="btn-row">
              <button className="fav-button" onClick={handleViewRecipe}>
                View Recipe
              </button>
              <button className="fav-button" onClick={handleToggleFavorite}>
                {isFavorited ? "Remove from Favorites" : "Add to Favorites"}
              </button>
            </div>
            
          </div>

          <div className="nutrients-table">
            <table>
              <thead>
                <tr>
                  <th>Calories</th>
                  <th>Fat</th>
                  <th>Protein</th>
                  <th>Carbs</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{(recipeDetails.calories).toFixed(2)}</td>
                  <td>{(recipeDetails.totalNutrients.FAT.quantity).toFixed(2)}. {recipeDetails.totalNutrients.FAT.unit}</td>
                  <td>{(recipeDetails.totalNutrients.PROCNT.quantity).toFixed(2)} {recipeDetails.totalNutrients.PROCNT.unit}</td>
                  <td>{(recipeDetails.totalNutrients.CHOCDF.quantity.toFixed(2))} {recipeDetails.totalNutrients.CHOCDF.unit}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <hr />
          <div className="recipe-content">
            <div className="ingredients">
              <div className="row1">
                <h2 className="txt">Ingredients</h2>
                <h2 className="icon">
                  <LuUtensilsCrossed />
                </h2>
              </div>
              <ul>
                {recipeDetails.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient.text}</li>
                ))}
              </ul>
            </div>
          </div>
        </>
      ) : (
        <p>No recipe details found for this URI.</p>
      )}
    </div>
  );
};

export default RecipeDetail;
