import React, { useEffect, useState } from "react";
import Home from "./pages/Home";
import { usersApi } from "./services/api";
import { useDispatch } from "react-redux";

function App() {
  // const [allUsersData, setAllUsersData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    usersApi.get("/api/?page=1&results=50").then((res) => {
      dispatch({
        type: "ADD_DATA",
        AddData: res.data.results,
      });
    });
  }, []);

  return (
    <>
      <Home></Home>
    </>
  );
}

export default App;
