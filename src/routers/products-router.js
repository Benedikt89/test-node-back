let {getProducts, getProduct, updateProduct, deleteProduct, addProduct} = require('../dal/products-repository');
const express = require("express");
const router = express.Router();

router.get('/', async (req, res)=>{
    let products = await getProducts(req.query.search);
    res.send(products);
    console.log('getUsers');
});

router.get('/:id', async (req, res)=>{
    const productId = req.params.id;
    let user = await getProduct(productId);
    if (user) res.send(user);
    res.send(404)
});

router.put('/', async (req, res)=>{
    let newProduct = req.body.name;
    const userId = req.body.id;
    await updateProduct(userId, newProduct);
    res.send(204)
});
router.delete('/:id', async (req, res)=>{
    const userId = req.params.id;
    await deleteProduct(userId);
    res.send(204)
});
router.post('/', async (req, res)=>{
    let name = req.body.name;
    await addProduct(name);

    res.send({success: true});
});

module.exports = router;