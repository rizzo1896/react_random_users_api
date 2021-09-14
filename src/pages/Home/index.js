import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { UsersTable, Modal } from "../../components";

import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ImageIcon from "@material-ui/icons/Image";
import CloseIcon from "@material-ui/icons/Close";

const getWindowDimensions = () => {
  const { innerWidth } = window;
  return innerWidth;
};

const Home = () => {
  const [modalOpened, setModalOpened] = useState(false);
  const [selectUser, setSelectUser] = useState([]);
  const [widthWindow, setwidthWindow] = useState(getWindowDimensions());
  const selectFilter = useSelector((state) => state.UsersData.selectUser);

  useEffect(() => {
    if (selectFilter !== undefined) {
      setSelectUser(selectFilter[0]);
      // console.log(selectUser);
    }
  }, [selectFilter]);

  useEffect(() => {
    function handleResize() {
      setwidthWindow(getWindowDimensions());
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
      <nav className="flex px-5 justify-between py-3 items-center mb-3 bg-white">
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
      <div className=" h-screen mb-10">
        <UsersTable func={pull_data}></UsersTable>
        {modalOpened === true && selectFilter !== undefined && (
          <Modal
            open={modalOpened}
            onClose={() => setModalOpened(!modalOpened)}
          >
            {selectUser.map((item, index) => {
              return (
                <div className="w-full flex flex-col justify-center items-center relative">
                  {/* {widthWindow <= 768 && ( */}
                  <div
                    onClick={() => setModalOpened(!modalOpened)}
                    className="absolute -right-0 top-1"
                  >
                    <CloseIcon fontSize="large" style={{ color: "red" }} />
                  </div>
                  {/* )} */}
                  <div className="flex flex-col justify-center items-center w-60 h-60 rounded-full absolute -top-32">
                    <img
                      className="rounded-full w-40 h-40"
                      src={item.picture.large}
                      alt={item.name.first}
                    />
                  </div>

                  <div className=" font-semibold text-3xl mt-20 ">
                    {item.name.first + " " + item.name.last}
                  </div>

                  {/*width: 500px;*/}
                  <div className="mt-4 w-11/12">
                    <div className=" border-gray-300 font-normal text-lg ">
                      <div className="border rounded p-2 text-center font-normal mb-2">
                        Email: {item.email}
                      </div>

                      {/* Container start */}
                      <div className="flex whitespace-nowrap mb-2 lg:flex-row sm:flex-col">
                        <div className="border rounded p-2 text-center lg:w-1/2 sm:w-auto lg:mb-0 sm:mb-2">
                          ID: {item.id.value}
                        </div>
                        <div className="border rounded p-2 text-center lg:w-1/2 sm:w-auto">
                          Phone: {item.phone}
                        </div>
                      </div>
                      {/* Container end */}

                      {/* Container start */}
                      <div className="flex mb-2 whitespace-nowrap xl:flex-row sm:flex-col">
                        <div className="border rounded p-2 text-center xl:w-1/3 sm:w-auto xl:mb-0 sm:mb-2">
                          Nationality: {item.nat.toUpperCase()}
                        </div>
                        <div className="border rounded p-2 text-center xl:w-1/3 sm:w-auto xl:mb-0 sm:mb-2">
                          Gender: {item.gender.toUpperCase()}
                        </div>
                        <div className="border rounded p-2 text-center xl:w-1/3 sm:w-auto">
                          Dob: {dateBuilder(item.dob.date)}
                        </div>
                      </div>
                      {/* Container end */}

                      <div className="border rounded p-2 text-center">
                        Address: {addressBuilder(item)}
                      </div>
                    </div>
                  </div>
                  <div className="mt-11 mb-8 flex justify-center items-center w-40 h-10 bg-green-400 font-semibold rounded-md cursor-pointer hover:bg-green-500 hover:text-gray-100 transition-all duration-200">
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
