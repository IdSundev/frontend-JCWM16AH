const initialState = {
  inventories: [],
  isLoadingInventories: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "SET_INVENTORIES":
      return {
        ...state,
        inventories: action.payload,
      };
    case "IS_LOADING_INVENTORIES":
      return {
        ...state,
        isLoadingInventories: action.payload,
      }
    default:
      return state;
  }
};
