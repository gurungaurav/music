import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

// const token = localStorage.getItem("token")?.replace(/"/g, "");

export const url = axios.create({
  baseURL: baseURL,
  withCredentials: true, // Include credentials (cookies) in requests
  headers: {
    Authorization: `Bearer `,
  },
});
