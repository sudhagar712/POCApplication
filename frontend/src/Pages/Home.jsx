import React, { useState } from "react";
import Products from "./Products/Products";
import { useGetProductsQuery } from "../features/products/productApi";

const Home = () => {
  const { data: products, isLoading } = useGetProductsQuery();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  const categories = ["All", ...new Set(products?.map((item) => item.category))];

 
  const filteredProducts = products?.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="px-4 md:px-10 ">
      <h1 className="text-center mt-5 text-xl md:text-3xl  font-bold text-blue-900">
        Our Products
      </h1>

      {/* Search Box */}
      <div className="flex flex-col sm:flex-row justify-between items-center md:p-10    gap-4">
        <input
          type="text"
          placeholder="Search by product name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-full sm:w-1/2"
        />

        {/* Category Filter */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-full sm:w-1/3"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Product Grid */}
      <Products products={filteredProducts} />
    </div>
  );
};

export default Home;
