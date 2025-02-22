const express = require("express");
const Restaurant = require("../models/Restaurant");
const router = express.Router();

// ✅ Get Restaurant by ID (Fix)
router.get("/restaurants/:id", async (req, res) => {
  try {
    const restaurantData = await Restaurant.findOne({
      "restaurants.restaurant.id": req.params.id,
    });

    if (!restaurantData) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    // Extract the correct restaurant from the array
    const restaurant = restaurantData.restaurants.find(
      (r) => r.restaurant.id === req.params.id
    );

    res.json(restaurant.restaurant); // Send only the restaurant object
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ Get List of Restaurants with Pagination (No Change)
router.get("/restaurants", async (req, res) => {
  try {
    let { page = 1, limit = 10 } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

    const totalRestaurants = await Restaurant.countDocuments();
    const restaurantDocs = await Restaurant.find()
      .skip((page - 1) * limit)
      .limit(limit);

    // Extract only the restaurants array from each document
    const restaurants = restaurantDocs.flatMap((doc) => doc.restaurants);

    res.json({
      total: totalRestaurants,
      page,
      limit,
      totalPages: Math.ceil(totalRestaurants / limit),
      restaurants,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
