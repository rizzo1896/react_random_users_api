import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SortByAlphaIcon from "@material-ui/icons/SortByAlpha";
import ReplayIcon from "@material-ui/icons/Replay";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import { Link } from "react-router-dom";
import { LoadingScene } from "../index";

function UsersTable() {
  const dataUsers = useSelector((state) => state.UsersData.dataUsers);

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [pageNumber, setPageNumber] = useState(10);
  const [order, setOrder] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [genderFilter, setGenderFilter] = useState(1);

  useEffect(() => {
    if (dataUsers[0] === undefined) {
      setIsLoading(true);
    } else {
      setData(dataUsers[0]);
      setIsLoading(false);
    }
    // eslint-disable-next-line
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

  const genderSorting = () => {
    if (genderFilter === 1) {
      const sorted = [...data].sort((a, b) => (a.gender > b.gender ? 1 : -1));
      setData(sorted);
      setGenderFilter(2);
    }
    if (genderFilter === 2) {
      const sorted = [...data].sort((a, b) => (a.gender < b.gender ? 1 : -1));
      setData(sorted);
      setGenderFilter(3);
    }
    if (genderFilter === 3) {
      setData(dataUsers[0]);
      setGenderFilter(1);
    }
  };

  return (
    <>
      <div className="container max-w-6xl flex flex-col mx-auto h-screen lg:px-5 md:px-5 sm:px-5">
        <p className="font-medium text-lg text-justify">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem id quas
          reprehenderit, rerum quod architecto. Aspernatur, animi vitae magnam
          ratione quod similique mollitia, sunt, sit ut blanditiis iure possimus
          nulla?
        </p>
        <div className="w-full relative">
          <input
            placeholder="Searching"
            className="mt-10 h-12 p-3 w-full rounded border-2 text-lg transition duration-500 ease-linear"
            type="text"
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
          />
          <div
            onClick={() => {
              if (searchValue.length > 0) {
                setSearchValue("");
              }
            }}
            className="absolute top-12 right-2"
          >
            {(searchValue.length === 0 && (
              <SearchIcon fontSize="large" color="action" />
            )) ||
              (searchValue.length > 0 && (
                <CloseIcon fontSize="large" color="action" />
              ))}
          </div>
        </div>

        <table className="table-fixed mt-10 border-collapse border-2 border-black-100">
          <thead>
            <tr>
              <th className="border-2 border-gray-400 bg-gray-300 h-12 relative">
                Name
                <div className="absolute right-1 top-3">
                  <button onClick={() => sorting()}>
                    <SortByAlphaIcon fontSize="small" />
                  </button>
                </div>
              </th>
              <th className="border-2 border-gray-400 bg-gray-300 h-12 relative">
                Gender
                <div className="absolute right-1 top-3 cursor-pointer">
                  <button onClick={() => genderSorting()}>
                    <SortByAlphaIcon fontSize="small" />
                  </button>
                </div>
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
                      .indexOf(searchValue.toLowerCase()) !== -1 ||
                    el.nat.toLowerCase().indexOf(searchValue.toLowerCase()) !==
                      -1
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
                        <Link
                          to={{
                            pathname: `/profile/${item.login.uuid}`,
                          }}
                          value={item.login.uuid}
                          className="bg-gray-400 w-16 h-8 md:w-20 sm:w-10 md:py-1 md:px-2 xl:px-2 xl:py-1"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
        {isLoading && <LoadingScene />}
        <div
          className="mt-5 mb-5 flex justify-center items-center mx-auto h-10 font-medium cursor-pointer"
          onClick={() => {
            if (pageNumber < 50) setPageNumber(pageNumber + 10);
          }}
        >
          <ReplayIcon fontSize="large" />
          Loading more...
        </div>
        <div className="">&nbsp;</div>
      </div>
    </>
  );
}

export default UsersTable;
