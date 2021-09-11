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

  const filterItems = (arr, query) => {
    return arr.filter(
      (el) => el.name.first.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  };
  let newObj = filterItems(data, searchValue);

  return (
    <>
      <input
        type="text"
        onChange={(e) => setSearchValue(e.target.value)}
        value={searchValue}
      />
      <table className="table-auto">
        <thead>
          <tr>
            <th>
              Name <button onClick={() => sorting()}>sort</button>
            </th>
            <th>Gender</th>
            <th>Birth</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {isLoading && (
            <tr>
              <td>Carregando...</td>
            </tr>
          )}
          {!isLoading &&
            newObj
              .filter((item, index) => index < pageNumber)
              .map((item, index) => {
                let full_name = item.name.first + " " + item.name.last;
                return (
                  <tr key={index}>
                    <td>{full_name}</td>
                    <td>{item.gender}</td>
                    <td>{dateBuilder(item.dob.date)}</td>
                    <td>Botao</td>
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
    </>
  );
}

export default UsersTable;
