// controllers/shop.js

// Import the Sequelize Product model
const Product = require('../models/products');


// --------------------------------------------------
// GET SHOP / HOME PAGE
// --------------------------------------------------

exports.getIndex = async (req, res, next) => {

    try {

        /*
            Fetch all products from MySQL.

            Conceptually:

                SELECT * FROM products
        */

        const products = await Product.findAll();


        res.render('shop/index', {

            prods: products,

            pageTitle: 'Shop',

            path: '/'

        });

    } catch (err) {

        next(err);

    }

};


// --------------------------------------------------
// GET SINGLE PRODUCT
// --------------------------------------------------

exports.getProduct = async (req, res, next) => {

    try {

        // Get ID from:
        //
        // /products/:productId

        const productId = req.params.productId;


        /*
            Find the product using its primary key.

            Conceptually:

                SELECT *
                FROM products
                WHERE id = productId
        */

        const product = await Product.findByPk(productId);


        // Product does not exist
        if (!product) {

            return res.redirect('/');

        }


        res.render('shop/product-detail', {

            product: product,

            pageTitle: product.title,

            path: '/products'

        });

    } catch (err) {

        next(err);

    }

};


// --------------------------------------------------
// ADD PRODUCT TO CART
// --------------------------------------------------

exports.postCart = async (req, res, next) => {

    try {

        // Get the selected product ID from the form
        const productId = req.body.productId;


        // Get the current user's cart
        const cart = await req.user.getCart();


        // Find the selected product
        const product = await Product.findByPk(productId);


        if (!product) {

            return res.redirect('/');

        }


        /*
            Check whether this product is already
            inside this specific cart.

            Because Cart belongsToMany Product,
            Sequelize gives us:

                cart.getProducts()

            The "where" condition means:

                only look for this product ID
                inside this cart.
        */

        const products = await cart.getProducts({

            where: {
                id: productId
            }

        });


        let newQuantity = 1;


        /*
            If products.length > 0:

            The product is already in the cart.
        */

        if (products.length > 0) {

            const existingProduct = products[0];


            /*
                Sequelize includes data from the junction
                table on the associated Product instance.

                Our junction model is called:

                    cartItem

                So we can access:

                    existingProduct.cartItem.quantity
            */

            const oldQuantity =
                existingProduct.cartItem.quantity;


            newQuantity = oldQuantity + 1;

        }


        /*
            Associate the Product with the Cart.

            CartItem stores:

                cartId
                productId
                quantity

            If the relationship already exists,
            Sequelize updates the junction-table data.

            If it does not exist,
            Sequelize creates the relationship.
        */

        await cart.addProduct(product, {

            through: {
                quantity: newQuantity
            }

        });


        res.redirect('/cart');

    } catch (err) {

        next(err);

    }

};


// --------------------------------------------------
// GET CART
// --------------------------------------------------

exports.getCart = async (req, res, next) => {

    try {

        // Get this user's cart
        const cart = await req.user.getCart();


        /*
            Fetch all Products associated with this cart.

            Sequelize also includes the CartItem
            junction-table information for each product.

            Therefore each product conceptually contains:

                product.cartItem.quantity
        */

        const products = await cart.getProducts();


        /*
            Calculate:

                product price × quantity

            for every product in the cart.
        */

        const totalPrice = products.reduce(

            (total, product) => {

                return total +
                    product.price *
                    product.cartItem.quantity;

            },

            0

        );


        res.render('shop/cart', {

            pageTitle: 'Your Cart',

            path: '/cart',

            products: products,

            totalPrice: totalPrice

        });

    } catch (err) {

        next(err);

    }

};


// --------------------------------------------------
// REMOVE PRODUCT FROM CART
// --------------------------------------------------

exports.removeProductFromCart = async (
    req,
    res,
    next
) => {

    try {

        // Your existing route provides the product ID
        // as a URL parameter.

        const productId = req.params.productId;


        // Get the current user's cart
        const cart = await req.user.getCart();


        // Find the Product instance
        const product = await Product.findByPk(productId);


        if (!product) {

            return res.redirect('/cart');

        }


        /*
            Because of the Cart ↔ Product association,
            Sequelize provides:

                cart.removeProduct(product)

            This removes the relationship from CartItem.

            It DOES NOT delete the actual Product
            from the products table.
        */

        await cart.removeProduct(product);


        res.redirect('/cart');

    } catch (err) {

        next(err);

    }

};
