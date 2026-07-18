const Product = require('../models/products');
const Cart=require('../models/cart');

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

exports.postCart=(req,res,next)=>{

    const pid=req.body.productId;
    const selectedProduct=Product.findById(pid);

    Cart.addProduct(selectedProduct);
    res.redirect('/cart');

};

exports.getCart = (req, res, next) => {

    // Retrieve all products currently in the cart
    const cartProducts = Cart.getProducts();

    // Calculate the total price of all cart products
    const totalPrice = cartProducts.reduce(
        (total, product) => total + product.price,
        0
    );

    res.render('shop/cart', {

        pageTitle: 'Your Cart',

        path: '/cart',

        products: cartProducts,

        totalPrice: totalPrice

    });
};

exports.removeProductFromCart=(req,res,next)=>{
    const pid=req.params.productId;

    Cart.removeProductFromCart(pid);

    res.redirect('/cart');
};
