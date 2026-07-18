const cart=[];

module.exports=class Cart{

    static addProduct(product){
        cart.push(product);
    }

    static getProducts(){
        return cart;
    }
    static removeProductFromCart(id) {

    const productIndex = cart.findIndex(
        product => product.id === id
    );

    if (productIndex >= 0) {
        cart.splice(productIndex, 1);
    }
}
     
};



