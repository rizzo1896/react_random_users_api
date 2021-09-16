import React, { useState, useEffect } from "react";
import Portal from "./Portal";
import CloseIcon from "@material-ui/icons/Close";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { LoadingScene } from "..";

// const getWindowDimensions = () => {
//   const { innerWidth } = window;
//   return innerWidth;
// };

// Pegar a url e filtrar no array de users

const Modal = () => {
  const { id } = useParams();
  const history = useHistory();

  const dataUsers = useSelector((state) => state.UsersData.dataUsers);
  const [selectUser, setSelectUser] = useState([]);
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  // const [widthWindow, setwidthWindow] = useState(getWindowDimensions());

  useEffect(() => {
    if (dataUsers.length !== 1) {
      setIsLoading(true);
    } else {
      setSelectUser(dataUsers[0]);
      setIsLoading(false);
    }
  }, [dataUsers]);

  useEffect(() => {
    function onEsc(e) {
      if (e.keyCode === 27) {
        history.push("/");
      }
    }
    window.addEventListener("keydown", onEsc);

    return () => {
      window.removeEventListener("keydown", onEsc);
    };
    // eslint-disable-next-line
  }, []);

  // useEffect(() => {
  //   function handleResize() {
  //     setwidthWindow(getWindowDimensions());
  //   }
  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  // if (!open) return null;

  const onOverlayClick = () => {
    history.push("/");
  };

  const onDialogClick = (e) => {
    e.stopPropagation();
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

  function copy() {
    const el = document.createElement("input");
    el.value = window.location.href;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    setCopied(true);
  }

  return (
    <Portal>
      <div
        onClick={onOverlayClick}
        className="fixed inset-0 flex justify-center items-center w-full h-full backdrop-filter backdrop-blur-sm z-50"
      >
        <div
          onClick={onDialogClick}
          className="flex flex-col items-center w-5/12 h-auto bg-white rounded-xl lg:w-6/12 sm:mx-5 sm:w-auto"
        >
          {isLoading && <LoadingScene />}
          {!isLoading &&
            selectUser
              .filter((el) => el.login.uuid === id)
              .map((item, index) => {
                return (
                  <div
                    key={index}
                    className="w-full flex flex-col justify-center items-center relative"
                  >
                    {/* {widthWindow <= 768 && ( */}
                    <div
                      onClick={() => history.push("/")}
                      className="absolute -right-0 top-1 cursor-pointer"
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
                    <div
                      onClick={copy}
                      className="mt-11 mb-8 flex justify-center items-center w-40 h-10 bg-green-400 font-semibold rounded-md cursor-pointer hover:bg-green-500 hover:text-gray-100 transition-all duration-200"
                    >
                      {!copied ? "SHARE" : "SHARED!"}
                    </div>
                  </div>
                );
              })}
        </div>
      </div>
    </Portal>
  );
};

export default Modal;
