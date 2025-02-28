import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles.css";

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios.get(`https://zomatowebapp-production.up.railway.app/api/restaurants?page=${page}`)
      .then(res => {
        setRestaurants(res.data.restaurants);
        setTotalPages(res.data.totalPages);
      })
      .catch(err => console.log(err));
  }, [page]);

  const handleSearch = () => {
    axios.get(`https://zomatowebapp-production.up.railway.app/api/restaurants/search?name=${searchQuery}`)
      .then(res => setRestaurants(res.data.restaurants))
      .catch(err => console.log(err));
  };

  return (
    <div className="container">
      {/* Page Title */}
      <h2 className="page-title">🍴 Explore Top Restaurants Near You</h2>
      <p className="sub-heading">Find the best places to eat, from fine dining to casual eateries!</p>

      {/* Search Bar */}
      <div className="search-container">
        <input 
          type="text" 
          placeholder="Search by restaurant name, cuisine, or location..." 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)} 
        />
        <button onClick={handleSearch}>🔍 Search</button>
      </div>

      {/* Restaurant Grid */}
      <div className="restaurant-grid">
        {restaurants.length > 0 ? (
          restaurants.map((restaurant) => (
            <div key={restaurant.RestaurantId} className="restaurant-card">
              <img 
                src={restaurant.FeaturedImage || "https://via.placeholder.com/300"} 
                alt={restaurant.Name} 
              />
              <h3><Link to={`/restaurant/${restaurant.RestaurantId}`}>{restaurant.Name}</Link></h3>
              <p><strong>Cuisine:</strong> {restaurant.Cuisines}</p>
              <p><strong>Rating:</strong> ⭐ {restaurant.Rating} ({restaurant.Votes} votes)</p>
              <p><strong>Location:</strong> 📍 {restaurant.Location.Address}, {restaurant.Location.City}</p>
            </div>
          ))
        ) : (
          <p>No restaurants found for your search. Please try again with a different query.</p>
        )}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button 
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))} 
          disabled={page === 1}
        >
          Previous
        </button>
        <span>Page {page} of {totalPages}</span>
        <button 
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))} 
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default RestaurantList;
