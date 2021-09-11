import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function UsersTable() {
  const dataUsers = useSelector((state) => state.UsersData.dataUsers);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

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

  return (
    <>
      <table className="table-auto">
        <thead>
          <tr>
            <th>Name</th>
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
            data.map((item, index) => {
              return (
                <tr key={index}>
                  <td>
                    {item.name.title +
                      "." +
                      " " +
                      item.name.first +
                      " " +
                      item.name.last}
                  </td>
                  <td>{item.gender}</td>
                  <td>{dateBuilder(item.dob.date)}</td>
                  <td>Botao</td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <button onClick={() => {}}>Load more</button>
    </>
  );
}

export default UsersTable;
