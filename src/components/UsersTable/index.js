import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function UsersTable() {
  const dataUsers = useSelector((state) => state.UsersData.dataUsers);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [pageNumber, setPageNumber] = useState(10);
  const [order, setOrder] = useState(1);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    if (dataUsers[0] === undefined) {
      setIsLoading(true);
    } else {
      setData(dataUsers[0]);
      setIsLoading(false);
    }
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

  return (
    <>
      <div className="container lg flex flex-col mx-auto">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem id quas
          reprehenderit, rerum quod architecto. Aspernatur, animi vitae magnam
          ratione quod similique mollitia, sunt, sit ut blanditiis iure possimus
          nulla?
        </p>
        <input
          placeholder="Searching"
          className="mt-10 h-12 p-3 rounded border-2"
          type="text"
          onChange={(e) => setSearchValue(e.target.value)}
          value={searchValue}
        />
        <table className="mt-10 border-collapse border-2 border-black-100">
          <thead>
            <tr>
              <th className="border-2 border-gray-400 bg-gray-300 h-12">
                Name <button onClick={() => sorting()}>sort</button>
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
                      <td className="text-center border-2 border-gray-400 h-12">
                        {full_name}
                      </td>
                      <td className="text-center border-2 border-gray-400">
                        {item.gender.toUpperCase()}
                      </td>
                      <td className="text-center border-2 border-gray-400">
                        {dateBuilder(item.dob.date)}
                      </td>
                      <td className="text-center border-2 border-gray-400">
                        <button className="bg-gray-400 w-16 h-8">View</button>
                      </td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
        <button
          onClick={() => {
            if (pageNumber < 50) setPageNumber(pageNumber + 10);
          }}
        >
          Load More
        </button>
      </div>
    </>
  );
}

export default UsersTable;
