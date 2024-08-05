const defaultStateData = {
  data: {},
};

function asyncDataReducer(state, action) {
  switch (action.type) {
    case 2:
      return { ...state, data: { ...state.data } };
    default:
      return state;
  }
}
