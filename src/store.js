import { createStore } from "redux";

import Reduces from "./reducers";

const store = createStore(
  Reduces,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
