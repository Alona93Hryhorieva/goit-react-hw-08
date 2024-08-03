import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectors";
import css from "./UserMenu.module.css";
import { logout } from "../../redux/auth/operations";

export default function UserMenu() {
  const disaptch = useDispatch();
  const user = useSelector(selectUser);
  const handleLogout = () => {
    disaptch(logout());
  };

  return (
    <div className={css.container}>
      <p className={css.userName}>Welcome, {user.name}</p>
      <button type="button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}
