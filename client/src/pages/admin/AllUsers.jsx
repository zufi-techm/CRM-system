import React, { useEffect, useState } from "react";
import { BsTrash3Fill } from "react-icons/bs";
import { DeleteUser, GetAllUsers } from "../../apiCalls/users";
import { useNavigate } from "react-router-dom";
const AllUsers = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState(null);
  const getAllUsers = async () => {
    try {
      await GetAllUsers().then((res) => setUsers(res));
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getAllUsers();
  }, []);
  const [deleted, setDleted] = useState(false);
  const deleteUser = async (id) => {
    try {
      await DeleteUser(id).then((res) => alert(res.message));
      navigate("");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <section className="flex justify-center items-center flex-col">
      <div className="  flex items-center justify-between self-start py-2 px-20 fixed top-0 w-full bg-white">
        <div className="text text-blue-800 font-bold text-3xl ml-4 ">
          Electronics++
        </div>
        <div className="text text-blue-800 self-center  font-bold text-xl ">
          All users
        </div>
      </div>

      <table className="text-blue-800 mt-20 mb-10  rounded-md  w-3/4 bg-blue-100">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Role</th>
            <th>Orders</th>
            <th>Created</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user) => {
              return (
                <tr
                  key={user._id}
                  className={`cursor-pointer text-center bg-blue-100 hover:bg-blue-800 hover:text-white`}
                >
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.role}</td>
                  <td>{user.createdAt.split("T")[0]}</td>
                  <td
                    onClick={(e) => deleteUser(user._id)}
                    className={`flex h-full w-full  items-center justify-center m-0 py-2 hover:bg-red-300 text-white `}
                  >
                    <BsTrash3Fill color="red" />
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </section>
  );
};

export default AllUsers;
