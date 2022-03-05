import { SET_AUTHTOKEN } from "../Constants/AuthConst";

const AuthReducer = (state, action) => {
  const { type, payload } = action;
  const { isAuthenticated, user } = payload;
  switch (type) {
    case SET_AUTHTOKEN:      
      return { ...state, authLoading: false, isAuthenticated, user };
    default:
      return { ...state };
  }
};
export default AuthReducer;
