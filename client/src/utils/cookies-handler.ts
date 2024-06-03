import Cookies from "js-cookie";

export const getCookies = () => {
  console.log(Cookies.get("token"));
  return Cookies.get("token");
};
