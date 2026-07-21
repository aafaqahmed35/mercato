// models/user.js

// Import Sequelize
const Sequelize = require('sequelize');

// Import our configured Sequelize database connection
const sequelize = require('../util/database');


// --------------------------------------------------
// USER MODEL
// --------------------------------------------------

const User = sequelize.define('user', {

    // Primary key
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },


    // User's display name
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },


    // User's email address
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }

});


// Export the model
module.exports = User;