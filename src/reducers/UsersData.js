const initialState = {
  dataUsers: [],
};

const List = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_DATA":
      return {
        dataUsers: [...state.dataUsers, action.AddData],
      };

    default:
      return state;
  }
};

export default List;
