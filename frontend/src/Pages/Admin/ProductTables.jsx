import React, { useState, useMemo } from "react";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../../features/products/productApi";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const ProductTables = () => {
  const { data: products, isLoading, isError } = useGetProductsQuery();
  const [deleteProduct] = useDeleteProductMutation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

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

  const categoryList = useMemo(() => {
    const categories = products?.map((p) => p.category);
    return ["All", ...new Set(categories)];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products?.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || selectedCategory === ""
          ? true
          : product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, selectedCategory]);

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts?.length / itemsPerPage);
  const paginatedProducts = filteredProducts?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (isError)
    return <p className="text-center mt-10">Something went wrong!</p>;

  return (
    <div className="overflow-x-auto w-full mt-8 px-2">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
        <h2 className="text-2xl font-semibold">Product List</h2>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="border px-3 py-2 rounded w-64"
          />
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setCurrentPage(1);
            }}
            className="border px-3 py-2 rounded"
          >
            {categoryList.map((cat, idx) => (
              <option key={idx} value={cat === "All" ? "" : cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

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
          {paginatedProducts?.length > 0 ? (
            paginatedProducts.map((product) => (
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
                <td className="p-2 border">
                  <span
                    className={`px-2 py-1 rounded text-indigo-800 font-semibold ${
                      product.stock > 0 ? "bg-green-400" : "bg-red-200"
                    }`}
                  >
                    {product.stock > 0 ? product.stock : "Out of Stock"}
                  </span>
                </td>
                <td className="p-2 border">{product.category}</td>
                <td className="p-2 border max-w-xs truncate">
                  {product.description}
                </td>
                <td className="p-2 border space-x-2">
                 <Link
                 to={`/dashboard/updateProduct/${product._id}`}
                 >
                  <button
                   
                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-1 rounded"
                  >
                    Update
                  </button>
                 </Link>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center py-4 text-gray-500">
                No products found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx}
              onClick={() => handlePageChange(idx + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === idx + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {idx + 1}
            </button>
          ))}
          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductTables;
