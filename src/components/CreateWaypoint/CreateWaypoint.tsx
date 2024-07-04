import { useState, type KeyboardEvent, type ChangeEvent, memo } from "react";

import { type IWaypoint } from "src/types";
import srcSearch from "src/assets/search.svg";
import styles from "./CreateWaypoint.module.scss";

interface IProps {
  readonly onAdd: (waypoint: IWaypoint) => void;
  readonly map: ymaps.Map | null;
}

export const CreateWaypoint = memo(({ onAdd, map }: IProps) => {
  const [value, setValue] = useState<string>("");

  const handlePressEnter = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (map && e.code === "Enter" && value.trim()) {
      const position = map.getCenter() as [number, number];

      const waypoint: IWaypoint = {
        id: JSON.stringify(position),
        description: value,
        position,
      };

      onAdd(waypoint);
      setValue("");
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);

  return (
    <label>
      <input
        className={styles.input}
        value={value}
        onChange={handleChange}
        onKeyDown={handlePressEnter}
        placeholder="Введите новую точку маршрута..."
      />
      <img className={styles.icon} src={srcSearch} alt="search-icon" />
    </label>
  );
});
