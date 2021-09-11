import React, { useEffect, useState } from "react";
import Home from "./pages/Home";
import { usersApi } from "./services/api";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    usersApi.get(`/api/?page=${pageNumber}&results=50`).then((res) => {
      dispatch({
        type: "ADD_DATA",
        AddData: res.data.results,
      });
    });
  }, [pageNumber]);

  // useEffect(() => {
  //   setPageNumber(page);
  // }, [page]);

  return (
    <>
      <Home></Home>
    </>
  );
}

export default App;
