import React from "react";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../../features/products/productApi";
import { toast } from "react-toastify";

const ProductTables = () => {
  const { data: products, isLoading, isError } = useGetProductsQuery();
  const [deleteProduct] = useDeleteProductMutation();

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete this product?")) {
      try {
        await deleteProduct(id).unwrap();
        toast.success("Product deleted successfully");
      } catch (err) {
        console.error(err);
        toast.error("Error deleting product");
      }
    }
  };

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (isError)
    return <p className="text-center mt-10">Something went wrong!</p>;

  return (
    <div className="overflow-x-auto mt-8">
      <h2 className="text-2xl font-semibold mb-4">Product List</h2>

      <table className="table w-full border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Image</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Price</th>
            <th className="p-2 border">Stock</th>
            <th className="p-2 border">Category</th>
            <th className="p-2 border">Description</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product) => (
            <tr key={product._id} className="text-sm">
              <td className="p-2 border">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded"
                />
              </td>
              <td className="p-2 border">{product.name}</td>
              <td className="p-2 border">₹{product.price}</td>
              <td className="p-2 border">{product.stock}</td>
              <td className="p-2 border">{product.category}</td>
              <td className="p-2 border max-w-xs truncate">
                {product.description}
              </td>
              <td className="p-2 border space-x-2">
                <button
                  onClick={() => console.log("Update", product._id)}
                  className="bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTables;
