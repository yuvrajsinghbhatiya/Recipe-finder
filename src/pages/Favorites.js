import React, { useState, useEffect } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import "./Favorites.css";

const Favorites = () => {
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      const storedFavorites =
        JSON.parse(localStorage.getItem("favorites")) || [];
      setFavorites(storedFavorites);
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleRemoveFavorite = (index) => {
    const updatedFavorites = [...favorites];
    updatedFavorites.splice(index, 1);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div className="favourite-container">
      <h1 className="fav-title">Favorite Recipes</h1>
      <div className="favorite-grid">
        {loading ? (
          <div className="loader"></div>
        ) : favorites.length > 0 ? (
          favorites.map((favorite, index) =>
            favorite.recipeDetails ? (
              <div key={index} className="favorite-item">
                {favorite.recipeDetails.image && (
                  <img
                    src={favorite.recipeDetails.image}
                    alt={favorite.recipeDetails.label}
                    className="favorite-image"
                  />
                )}
                <div className="row2">
                  <h2 className="favorite-title">
                    {favorite.recipeDetails.label
                      .split(" ")
                      .slice(0, 2)
                      .join(" ")}
                  </h2>
                  <h2 className="icon">
                    <AiFillCloseCircle
                      className="close-icon"
                      onClick={() => handleRemoveFavorite(index)}
                    />
                  </h2>
                </div>
              </div>
            ) : null
          )
        ) : (
          <p>You have no favorite recipes.</p>
        )}
      </div>
    </div>
  );
};

export default Favorites;
