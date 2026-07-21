const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    'mercato',
    'root',
    'Aafaq#21',
    {
        dialect: 'mysql',
        host: 'localhost'
    }
);

module.exports = sequelize;