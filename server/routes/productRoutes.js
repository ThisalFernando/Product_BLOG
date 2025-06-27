const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

// Set product
router.post("/", async(req, res) => {
    try{
        const {name, price, quantity} = req.body;

        const product = new Product({
            name,
            price,
            quantity
        });

        await product.save();
        res.status(201).json(product);
    }catch(error){
        console.error("Error setting product:", error);
        res.status(500).json({error: "Failed to set product!"});
    }
});

// Get all products for a user
router.get("/", async(req, res) => {
    try{
        const products = await Product.find();
        res.json(products);
    }catch(error){
        console.error("Error fetching products: ", error);
        res.status(500).json({error: "Failed to fetch products!"});
    }
});

// Get a single product by ID
router.get("/:id", async (req, res) => {
    try{
        const product = await Product.findById(req.params.id);
        if(!product){
            return res.status(404).json({message: "Product not found"});
        }
        res.json(product);
    }catch(error){
        console.error("Error fetching product: " , error);
        res.status(500).json({error: "Failed to fetch product!"});
    }
});

//Update a product by ID
router.put("/:id", async (req, res) => {
    try{
        const { name, price, quantity } = req.body;

        const product = await Product.findByIdAndUpdate(
            req.params.id,
            { name, price, quantity },
            { new: true, runValidators: true }
        );

        if(!product){
            return res.status(404).json({message: "Product not found!"});
        }

        res.json(product);
    }catch(error){
        console.error("Error updating product: ", error);
        res.status(500).json({error: "Failed to update product!"});
    }
});

// Delete a product
router.delete("/:id", async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found!" });
        }
        res.json({ message: "Product deleted successfully!" });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ error: "Failed to delete product!" });
    }
});

module.exports = router;