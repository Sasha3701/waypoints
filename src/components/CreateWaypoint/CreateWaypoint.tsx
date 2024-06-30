import { useState, type KeyboardEvent, type ChangeEvent, memo } from "react";

import { type IWaypoint } from "src/types";
import srcSearch from "src/assets/search.svg";
import styles from "./CreateWaypoint.module.scss";
import { useYMaps } from "@pbe/react-yandex-maps";

interface IProps {
  readonly onAdd: (waypoint: IWaypoint) => void;
}

export const CreateWaypoint = memo(({ onAdd }: IProps) => {
  const ymaps = useYMaps(["Map", "geocode"]);
  const [value, setValue] = useState<string>("");

  const handlePressEnter = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (ymaps && e.code === "Enter" && value.trim()) {
      try {
        const data = await ymaps.geocode(value, { results: 1 });
        const firstGeoObject = data.geoObjects.get(0);
        const position = (
          firstGeoObject?.geometry as unknown as {
            getCoordinates: () => [number, number];
          }
        )?.getCoordinates();

        const waypoint: IWaypoint = {
          id: JSON.stringify(position),
          position: position,
          description: value,
        };

        onAdd(waypoint);
      } catch (e) {
        // В будущем добавить 'красивую' обработку ошибки(notification, alert и т.д.)
        console.log(e);
      } finally {
        setValue("");
      }
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
