import React from "react";
import { Nav } from "./styled";
import {
  FaHome,
  FaSignInAlt,
  FaUserAlt,
  FaCircle,
  FaPowerOff
} from "react-icons/fa";

import * as actions from "../../store/modules/auth/actions";
import history from "../../services/history";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

export default function Header() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  function handleLogout(e) {
    e.preventDefault();

    dispatch(actions.loginFailure());

    history.push("/");
  }

  return (
    <Nav>
      <Link to="/">
        <FaHome size={24} />
      </Link>
      <Link to="/register">
        <FaSignInAlt size={24} />
      </Link>

      {isLoggedIn ? (
        <Link onClick={handleLogout} to="/login">
          <FaPowerOff size={24} />
        </Link>
      ) : (
        <Link to="/login">
          <FaUserAlt size={24} />
        </Link>
      )}

      {isLoggedIn && <FaCircle size={24} color={"#66ff33"} />}
    </Nav>
  );
}
