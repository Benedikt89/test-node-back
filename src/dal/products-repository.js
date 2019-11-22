const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {type:String, required: true},
    // price: {type: Number, required: true},
    // size: {type: Number, required: true},
    // text_long: {type:String, required: true},
    // text_short: {type:String, required: true},
});
const Product = mongoose.model('pizzas', productSchema);

const getProducts = (search) => {
    if (!search)
        return Product.find()
            .select('name price _id')
            .exec()
            .then(docs => {
                return {
                    count: docs.length,
                    pizzas: docs.map(doc=>{
                        return {
                            id: doc._id,
                            name: doc.name,
                            price: doc.price
                        }
                    })
                }
            });
    else return Product.find({firstName: new RegExp(search)})
};
const getProduct = (userId) => {
    return Product.find({_id: userId})
};
const updateProduct = (userId, newName) => {
    return Product.update({_id: userId}, {firstName: newName})
};
const deleteProduct = (id) => {
    return Product.deleteOne({_id: id});
};
const addProduct = async (name) => {
    const user = new Product({name});
    return user.save()
};

exports.getProducts = getProducts;
exports.addProduct = addProduct;
exports.getProduct = getProduct;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct;