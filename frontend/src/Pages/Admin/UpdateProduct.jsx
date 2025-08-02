import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useGetSingleProductQuery, useUpdateProductMutation } from '../../features/products/productApi';
import { toast } from 'react-toastify';

const UpdateProduct = () => {
  const { id } = useParams();
  const { data: product, isLoading, isError } = useGetSingleProductQuery(id);
  const [updateProduct]=useUpdateProductMutation();

  const  navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    stock: '',
    category: '',
    description: '',
    image: '',
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        price: product.price,
        stock: product.stock,
        category: product.category,
        description: product.description,
        image: product.image,
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
    }
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  const updatedData = new FormData();
  updatedData.append('name', formData.name);
  updatedData.append('price', formData.price);
  updatedData.append('stock', formData.stock);
  updatedData.append('category', formData.category);
  updatedData.append('description', formData.description);
    
    
  if (typeof formData.image === 'object') {
    updatedData.append('image', formData.image); 
  }

  updateProduct({ id, formData: updatedData  })  
    .unwrap()
    .then(() => {
     toast.success("Product updated successfully");
   navigate("/dashboard", { replace: true });
    })
    .catch((err) => {
      console.error("Update failed", err);
      toast.error("Error updating product");
    });
};


  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (isError) return <p className="text-center mt-10 text-red-500">Something went wrong.</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-900">Update Product</h2>
      <form onSubmit={handleSubmit} className="space-y-5" encType="multipart/form-data">
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            name="name"
            className="w-full border rounded p-2"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Price</label>
            <input
              type="number"
              name="price"
              className="w-full border rounded p-2"
              value={formData.price}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Stock</label>
            <input
              type="number"
              name="stock"
              className="w-full border rounded p-2"
              value={formData.stock}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <label className="block mb-1 font-medium">Category</label>
          <input
            type="text"
            name="category"
            className="w-full border rounded p-2"
            value={formData.category}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="description"
            rows="4"
            className="w-full border rounded p-2"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Image</label>
          {formData.image && (
            <img
              src={
                typeof formData.image === 'string'
                  ? formData.image
                  : URL.createObjectURL(formData.image)
              }
              alt="Product Preview"
              className="w-32 h-32 object-cover rounded mb-2"
            />
          )}
          <input
            type="file"
            accept="image/*"
            className="w-full border rounded p-2"
            onChange={handleImageChange}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
