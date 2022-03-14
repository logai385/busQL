import Axios from "axios";
import { API_URL, TOKEN_KEY } from "../ultil/systemSettings";
const headers = { Authorization: "Bearer " + localStorage.getItem(TOKEN_KEY) };
export class BaseService {
  get = (url) => {
    return Axios({
      url: `${API_URL}/${url}`,
      method: "GET",
      headers,
    });
  };
  put = (url, model) => {
    return Axios({
      url: `${API_URL}/${url}`,
      method: "PUT",
      data: model,
      headers,
    });
  };
  post = (url, model) => {
    return Axios({
      url: `${API_URL}/${url}`,
      method: "POST",
      data: model,
      headers,
    });
  };
  delete = (url) => {
    return Axios({
      url: `${API_URL}/${url}`,
      method: "DELETE",
      headers,
    });
  };
}
