import Axios from "axios";
import { API_URL } from "../util/Constants/SystemSettings";

class authService {
  constructor() {}
  loginUser = (userForm) => {
    return Axios({
      url: `${API_URL}/auth/login`,
      method: "POST",
      data: userForm,
    });
  };
}
const AuthService = new authService();

export default AuthService;