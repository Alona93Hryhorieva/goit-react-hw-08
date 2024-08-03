import clsx from "clsx";
import { NavLink } from "react-router-dom";
import css from "./AuthNav.module.css";

export default function AuthNav() {
  const classNameActive = ({ isActive }) => {
    return clsx(css.link, isActive && css.isActive);
  };

  return (
    <div>
      <NavLink className={classNameActive} to="/register">
        Register
      </NavLink>
      <NavLink className={classNameActive} to="/login">
        Log In
      </NavLink>
    </div>
  );
}
