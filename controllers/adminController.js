const Product = require('../models/products');

exports.getAddProduct = (req, res, next) => {

    res.render('admin/add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product'
    });

};

exports.postAddProduct = (req, res, next) => {

    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = parseFloat(req.body.price);
    const description = req.body.description;

    const product = new Product(
        null,
        title,
        imageUrl,
        price,
        description
    );

    product.save();

    res.redirect('/');
};

exports.getEditProduct=(req,res,next)=>{
    
    const productId=req.params.productId; 
    const product=Product.findById(productId);

    console.log(product);

    res.render('admin/edit-product',{
        pageTitle: 'Edit Product',

        path: '/admin/edit-product',

        product: product}

    )
};

exports.postEditProduct = (req, res, next) => {

    const productId = req.body.productId;

    const updatedTitle = req.body.title;
    const updatedImageUrl = req.body.imageUrl;
    const updatedPrice = parseFloat(req.body.price);
    const updatedDescription = req.body.description;

    Product.update(
        productId,
        updatedTitle,
        updatedImageUrl,
        updatedPrice,
        updatedDescription
    );

    res.redirect('/');
};


exports.postDeleteProduct=(req,res,next)=>{

    const pid=req.params.productId;

    Product.deleteById(pid);

    res.redirect('/');
}




