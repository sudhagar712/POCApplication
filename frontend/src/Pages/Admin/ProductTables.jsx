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

  const totalPages = Math.ceil(filteredProducts?.length / itemsPerPage);
  const paginatedProducts = filteredProducts?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (isError)
    return <p className="text-center mt-10">Something went wrong!</p>;

  return (
    <div className="mt-8 px-2 w-full">
      {/* Header + Filters */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
        <h2 className="text-xl font-bold">Product List</h2>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="border px-3 py-2 rounded w-full sm:w-64"
          />
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setCurrentPage(1);
            }}
            className="border px-3 py-2 rounded w-full sm:w-auto"
          >
            {categoryList.map((cat, idx) => (
              <option key={idx} value={cat === "All" ? "" : cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table for larger screens */}
      <div className="hidden md:block overflow-x-auto border rounded-lg shadow-sm">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border">Image</th>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Price</th>
              <th className="p-3 border">Stock</th>
              <th className="p-3 border">Category</th>
              <th className="p-3 border">Description</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedProducts?.length > 0 ? (
              paginatedProducts.map((product) => (
                <tr key={product._id} className="hover:bg-gray-50">
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
                      className={`px-2 py-1 rounded text-white font-semibold ${
                        product.stock > 0 ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {product.stock > 0 ? product.stock : "Out of Stock"}
                    </span>
                  </td>
                  <td className="p-2 border">{product.category}</td>
                  <td className="p-2 border max-w-xs truncate">
                    {product.description}
                  </td>
                  <td className="p-2 border">
                    <div className="flex gap-2 justify-center">
                      <Link to={`/dashboard/updateProduct/${product._id}`}>
                        <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded">
                          Update
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </div>
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
      </div>

      {/* Card view for mobile */}
      <div className="md:hidden space-y-4">
        {paginatedProducts?.length > 0 ? (
          paginatedProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white border rounded-lg shadow-sm p-3 space-y-2"
            >
              <div className="flex gap-3">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-bold">{product.name}</h3>
                  <p className="text-sm text-gray-600">{product.category}</p>
                  <p className="text-blue-600 font-semibold">
                    ₹{product.price}
                  </p>
                  <p
                    className={`text-sm font-semibold ${
                      product.stock > 0 ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {product.stock > 0
                      ? `${product.stock} in stock`
                      : "Out of Stock"}
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-500">{product.description}</p>
              <div className="flex gap-2">
                <Link
                  to={`/dashboard/updateProduct/${product._id}`}
                  className="flex-1"
                >
                  <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded">
                    Update
                  </button>
                </Link>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No products found</p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2 flex-wrap">
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
