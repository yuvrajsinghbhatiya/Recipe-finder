import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Recipe from './components/Recipe';
import RecipeDetail from './pages/RecipeDetail';
import Favorites from './pages/Favorites';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar/>
        <Routes>
          <Route path="/" element={<Recipe />} />
          <Route path="/recipe/:uri" element={<RecipeDetail />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
