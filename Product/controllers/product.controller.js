const Product = require('../model/product.model');

exports.create = function (req, res) {

    // Validate request
    if (!req.body.name || !req.body.price) {
        return res.status(400).send({
            message: "Content can not be empty"
        });
    }

    let product = new Product(
        {
            name: req.body.name,
            price: req.body.price
        }
    );

    product.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the product."
            });
        });
};

// Retrieve and return all products from the database.
exports.findAll = (req, res) => {
    Product.find()
        .then(products => {
            res.send(products);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving product."
            });
        });
};

// Find a single note with a productID
exports.findOne = (req, res) => {
    Product.findById(req.params.productID)
        .then(product => {
            if (!product) {
                return res.status(404).send({
                    message: "product not found with id " + req.params.productID
                });
            }
            res.send(product);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "product not found with id " + req.params.productID
                });
            }
            return res.status(500).send({
                message: "Error retrieving product with id " + req.params.productID
            });
        });
};

// Update a note identified by the productID in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.name || !req.body.price) {
        return res.status(400).send({
            message: "product content can not be empty"
        });
    }

    // Find note and update it with the request body
    Product.findByIdAndUpdate(req.params.productID, {
        name: req.body.name || "Unnamed Note",
        price: req.body.price
    }, { new: true })
        .then(product => {
            if (!product) {
                return res.status(404).send({
                    message: "product not found with id " + req.params.productID
                });
            }
            res.send(product);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "product not found with id " + req.params.productID
                });
            }
            return res.status(500).send({
                message: "Error updating product with id " + req.params.productID
            });
        });
};

// Delete a note with the specified productID in the request
exports.delete = (req, res) => {
    Product.findByIdAndRemove(req.params.productID)
        .then(product => {
            if (!product) {
                return res.status(404).send({
                    message: "product not found with id " + req.params.productID
                });
            }
            res.send({ message: "product deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "product not found with id " + req.params.productID
                });
            }
            return res.status(500).send({
                message: "Could not delete product with id " + req.params.productID
            });
        });
};
