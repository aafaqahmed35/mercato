// Import Node's built-in path module
const path = require('path');

// Import Express
const express = require('express');

// Import our Sequelize database connection
const sequelize = require('./util/database');

// Import Sequelize models
const Product = require('./models/products');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');

// Import routes
const adminRoutes = require('./routes/adminRoutes');
const shopRoutes = require('./routes/shopRoutes');

// Import error controller
const errorController = require('./controllers/error');

// Create Express application
const app = express();


// --------------------------------------------------
// VIEW ENGINE
// --------------------------------------------------

app.set('view engine', 'ejs');
app.set('views', 'views');


// --------------------------------------------------
// MIDDLEWARE
// --------------------------------------------------

// Parse form data
app.use(express.urlencoded({ extended: false }));

// Serve static files from /public
app.use(express.static(path.join(__dirname, 'public')));


// --------------------------------------------------
// TEMPORARY USER MIDDLEWARE
// --------------------------------------------------
//
// We have NOT learned authentication yet.
//
// For now, we temporarily fetch User #1 and attach
// that Sequelize User instance to every request:
//
//     req.user
//
// Later, real authentication/session middleware
// will determine the logged-in user instead.
//

app.use(async (req, res, next) => {

    try {

        const user = await User.findByPk(1);

        req.user = user;

        next();

    } catch (err) {

        next(err);

    }

});


// --------------------------------------------------
// ROUTES
// --------------------------------------------------

app.use('/admin', adminRoutes);

app.use(shopRoutes);


// 404 handler must come AFTER all valid routes
app.use(errorController.get404);


// --------------------------------------------------
// SEQUELIZE ASSOCIATIONS
// --------------------------------------------------

// ONE USER → MANY PRODUCTS
//
// Foreign key:
//
// products.userId
//

User.hasMany(Product);

Product.belongsTo(User);


// ONE USER → ONE CART
//
// Foreign key:
//
// carts.userId
//

User.hasOne(Cart);

Cart.belongsTo(User);


// MANY CARTS ↔ MANY PRODUCTS
//
// CartItem acts as the junction model.
//
// cartItems:
//     cartId
//     productId
//     quantity
//

Cart.belongsToMany(Product, {
    through: CartItem
});

Product.belongsToMany(Cart, {
    through: CartItem
});


// --------------------------------------------------
// DATABASE INITIALIZATION
// --------------------------------------------------

sequelize
    .sync()

    .then(async () => {

        /*
            TEMPORARY DEVELOPMENT USER

            We need a User instance so we can practice
            Sequelize associations before implementing
            real authentication.

            findOrCreate() means:

            "Find this user if it exists.
             Otherwise create it."

            This prevents us from creating the same
            development user every time the server starts.
        */

        const [user] = await User.findOrCreate({

            where: {
                email: 'test@mercato.com'
            },

            defaults: {
                name: 'Test User'
            }

        });


        /*
            Ensure the temporary user has a cart.

            getCart() is automatically provided by
            Sequelize because we defined:

                User.hasOne(Cart)
        */

        let cart = await user.getCart();

        if (!cart) {

            await user.createCart();

        }


        // Database is ready.
        // Only now do we start accepting HTTP requests.

        app.listen(3000, () => {

            console.log(
                'Mercato server running on http://localhost:3000'
            );

        });

    })

    .catch(err => {

        console.error(
            'Unable to start Mercato:',
            err
        );

    });



