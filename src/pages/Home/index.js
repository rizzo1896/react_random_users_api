import React from "react";
import { UsersTable, Modal } from "../../components";

import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ImageIcon from "@material-ui/icons/Image";
import { Route } from "react-router";

const Home = () => {
  return (
    <>
      <nav className="flex px-5 justify-between py-3 items-center mb-3 bg-white">
        <div className="flex items-center">
          <div className="flex items-center justify-center h-14 w-14 bg-gray-300">
            <ImageIcon fontSize="large" />
          </div>
          <div className="ml-3 font-bold text-2xl">Company</div>
        </div>
        <div className="flex items-center justify-center rounded-full h-14 w-14 bg-gray-300 cursor-pointer">
          <AccountCircleIcon fontSize="large" />
        </div>
      </nav>
      <div className=" h-screen mb-10">
        <UsersTable></UsersTable>
        <Route
          path={`/profile/:id`}
          render={() => {
            return <Modal />;
          }}
        />
      </div>
    </>
  );
};

export default Home;
