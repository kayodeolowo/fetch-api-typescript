import React, { useEffect, useState } from "react";
import axios from "axios";

type User = {
  id: number;
  title: string;
  price: number;
  image: string
};

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  
  const fetchUsers = async () => {
      const response = await axios.get<User[]>("https://fakestoreapi.com/products");
      setUsers(response.data);
      console.log(response.data)
    };
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container mx-auto">
      {users.map((user) => (
        <div key={user.id} className="lg:grid lg:grid-cols-4">
          <div className="border-2 w-40 mb-10 mx-auto "> 
            <img className="h-20 w-20" src={user.image} />
            <p className="font-semibold"> {user.price} </p>
            <h1 className=" lg:w-1/2"> {user.title} </h1>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserList;