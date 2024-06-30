import { memo, useMemo } from "react";
import {
  Map as BaseMap,
  Placemark,
  Polyline,
  useYMaps,
} from "@pbe/react-yandex-maps";
import ymaps from "yandex-maps";

import { type IWaypoint } from "src/types";
import { DEFAULT_STATE_MAP, hashColorPlacemark } from "src/constants";
import { checkOnStartEnd, debounce } from "src/utils";

interface IProps {
  readonly onError: (err: Error | null) => void;
  readonly onChangePosition: (
    waypoint: IWaypoint,
    newWaypoint: IWaypoint,
  ) => void;
  readonly waypoints: Array<IWaypoint>;
}

export const Map = memo(({ onError, onChangePosition, waypoints }: IProps) => {
  const ymaps = useYMaps(["Map", "geocode"]);
  const mapState = useMemo<ymaps.IMapState>(() => {
    if (waypoints.length) {
      return {
        center: waypoints[waypoints.length - 1].position,
        zoom: 12,
      };
    }

    return DEFAULT_STATE_MAP;
  }, [waypoints]);

  const lines = useMemo<Array<Array<number>>>(() => {
    if (waypoints.length > 1) {
      return waypoints.map(({ position }) => position);
    }

    return [];
  }, [waypoints]);

  return (
    <BaseMap
      width="100vw"
      height="100vh"
      state={mapState}
      onError={onError}
      onLoad={() => onError(null)}
    >
      {waypoints.map((waypoint, index) => (
        <Placemark
          key={waypoint.id}
          modules={["geoObject.addon.balloon"]}
          geometry={waypoint.position}
          properties={{
            balloonContentBody: waypoint.description,
            iconContent: index + 1,
          }}
          options={{
            draggable: true,
            hasBalloon: true,
            iconColor: hashColorPlacemark[checkOnStartEnd(index, waypoints)],
          }}
          instanceRef={(ref) => {
            if (ref) {
              ref.events.add("drag", () => {
                const newCoords = (
                  ref as ymaps.Map & {
                    geometry: {
                      getCoordinates: () => [number, number];
                    };
                  }
                ).geometry.getCoordinates();

                if (ymaps) {
                  debounce(() => {
                    ymaps.geocode(newCoords, { results: 1 }).then((res) => {
                      const firstGeoObject = res.geoObjects.get(0);

                      const newWaypoint: IWaypoint = {
                        id: waypoint.id,
                        position: newCoords,
                        description: (
                          firstGeoObject as unknown as {
                            getAddressLine: () => string;
                          }
                        ).getAddressLine(),
                      };

                      onChangePosition(waypoint, newWaypoint);
                    });
                  }, 2000)();
                }
              });
            }
          }}
        />
      ))}
      <Polyline
        geometry={lines}
        options={{
          strokeColor: "#aa00ff",
          strokeWidth: 2,
        }}
      />
    </BaseMap>
  );
});
