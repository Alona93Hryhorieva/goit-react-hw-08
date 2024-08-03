import { useDispatch, useSelector } from "react-redux";
import { setFilterNumber, setFilterName } from "../../redux/filters/slice";
import {
  selectFilterName,
  selectFilterNumber,
} from "../../redux/filters/selectors";

import css from "../SearchBox/SearchBox.module.css";

export default function SearchBox() {
  const dispatch = useDispatch();
  const filterName = useSelector(selectFilterName) || "";
  const filterNumber = useSelector(selectFilterNumber);

  const handleChangeName = (event) =>
    dispatch(setFilterName(event.target.value));

  const handleChangeNumber = (event) =>
    dispatch(setFilterNumber(event.target.value));

  return (
    <div className={css.container}>
      <label className={css.label}>Find contacts by name</label>
      <input
        name="filter-name"
        type="text"
        value={filterName}
        onChange={handleChangeName}
        placeholder="Enter name..."
        className={css.input}
      />
      <label className={css.label}>Find contacts by number</label>
      <input
        name="filter-number"
        type="text"
        value={filterNumber}
        onChange={handleChangeNumber}
        placeholder="Enter number..."
        className={css.input}
      />
    </div>
  );
}
