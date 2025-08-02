import React, { useState } from "react";
import { useCreateProductMutation } from "../../features/products/productApi";
import { toast } from "react-toastify";
import ProductTables from "../../Pages/Admin/ProductTables";

const AddProduct = () => {
  const [addProduct] = useCreateProductMutation();
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    description: "",
    category: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = new FormData();
    payload.append("name", formData.name);
    payload.append("price", formData.price);
    payload.append("stock", formData.stock);
    payload.append("description", formData.description);
    payload.append("category", formData.category);
    payload.append("image", formData.image);

    try {
      await addProduct(payload).unwrap();
      toast.success("Product added successfully");

      // Reset form and close modal
      setFormData({
        name: "",
        price: "",
        stock: "",
        description: "",
        category: "",
        image: null,
      });
      setOpen(false);
    } catch (err) {
      console.error(err);
      toast.error("Error adding product");
    }
  };

  return (
    <>
      {/* Open Button */}
      <button
        onClick={() => setOpen(true)}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        + Add Product
      </button>

      {/* Modal */}
      {open && (
        <dialog className="modal modal-open">
          <div className="modal-box max-w-2xl">
            <h3 className="font-bold text-lg mb-4">Add New Product</h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                name="name"
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
              <input
                name="price"
                type="number"
                placeholder="Price"
                value={formData.price}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
              <input
                name="stock"
                type="number"
                placeholder="Stock"
                value={formData.stock}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />

              {/* Category dropdown (static enum values) */}
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              >
                <option value="">Select Category</option>
                <option value="Clothing">Clothing</option>
                <option value="Electronics">Electronics</option>
                <option value="Books">Books</option>
                <option value="Home">Home</option>
              </select>

              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                rows={3}
              />
              <input
                name="image"
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="w-full"
                required
              />
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
      <ProductTables/>
    </>
  );
};

export default AddProduct;
