const initialState = {
  pageNumber: [50],
};

const Pagination = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_PAGE":
      return {
        ...state,
        pageNumber: [action.pages],
      };
    default:
      return state;
  }
};

export default Pagination;
