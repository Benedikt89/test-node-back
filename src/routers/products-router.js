let {getProducts, getProduct, updateProduct, deleteProduct, addProduct} = require('../dal/products-repository');
const express = require("express");
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let type = req.params.type;
        let path = `static/uploads/${type}`;
        //fs.mkdirsSync(path);
        cb(null, `static/uploads`);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now()+ file.originalname)
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png'|| file.mimetype === 'image/jpg'){
        cb(null, true);
    } else {
        cb(new Error('message'), false);
    }
};
const upload = multer({
    storage: storage,
    limits: {fileSize: 1024 * 1024 * 5},
//    fileFilter: fileFilter
});


router.get('/', async (req, res)=>{
    let products = await getProducts(req.query.search);
    try {
        res.send(products);
        console.log('getUsers success');
    }
    catch (e) {
        res.send(e.message)
    }

});

router.get('/:id', async (req, res)=>{
    const productId = req.params.id;
    let user = await getProduct(productId);
    if (user) res.send(user);
    res.send(404)
});

router.put('/', async (req, res)=>{
    let newProductName = req.body.name;
    const userId = req.body.id;
    await updateProduct(userId, newProductName);
    res.send(204)
});
router.delete('/:id', async (req, res)=>{
    const userId = req.params.id;
    await deleteProduct(userId);
    res.send(204)
});
router.post('/', upload.single('image'), async (req, res, next)=>{
    const file = req.file;
    if( !file ){
        const error = new Error('Please upload a file');
        error.httpStatusCode = 400;
        return next(error)
    }
    try {
        let product = {...req.body, photo: file.path};
        let result = await addProduct(product);
        res.send(result);
    } catch(error) {
        console.log(error);
        res.send(400);
    }
});

module.exports = router;