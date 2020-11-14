import React, { Fragment } from "react";
import { NavLink } from "reactstrap";
import { useDispatch } from "react-redux";
import { logout } from "../../actions/authActions";

export const Logout = () => {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <Fragment>
      <NavLink onClick={logoutHandler} href="#">
        Logout
      </NavLink>
    </Fragment>
  );
};

export default Logout;
