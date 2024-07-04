import { YMaps } from "@pbe/react-yandex-maps";
import { useCallback, useState } from "react";

import { CreateWaypoint, Map, Panel, Waypoints } from "./components";
import { useWaypoints } from "./hooks";
import styles from "./App.module.scss";

export const App = () => {
  const [errorLoadMap, setErrorLoadMap] = useState<string | null>(null);
  const [map, setMap] = useState<ymaps.Map | null>(null);

  const { onAdd, onChangePosition, onMove, onRemove, waypoints } =
    useWaypoints();

  const handleError = useCallback(
    (err: Error | null) => setErrorLoadMap(err ? err.message : null),
    [],
  );

  const handleMap = useCallback((map: ymaps.Map) => setMap(map), []);

  if (errorLoadMap) {
    return <div className={styles.error}>{errorLoadMap}</div>;
  }

  return (
    <YMaps>
      <Panel>
        <CreateWaypoint onAdd={onAdd} map={map} />
        <Waypoints onMove={onMove} onRemove={onRemove} waypoints={waypoints} />
      </Panel>
      <Map
        onMap={handleMap}
        onError={handleError}
        onChangePosition={onChangePosition}
        waypoints={waypoints}
      />
    </YMaps>
  );
};
