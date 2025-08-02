// src/Pages/Admin/UserTable.jsx
import React from "react";
import { useGetAllUsersQuery } from "../../features/users/userApi";

const UserCrudAdmin = () => {
  const { data: users, isLoading, isError } = useGetAllUsersQuery();

  if (isLoading) return <p className="text-center">Loading users...</p>;
  if (isError)
    return <p className="text-center text-red-500">Failed to load users</p>;

  return (
    <div className="overflow-x-auto p-4">
      <h2 className="text-2xl font-bold mb-4">All Users</h2>
      <table className="table w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">#</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Role</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user, idx) => (
            <tr key={user._id}>
              <td className="p-2 border">{idx + 1}</td>
              <td className="p-2 border">{user.name}</td>
              <td className="p-2 border">{user.email}</td>
              <td className="p-2 border capitalize">{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserCrudAdmin;
