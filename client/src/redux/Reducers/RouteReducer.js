const initialState = {
  history: {},
};

const RouteReducer = (state = initialState, action) => {
  const { type, history } = action;
  switch (type) {
    case "SET_HISTORY":
      return { ...state, history };

    default:
      return { ...state };
  }
};
export default RouteReducer;
