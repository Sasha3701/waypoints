import { useCallback, useState } from "react";
import { type IWaypoint } from "src/types";

export const useWaypoints = () => {
  const [waypoints, setWaypoints] = useState<Array<IWaypoint>>([]);

  const handleAdd = useCallback(
    (waypoint: IWaypoint) =>
      setWaypoints((prevState) => [...prevState, waypoint]),
    [],
  );

  const handleRemove = useCallback(
    (waypoint: IWaypoint) =>
      setWaypoints((prevState) =>
        prevState.filter(({ id }) => id !== waypoint.id),
      ),
    [],
  );

  const handleMove = useCallback(
    (waypoints: Array<IWaypoint>) => setWaypoints(waypoints),
    [],
  );

  const handleChangePosition = useCallback(
    (waypoint: IWaypoint, newWaypoint: IWaypoint) =>
      setWaypoints((prevState) =>
        prevState.map((innerWaypoint) => {
          if (innerWaypoint.id === waypoint.id) {
            return { ...newWaypoint, id: JSON.stringify(newWaypoint.position) };
          }

          return innerWaypoint;
        }),
      ),
    [],
  );

  return {
    onAdd: handleAdd,
    onRemove: handleRemove,
    onMove: handleMove,
    onChangePosition: handleChangePosition,
    waypoints,
  };
};
