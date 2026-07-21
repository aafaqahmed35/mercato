// routes/shopRoutes.js

const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();


// --------------------------------------------------
// SHOP HOME
// --------------------------------------------------

router.get(
    '/',
    shopController.getIndex
);


// --------------------------------------------------
// PRODUCT DETAILS
// --------------------------------------------------

router.get(
    '/products/:productId',
    shopController.getProduct
);


// --------------------------------------------------
// CART
// --------------------------------------------------

// Display the current user's cart
router.get(
    '/cart',
    shopController.getCart
);


// Add a product to the cart
router.post(
    '/cart',
    shopController.postCart
);


// Remove a product from the cart
router.post(
    '/cart-delete-item/:productId',
    shopController.removeProductFromCart
);


module.exports = router;


