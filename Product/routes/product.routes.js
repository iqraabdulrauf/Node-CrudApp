

const express = require('express');
const router = express.Router();
const Product = require('../model/product.model');

const productController = require('../controllers/product.controller');


// a simple test url to check that all of our files are communicating correctly.
// router.get('/test', productController.test);

router.post('/create', productController.create);

// Retrieve all Notes
router.get('/readAll', productController.findAll);

// Retrieve a single Note with noteId
router.get('/read/:productID', productController.findOne);

// Update a Note with noteId
router.put('/update/:productID', productController.update);

// Delete a Note with noteId
router.delete('/delete/:productID', productController.delete);

// router.get('/', (req, res, next) => {
//     return res.status(200).json({
//         message: 'Enable GET requests!'
//     });
// });
// router.post('/', (req, res, next) => {

//     const product = {
//         name: req.body.name,
//         price: req.body.price
//     }
//     const products = new Product({
//         _id: new mongoose.Types.ObjectId(),
//         name: req.body.name,
//         price: req.body.price
//     });
//     products
//         .save()
//         .then(result => {
//             console.log(result);
//         })
//         .catch(err => {
//             console.log(err);
//         });

//     res.status(201).json({
//         message: 'Enable POST requests!',
//         createdProduct: product
//     });
// });

// router.get('/:productID', (req, res, next) => {
//     const id = req.params.productID
//     if (id == "special") {
//         return res.status(200).json({
//             message: 'You discovered a special ID!',
//             id: id
//         });

//     }
//     return res.status(200).json({
//         message: 'You ordinary a special ID!'

//     });
// });

// router.patch('/:productID', (req, res, next) => {
//     return res.status(200).json({
//         message: 'Updated!'
//     });
// });

// router.delete('/:productID', (req, res, next) => {
//     return res.status(200).json({
//         messade: 'deleted!'
//     })
// })
module.exports = router;