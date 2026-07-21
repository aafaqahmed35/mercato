// controllers/adminController.js

// Import the Sequelize Product model
const Product = require('../models/products');


// --------------------------------------------------
// GET ADD PRODUCT PAGE
// --------------------------------------------------

exports.getAddProduct = (req, res, next) => {

    res.render('admin/add-product', {

        pageTitle: 'Add Product',

        path: '/admin/add-product'

    });

};


// --------------------------------------------------
// CREATE PRODUCT
// --------------------------------------------------

exports.postAddProduct = async (req, res, next) => {

    try {

        // Get submitted form data
        const title = req.body.title;

        const imageUrl = req.body.imageUrl;

        const price = parseFloat(req.body.price);

        const description = req.body.description;


        /*
            Because we defined:

                User.hasMany(Product)

            Sequelize gives a User instance:

                user.createProduct()

            req.user is currently our temporary
            development user.

            Sequelize automatically associates the
            new product with that user using userId.
        */

        await req.user.createProduct({

            title: title,

            imageUrl: imageUrl,

            price: price,

            description: description

        });


        res.redirect('/');

    } catch (err) {
        console.log(err);
        next(err);

    }

};


// --------------------------------------------------
// GET EDIT PRODUCT PAGE
// --------------------------------------------------

exports.getEditProduct = async (req, res, next) => {

    try {

        // Get ID from:
        //
        // /admin/edit-product/:productId

        const productId = req.params.productId;


        // Find product using its primary key
        const product = await Product.findByPk(productId);


        // Product does not exist
        if (!product) {

            return res.redirect('/');

        }


        res.render('admin/edit-product', {

            pageTitle: 'Edit Product',

            path: '/admin/edit-product',

            product: product

        });

    } catch (err) {

        next(err);

    }

};


// --------------------------------------------------
// UPDATE PRODUCT
// --------------------------------------------------

exports.postEditProduct = async (req, res, next) => {

    try {

        // Get submitted product ID
        const productId = req.body.productId;


        // Find the existing product in MySQL
        const product = await Product.findByPk(productId);


        // Product does not exist
        if (!product) {

            return res.redirect('/');

        }


        /*
            Update the Sequelize model instance
            in JavaScript memory.
        */

        product.title = req.body.title;

        product.imageUrl = req.body.imageUrl;

        product.price = parseFloat(req.body.price);

        product.description = req.body.description;


        /*
            Persist the changed instance to MySQL.

            Conceptually:

                UPDATE products
                SET ...
                WHERE id = productId
        */

        await product.save();


        res.redirect('/');

    } catch (err) {

        next(err);

    }

};


// --------------------------------------------------
// DELETE PRODUCT
// --------------------------------------------------

exports.postDeleteProduct = async (req, res, next) => {

    try {

        // Your current delete route supplies the ID
        // through req.params.productId.

        const productId = req.params.productId;


        // Find the product first
        const product = await Product.findByPk(productId);


        // Product does not exist
        if (!product) {

            return res.redirect('/');

        }


        /*
            Delete this specific Sequelize instance.

            Conceptually:

                DELETE FROM products
                WHERE id = productId
        */

        await product.destroy();


        res.redirect('/');

    } catch (err) {

        next(err);

    }

};




