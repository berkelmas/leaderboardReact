import axios from "axios";
import { config } from "../config";

export const getAllLeaderboard = (pageNumber, pageSize) => {
  return axios.get(
    `${config.apiEndpoint}leaderboard?pageStart=${pageNumber}&pageSize=${pageSize}`
  );
};

export const getLeaderboardByCountry = (pageNumber, pageSize, countryCode) => {
  return axios.get(
    `${config.apiEndpoint}leaderboard/${countryCode}?pageStart=${pageNumber}&pageSize=${pageSize}`
  );
};
