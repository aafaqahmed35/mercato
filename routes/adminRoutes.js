// routes/adminRoutes.js

const express = require('express');

const adminController = require(
    '../controllers/adminController'
);

const router = express.Router();


// --------------------------------------------------
// ADD PRODUCT
// --------------------------------------------------

// Display Add Product form
router.get(
    '/add-product',
    adminController.getAddProduct
);


// Create product
router.post(
    '/add-product',
    adminController.postAddProduct
);


// --------------------------------------------------
// EDIT PRODUCT
// --------------------------------------------------

// Display Edit Product form
router.get(
    '/edit-product/:productId',
    adminController.getEditProduct
);


// Save edited product
router.post(
    '/edit-product',
    adminController.postEditProduct
);


// --------------------------------------------------
// DELETE PRODUCT
// --------------------------------------------------

router.post(
    '/delete-product/:productId',
    adminController.postDeleteProduct
);


module.exports = router;

