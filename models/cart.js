// models/cart.js

// Import Sequelize
const Sequelize = require('sequelize');

// Import our configured database connection
const sequelize = require('../util/database');


// --------------------------------------------------
// CART MODEL
// --------------------------------------------------

const Cart = sequelize.define('cart', {

    // Primary key
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }

});


// Export the Sequelize model
module.exports = Cart;


