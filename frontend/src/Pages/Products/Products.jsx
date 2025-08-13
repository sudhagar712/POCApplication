import React from "react";

const Products = ({ products }) => {
  return (
    <div className="mt-4 md:px-10 mb-10">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {products?.map((product) => (
          <div
            key={product._id}
            className="bg-blue-400 text-white rounded-2xl shadow-md p-4 
                       hover:opacity-90 transition-all duration-300 relative overflow-hidden"
          >
            {/* Category Badge */}
            <span
              className="absolute top-2 left-2 bg-white text-blue-700 px-2 py-1 text-xs 
                         font-semibold rounded opacity-80 hover:opacity-100 transition-all duration-300"
            >
              {product.category}
            </span>

            {/* Image */}
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-[200px] md:w-full md:h-[400px]  object-cover rounded-xl"
            />

            {/* Product Name */}
            <h2 className="text-lg font-semibold mt-3">{product.name}</h2>

            {/* Price */}
            <p className="text-yellow-300 font-bold mt-2">₹{product.price}</p>

            {/* Stock Status */}
            <p
              className={`font-bold mt-2 px-2 py-1 rounded 
              ${product.stock > 0 ? "text-green-200" : "text-red-300"}`}
            >
              Stock: {product.stock > 0 ? product.stock : "Out of Stock"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
