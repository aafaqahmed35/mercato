const product=require('../models/products');

exports.getIndex=(req,res,next)=>{
    const products=product.fetchAll();

    res.render('shop/index',{
        prods: products,

        pageTitle: 'Shop',

        path: '/'
    });
}
