const products = [];

module.exports = class Product {

    constructor(id, title, imageUrl, price, description) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
        this.description = description;
    }

    save() {

        if (this.id) {

            const productIndex = products.findIndex(
                product => product.id === this.id
            );

            products[productIndex] = this;

        } else {

            this.id = Math.random().toString();

            products.push(this);
        }
    }

    static update(id, title, imageUrl, price, description) {

        const product = products.find(
            product => product.id === id
        );

        if (product) {
            product.title = title;
            product.imageUrl = imageUrl;
            product.price = price;
            product.description = description;
        }
    }

    static fetchAll() {

        return products;
    }

    static findById(id) {

        return products.find(
            product => product.id === id
        );
    }

    static deleteById(id) {

        const productIndex = products.findIndex(
            product => product.id === id
        );

        if (productIndex >= 0) {
            products.splice(productIndex, 1);
        }
    }

};