import { FcContacts } from "react-icons/fc";
import css from "./HomePage.module.css";

export default function Home() {
  return (
    <div className={css.container}>
      <FcContacts className={css.icon} />
      <h1 className={css.title}>Welcome to Phone book</h1>
    </div>
  );
}
