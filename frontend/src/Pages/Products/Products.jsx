import React from "react";

const Products = ({ products }) => {
  return (
    <div className="mt-4 md:px-10 ">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
        {products?.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition-shadow duration-300"
          >
            <p className="text-green-600">{product.category}</p>
            <img
              src={product.image}
              alt={product.name}
              className=" w-[800px] h-[300px]  md:h-[200px] object-fit rounded-xl"
            />
            <h2 className="text-lg font-semibold mt-3">{product.name}</h2>
            {/* <p className="text-gray-600 mt-1">{product.description}</p> */}
            <p className="text-indigo-600 font-bold mt-2">₹{product.price}</p>
            <p className="text-green-600">{product.category}</p>
            <p
              className={`font-bold mt-2 px-2 py-1 rounded text-indigo-800 ${
                product.stock > 0 ? "text-blue-900" : "text-red-900"
              }`}
            >
              stock:{product.stock > 0 ? product.stock : "out of stock"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
