import cookie from "js-cookie";
import axios from "axios";
import { baseURL } from "./constant";

export const setCookie = (key, value) => {
  cookie.set(key, value, { expires: 1 });  // Set cookie with expiration of 1 day
};

export const removeCookie = (key) => {
  cookie.remove(key);  // Remove cookie by key
};

export const getCookie = (key) => {
  return cookie.get(key);  // Get cookie value by key
};

export const setAuthentication = (token) => {
  setCookie("token", token);  // Set authentication token as a cookie named "token"
};

export const logOut = () => {
  removeCookie("token");  // Remove authentication token cookie to log out
};

export const isLogin = async () => {
  const token = getCookie("token");  // Get authentication token from cookie

  if (token) {
    try {
      const res = await axios.post(`${baseURL}/auth`, { token });  // Send POST request to verify token
      return res.data;  // Return response data which typically contains authentication status
    } catch (error) {
      console.error("Error checking login status:", error);
      return false;  // Return false if there's an error or token is invalid
    }
  }
  return false;  // Return false if no token found
};
