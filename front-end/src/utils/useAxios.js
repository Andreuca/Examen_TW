import axios from "axios";

const BASE_URL = "http://localhost:8080/api/";
// const BASE_URL = `${window.location.protocol}//${window.location.hostname}:${window.location.port}/api/`;

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const get = async (url) => {
  const response = await axiosInstance.get(url);
  return response;
};

export const post = async (url, body = {}) => {
  const response = await axiosInstance.post(url, body);
  return response;
};

export const patch = async (url, body = {}) => {
  const response = await axiosInstance.patch(url, body);
  return response;
};

export const remove = async (url) => {
  const response = await axiosInstance.delete(url);
  return response;
};
