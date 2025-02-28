import React, { useState } from "react";
import axios from "axios";
import "../styles.css"; // Ensure styles are applied

const LocationSearch = () => {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [range, setRange] = useState("3");
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchRestaurants = () => {
    if (!latitude || !longitude) {
      setError("⚠️ Please enter both latitude and longitude.");
      return;
    }
    setError("");
    setLoading(true);

    axios
      .get(`https://zomatowebapp-production.up.railway.app/api/restaurants/nearby?lat=${latitude}&lng=${longitude}&range=${range}`)
      .then((res) => {
        setRestaurants(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("⚠️ No restaurants found in this range.");
        setLoading(false);
      });
  };

  return (
    <div className="location-search-container">
      {/* Hero Section */}
      <div className="hero">
        <h1>📍 Find Restaurants Near You</h1>
        <p>Enter your location to discover the best places to eat!</p>
      </div>

      {/* Input Fields */}
      <div className="search-box">
        <input
          type="text"
          placeholder="📌 Latitude"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
          className="location-input"
        />
        <input
          type="text"
          placeholder="📌 Longitude"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
          className="location-input"
        />
        <select
          value={range}
          onChange={(e) => setRange(e.target.value)}
          className="range-selector"
        >
          <option value="2">2 km</option>
          <option value="5">5 km</option>
          <option value="10">10 km</option>
        </select>
        <button onClick={searchRestaurants} className="search-button">🔍 Search</button>
      </div>

      {/* Error Message */}
      {error && <p className="error">{error}</p>}

      {/* Loading State */}
      {loading && <div className="loader"></div>}

      {/* Restaurant List */}
      <div className="restaurant-grid">
        {restaurants.length > 0 &&
          restaurants.map((restaurant) => (
            <div key={restaurant.RestaurantId} className="restaurant-card">
              <img
                src={restaurant.FeaturedImage || "https://via.placeholder.com/150"}
                alt={restaurant.Name}
                className="restaurant-image"
              />
              <h3>{restaurant.Name}</h3>
              <p>{restaurant.Cuisines}</p>
              <p>⭐ {restaurant.Rating} ({restaurant.Votes} votes)</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default LocationSearch;
