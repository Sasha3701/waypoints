import { YMaps } from "@pbe/react-yandex-maps";
import { useCallback, useState } from "react";

import { CreateWaypoint, Map, Panel, Waypoints } from "./components";
import { useWaypoints } from "./hooks";
import { API_KEY } from "./constants";
import styles from "./App.module.scss";

export const App = () => {
  const [errorLoadMap, setErrorLoadMap] = useState<string | null>(null);

  const { onAdd, onChangePosition, onMove, onRemove, waypoints } =
    useWaypoints();

  const handleError = useCallback(
    (err: Error | null) => setErrorLoadMap(err ? err.message : null),
    [],
  );

  if (errorLoadMap) {
    return <div className={styles.error}>{errorLoadMap}</div>;
  }

  return (
    <YMaps query={{ apikey: API_KEY }}>
      <Panel>
        <CreateWaypoint onAdd={onAdd} />
        <Waypoints onMove={onMove} onRemove={onRemove} waypoints={waypoints} />
      </Panel>
      <Map
        onError={handleError}
        onChangePosition={onChangePosition}
        waypoints={waypoints}
      />
    </YMaps>
  );
};
