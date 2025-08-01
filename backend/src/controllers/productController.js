import Product from "../models/productModel.js";

export const createProduct = async (req, res) => {
  const { name, price, stock, description,category } = req.body;  
 const imagePath = req.file ? `http://localhost:8000/uploads/${req.file.filename}` : '';
  const product = new Product({
    name,
    price,
    stock,
    description,
    category,
    image: imagePath,
    createdBy: req.user._id,
  });

  await product.save();
  res.status(201).json(product);
};

export const getProducts = async (req, res) => {
  const products = await Product.find();
  res.status(200).json(products);
};

export const getSingleProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Not found" });
  res.status(200).json(product);
};

export const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Not found" });

  await product.deleteOne();
  res.json({ message: "Deleted successfully" });
};

export const updateProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Not found" });

  product.name = req.body.name;
  product.price = req.body.price;
  product.stock = req.body.stock;
  product.description = req.body.description;
  product.image = req.body.image;

  await product.save();
  res.json(product);
};
