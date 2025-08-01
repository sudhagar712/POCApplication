import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: {
      type: String,
      enum: [
        "Electronics",
        "Clothing",
        "Accessories",
        "HomeAppliances",
        "Furniture",
        "Books",
        "Toys",
        "Sports",
        "Health",
        "Beauty",
        "Jewelry",
        "Garden",
        "Kitchen",
      ],
      required: true,
    },
    stock: { type: Number, default: 0 },
    description: { type: String },
    image: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
