import { Product, ProductDocument } from "../model/product.model";
import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const saveProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() });
        return;
    }
    try {
        const createProduct: ProductDocument = req.body;
        const newProduct = new Product(createProduct);
        const savedProduct = await newProduct.save();
        res.status(201).json({ message: "Product saved successfully", product: savedProduct });
    } catch (err: any) {
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
};

export const getAllProducts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const products = await Product.find({ isDeleted: false });
        res.status(200).json({ message: "Products fetched successfully", products });
    } catch (err: any) {
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
};

export const getSingleProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const product = await Product.findById(req.query._id);
        if (!product) {
            res.status(404).json({ message: "Product not found" });
            return;
        }
        res.status(200).json({ message: "Product fetched successfully", product });
    } catch (err: any) {
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
};

export const updateProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate({_id:req.query._id}, req.body, { new: true });
        if (!updatedProduct) {
            res.status(404).json({ message: "Product not found" });
            return;
        }
        res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
    } catch (err: any) {
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
};

export const deleteProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const product = await Product.findByIdAndUpdate(req.query._id, { $set: { isDeleted: true } });
        if (!product) {
            res.status(404).json({ message: "Product not found" });
            return;
        }
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (err: any) {
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
};
