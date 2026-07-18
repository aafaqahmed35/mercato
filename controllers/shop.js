const Product = require('../models/products');

exports.getIndex = (req, res, next) => {

    const products = Product.fetchAll();

    res.render('shop/index', {

        prods: products,

        pageTitle: 'Shop',

        path: '/'
    });
};


exports.getProduct = (req, res, next) => {

    // Get the ID from /products/:productId
    const id = req.params.productId;

    // Find the matching product
    const product = Product.findById(id);

    // Render the product details page
    res.render('shop/product-detail', {

        product: product,

        pageTitle: product.title,

        path: '/products'
    });
};
