const mongoose = require("mongoose");

// Define the schema for restaurant data
const restaurantSchema = new mongoose.Schema({
  results_found: Number,
  results_start: String,
  results_shown: Number,
  restaurants: [
    {
      restaurant: {
        apikey: String,
        id: String,
        name: String,
        url: String,
        location: {
          switch_to_order_menu: Number,
          cuisines: String,
          average_cost_for_two: Number,
          price_range: Number,
          currency: String
        },
        offers: [String], // Empty array in example, assumed to hold strings
        thumb: String,
        user_rating: {
          photos_url: String,
          menu_url: String,
          featured_image: String
        },
        has_online_delivery: Number,
        is_delivering_now: Number,
        deeplink: String,
        has_table_booking: Number,
        events_url: String,
        establishment_types: [String] // Empty array in example, assumed to hold strings
      }
    }
  ]
});

// Create and export the model
const Restaurant = mongoose.model("Restaurant", restaurantSchema);
module.exports = Restaurant;
