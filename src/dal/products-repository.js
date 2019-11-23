const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {type:String, required: true},
    photo: {type:String, required: true},
    // price: {type: Number, required: true},
    // size: {type: Number, required: true},
    // text_long: {type:String, required: true},
    // text_short: {type:String, required: true},
});
const Product = mongoose.model('pizzas', productSchema);

const getProducts = (search) => {
    if (!search)
        return Product.find()
            .select('name price _id photo')
            .exec()
            .then(docs => {
                return {
                    count: docs.length,
                    pizzas: docs.map(doc=>{
                        return {
                            id: doc._id,
                            name: doc.name,
                            price: doc.price,
                            photo: `http://localhost:8000/${doc.photo}`
                        }
                    })
                }
            });
    else return Product.find({firstName: new RegExp(search)})
};
const getProduct = (userId) => {
    return Product.find({_id: userId})
};
const updateProduct = (userId, newProductName) => {
    return Product.update({_id: userId}, {name: newProductName})
};
const deleteProduct = (id) => {
    return Product.deleteOne({_id: id});
};
const addProduct = async (product) => {
    const user = new Product(product);
    return user.save()
        .then((res)=>{
        return {
            pizza: res
        }})
        .catch(err=>{
            console.log(err);
            return {error: err}
        })
};

exports.getProducts = getProducts;
exports.addProduct = addProduct;
exports.getProduct = getProduct;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct;