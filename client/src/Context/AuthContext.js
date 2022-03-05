import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "../redux/Reducers/AuthReducer";
import {
  API_URL,
  LOCAL_STOGARE_TOKEN_NAME,
} from "../util/Constants/SystemSettings";
import Axios from "axios";
import { SET_AUTHTOKEN } from "../redux/Constants/AuthConst";
import setAuthToken from "../util/SetAuthToken";
export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(AuthReducer, {
    authLoading: true,
    isAuthenticated: false,
    user: null,
  });
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem(LOCAL_STOGARE_TOKEN_NAME);
    if (token) {
      setAuthToken(token);
      try {
        const { data, status } = await Axios({
          url: `${API_URL}/auth`,
          method: "GET",
        });
        
        if (data.success) {
          dispatch({
            type: SET_AUTHTOKEN,
            payload: {
              isAuthenticated: true,
              user: data.user,
            },
          });
        }
      } catch (error) {
        
      }
    } else {
      setAuthToken(null);

      dispatch({
        type: SET_AUTHTOKEN,
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
    }
  };
  const loginUser = async (loginForm) => {
    try {
      const res = await Axios({
        url: `${API_URL}/Auth/login`,
        method: "POST",
        data: loginForm,
      });
      if (res.data.success) {
        localStorage.setItem(LOCAL_STOGARE_TOKEN_NAME, res.data.accessToken);
        checkAuth();
      }

      return res.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      return { success: false, message: error.message };
    }
  };
  const AuthContextData = { authState, loginUser };
  return (
    <AuthContext.Provider value={AuthContextData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
