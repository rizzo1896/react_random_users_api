import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { UsersTable, Modal } from "../../components";

import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ImageIcon from "@material-ui/icons/Image";

const Home = () => {
  const [modalOpened, setModalOpened] = useState(false);
  const [selectUser, setSelectUser] = useState([]);

  const selectFilter = useSelector((state) => state.UsersData.selectUser);

  useEffect(() => {
    if (selectFilter !== undefined) {
      setSelectUser(selectFilter[0]);
      // console.log(selectUser);
    }
  }, [selectFilter]);

  const pull_data = (data) => {
    setModalOpened(data);
  };

  const dateBuilder = (date) => {
    let d = new Date(date);
    let ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
    let mo = new Intl.DateTimeFormat("en", { month: "short" }).format(d);
    let da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);
    return `${da}-${mo}-${ye}`;
  };

  const addressBuilder = (data) => {
    let address =
      data.location.street.name +
      " " +
      data.location.street.number +
      ", " +
      data.location.city +
      " - " +
      data.location.state +
      " | " +
      data.location.country;

    return address;
  };

  return (
    <>
      <nav className="flex px-5 justify-between mt-2 items-center mb-3">
        <div className="flex items-center">
          <div className="flex items-center justify-center h-14 w-14 bg-gray-300">
            <ImageIcon fontSize="large" color="disabled" />
          </div>
          <div className="ml-3 font-bold text-2xl">Company</div>
        </div>
        <div className="flex items-center justify-center rounded-full h-14 w-14 bg-gray-300 cursor-pointer">
          <AccountCircleIcon fontSize="large" color="disabled" />
        </div>
      </nav>
      <div className="bg-gray-100 h-screen mb-10">
        <UsersTable func={pull_data}></UsersTable>
        {modalOpened === true && selectFilter !== undefined && (
          <Modal
            open={modalOpened}
            onClose={() => setModalOpened(!modalOpened)}
          >
            {selectUser.map((item, index) => {
              return (
                <div className="-top-28 relative flex flex-col justify-center items-center ">
                  <div className="flex flex-col justify-center items-center w-60 h-60 rounded-full">
                    <img
                      className="rounded-full w-40 h-40"
                      src={item.picture.large}
                      alt={item.name.first}
                    />
                  </div>
                  <div className=" border-gray-300 grid grid-cols-3 gap-4 place-items-center font-normal text-lg">
                    <div className="col-start-2 col-end-3 col-span-3 font-semibold text-3xl w-max">
                      {item.name.first + " " + item.name.last}
                    </div>
                    <div className="col-span-3 border rounded p-2 w-11/12 text-center font-normal">
                      Email: {item.email}
                    </div>
                    <div className="border rounded p-2 w-11/12 text-center">
                      Dob: {dateBuilder(item.dob.date)}
                    </div>
                    <div className="border rounded p-2  w-full text-center">
                      Phone: {item.phone}
                    </div>
                    <div className="border rounded p-2 w-11/12 text-center">
                      Nationality: {item.nat}
                    </div>
                    <div className="border rounded p-2 w-11/12 text-center">
                      Gender: {item.gender}
                    </div>
                    <div className="border rounded p-2 w-full text-center">
                      ID: {item.id.value}
                    </div>
                    <div className="border rounded p-2 col-start-1 col-end-4 col-span-3 w-11/12 text-center">
                      Address: {addressBuilder(item)}
                    </div>
                  </div>
                  <div className="mt-11 flex justify-center items-center w-40 h-10 bg-green-400 font-semibold rounded-md cursor-pointer hover:bg-green-500 hover:text-gray-100 transition-all duration-200">
                    SHARE
                  </div>
                </div>
              );
            })}
          </Modal>
        )}
      </div>
    </>
  );
};

export default Home;
