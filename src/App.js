import React, { useEffect } from "react";
import Home from "./pages/Home";
import { usersApi } from "./services/api";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  // const dataUsers = useSelector((state) => state.UsersData.dataUsers);
  const pageNumber = useSelector((state) => state.Pagination.pageNumber);

  console.log(pageNumber);
  useEffect(() => {
    usersApi
      .get(`/api/?page=1&results=${pageNumber[0]}&seed=foobar`)
      .then((res) => {
        dispatch({
          type: "ADD_DATA",
          AddData: res.data.results,
        });
      });
    // eslint-disable-next-line
  }, [pageNumber[0]]);

  return (
    <Switch>
      <Route exact path="/" children={<Home />} />
      <Route path="/profile/:id" children={<Home />} />
    </Switch>
  );
}

export default App;
