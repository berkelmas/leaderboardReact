import axios from "axios";
import { config } from "../config";

export const addNewUser = (username, country) => {
  return axios.post(`${config.apiEndpoint}user/create`, {
    display_name: username,
    country,
  });
};
