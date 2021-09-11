import React from "react";
import { useSelector } from "react-redux";
import { UsersTable } from "../../components";

const Home = () => {
  const data = useSelector((state) => state.UsersData.dataUsers);
  return (
    <>
      <nav className="flex px-5 justify-between mt-2 items-center">
        <div className="flex items-center">
          <div className="h-14 w-14 bg-black">a</div>
          <div className="ml-3">Company</div>
        </div>
        <div className="">Foto</div>
      </nav>
      <div>
        <UsersTable></UsersTable>
      </div>
    </>
  );
};

export default Home;
