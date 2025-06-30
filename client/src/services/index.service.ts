import { getCookies } from "@/utils/cookies-handler";
import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

// const token = localStorage.getItem("token")?.replace(/"/g, "");
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSGVuY3kiLCJpZCI6IjY3OTBiNTFiLWQxYWQtNDIyMy05ZDYzLTc2MDk5Mzg2ODMyMSIsImVtYWlsIjoibmV3QGdtYWlsLmNvbSIsInBpY3R1cmUiOiJodHRwczovL3Jlcy5jbG91ZGluYXJ5LmNvbS9kcjFnaWV4aG4vaW1hZ2UvdXBsb2FkL3YxNzE1NDM1NjU5L3VzZXJQcm9maWxlL3BmcF9laHlnM2UucG5nIiwiaWF0IjoxNzI5MDg1MzMyLCJleHAiOjE3Mjk5NDkzMzJ9.aVIeg4aOyESoUySc-suFIuq3T5JJpE0wXNYALsA6Uy4";

export const url = axios.create({
  baseURL: baseURL,
  withCredentials: true, // Include credentials (cookies) in requests
  headers: {
    Authorization: `Bearer ${token} `,
  },
});
