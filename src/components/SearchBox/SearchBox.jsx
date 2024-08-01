import { useDispatch, useSelector } from "react-redux";
import { changeFilter } from "../../redux/filters/filtersSlice";
import { selectFilterName } from "../../redux/filters/filtersSlice";

import css from "../SearchBox/SearchBox.module.css";

export default function SearchBox() {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilterName) || "";
  const handleChange = (event) => dispatch(changeFilter(event.target.value));

  return (
    <div className={css.container}>
      <label className={css.label}>Find contacts by name</label>
      <input
        name="filter"
        type="text"
        value={filter}
        onChange={handleChange}
        placeholder="Enter name..."
      />
    </div>
  );
}
