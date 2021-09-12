import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SortByAlphaIcon from "@material-ui/icons/SortByAlpha";
import ReplayIcon from "@material-ui/icons/Replay";

function UsersTable({ func }) {
  const dataUsers = useSelector((state) => state.UsersData.dataUsers);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [pageNumber, setPageNumber] = useState(10);
  const [order, setOrder] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [modalOpened, setModalOpened] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    func(modalOpened);
  }, [modalOpened]);

  useEffect(() => {
    if (dataUsers[0] === undefined) {
      setIsLoading(true);
    } else {
      setData(dataUsers[0]);
      setIsLoading(false);
    }
    // console.log(data);
  }, [dataUsers[0]]);

  const dateBuilder = (date) => {
    let d = new Date(date);
    let ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
    let mo = new Intl.DateTimeFormat("en", { month: "short" }).format(d);
    let da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);
    return `${da}-${mo}-${ye}`;
  };

  const sorting = () => {
    if (order === 1) {
      const sorted = [...data].sort((a, b) =>
        a.name.first > b.name.first ? 1 : -1
      );
      setData(sorted);
      setOrder(2);
    }
    if (order === 2) {
      const sorted = [...data].sort((a, b) =>
        a.name.first < b.name.first ? 1 : -1
      );
      setData(sorted);
      setOrder(3);
    }
    if (order === 3) {
      setData(dataUsers[0]);
      setOrder(1);
    }
  };

  const handleUser = (e) => {
    let newArray = [];
    if (dataUsers !== undefined) {
      newArray = dataUsers[0].filter((el) => {
        return (
          el.email.toString().toLowerCase() ===
          e.currentTarget.getAttribute("value").toString().toLowerCase()
        );
      });
    }
    dispatch({
      type: "ADD_USER",
      select: newArray,
    });
  };

  return (
    <>
      <div className="container max-w-6xl flex flex-col mx-auto h-screen bg-gray-100">
        <p className="font-medium text-lg text-justify">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem id quas
          reprehenderit, rerum quod architecto. Aspernatur, animi vitae magnam
          ratione quod similique mollitia, sunt, sit ut blanditiis iure possimus
          nulla?
        </p>
        <input
          placeholder="Searching"
          className="mt-10 h-12 p-3 rounded border-2 text-lg"
          type="text"
          onChange={(e) => setSearchValue(e.target.value)}
          value={searchValue}
        />
        <table className="table-fixed mt-10 border-collapse border-2 border-black-100">
          <thead>
            <tr>
              <th className="border-2 border-gray-400 bg-gray-300 h-12">
                Name
                <div className="float-right">
                  <button onClick={() => sorting()}>
                    <SortByAlphaIcon fontSize="small" />
                  </button>
                </div>
              </th>
              <th className="border-2 border-gray-400 bg-gray-300 h-12">
                Gender
              </th>
              <th className="border-2 border-gray-400 bg-gray-300 h-12">
                Birth
              </th>
              <th className="border-2 border-gray-400 bg-gray-300 h-12">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td>Carregando...</td>
              </tr>
            )}
            {!isLoading &&
              data
                .filter((item, index) => index < pageNumber)
                .filter(
                  (el) =>
                    el.name.first
                      .toLowerCase()
                      .indexOf(searchValue.toLowerCase()) !== -1 ||
                    el.name.last
                      .toLowerCase()
                      .indexOf(searchValue.toLowerCase()) !== -1
                )
                .map((item, index) => {
                  let full_name = item.name.first + " " + item.name.last;
                  return (
                    <tr key={index}>
                      <td className="w-4/12 text-center border-2 border-gray-400 h-12">
                        {full_name}
                      </td>
                      <td className="w-3/12 text-center border-2 border-gray-400">
                        {item.gender.toUpperCase()}
                      </td>
                      <td className="w-3/12 text-center border-2 border-gray-400">
                        {dateBuilder(item.dob.date)}
                      </td>
                      <td className="w-3/12 text-center border-2 border-gray-400">
                        <button
                          value={item.email}
                          onClick={(e) => {
                            handleUser(e);
                            setModalOpened(!modalOpened);
                          }}
                          className="bg-gray-400 w-16 h-8"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
        <div
          className="mt-5 flex justify-center items-center mx-auto h-10 font-medium cursor-pointer"
          onClick={() => {
            if (pageNumber < 50) setPageNumber(pageNumber + 10);
          }}
        >
          <ReplayIcon fontSize="large" />
          Loading more...
        </div>
      </div>
    </>
  );
}

export default UsersTable;
