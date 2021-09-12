const initialState = {
  dataUsers: [],
  selectUser: [],
};

const List = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_DATA":
      return {
        ...state,
        dataUsers: [...state.dataUsers, action.AddData],
      };
    case "ADD_USER":
      return { ...state, selectUser: [action.select] };

    default:
      return state;
  }
};

export default List;
