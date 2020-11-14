import axios from "axios";
import { returnErrors } from "./errorActions";
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from "./types";

// Check token & load user
export const loadUser = () => (dispatch, getState) => {
  // User Loading
  dispatch({ type: USER_LOADING });

  axios
    .get("http://localhost:5000/auth/:id", tokenConfig(getState).headers)
    .then(
      (res) =>
        dispatch({
          type: USER_LOADED,
          payload: res.data,
        }),
      console.log("tokenConfig", tokenConfig(getState))
    )
    .catch((err) => {
      console.log("Error Redux catch", err);
      dispatch({
        type: AUTH_ERROR,
      });
    });
};

// Setup config headers and token
export const tokenConfig = (getState) => {
  // Get token from localstorage
  const token = getState().auth.token;
  console.log("token Get State", token);
  // Headers
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  // If token, add to headers
  if (token) {
    config.headers["x-auth-token"] = token;
  }
  return config;
};
//Logout User
export const logout = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

// Register User
export const register = ({ username, email, password }) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  // Request body
  const body = JSON.stringify({ username, email, password });
  console.log("authActions Body", body);
  axios
    .post("http://localhost:5000/adminUsers/add", body, config)
    .then((res) =>
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
      );
      dispatch({
        type: REGISTER_FAIL,
      });
    });
};
