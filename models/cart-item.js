// models/cart-item.js

// Import Sequelize
const Sequelize = require('sequelize');

// Import our configured database connection
const sequelize = require('../util/database');


// --------------------------------------------------
// CART ITEM MODEL
// --------------------------------------------------

const CartItem = sequelize.define('cartItem', {

    // Primary key
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    // Number of units of this product in the cart
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
    }

});


// Export the model
module.exports = CartItem;