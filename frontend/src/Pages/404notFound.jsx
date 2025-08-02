import React from 'react'
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col gap-3 justify-center items-center h-[90vh]">
      <h1 className="text-5xl">404</h1>
      <div>
        <h3 className="font-extrabold">Page Not found</h3>
        <Link to="/">
          <button className=" border-2  border-blue-500 p-2 shadow-lg mt-5">
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
}

export default NotFound
