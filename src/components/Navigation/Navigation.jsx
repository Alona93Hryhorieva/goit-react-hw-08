import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";
import { useSelector } from "react-redux";
import clsx from "clsx";
import { selectIsLoggedIn } from "../../redux/auth/selectors";

export default function Navigation() {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const classNameActive = ({ isActive }) => {
    return clsx(css.link, isActive && css.isActive);
  };

  return (
    <nav>
      <NavLink className={classNameActive} to="/">
        Home
      </NavLink>
      {isLoggedIn && (
        <NavLink className={classNameActive} to="/contacts">
          Contacts
        </NavLink>
      )}
    </nav>
  );
}
