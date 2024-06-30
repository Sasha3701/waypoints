import { type IWaypoint } from "src/types";
import { DragList } from "../ui";
import { memo } from "react";
import styles from "./Waypoints.module.scss";

interface IProps {
  readonly onMove: (waypoints: Array<IWaypoint>) => void;
  readonly onRemove: (waypoint: IWaypoint) => void;
  readonly waypoints: Array<IWaypoint>;
}

export const Waypoints = memo(({ onMove, onRemove, waypoints }: IProps) => (
  <DragList<IWaypoint>
    onMove={onMove}
    onRemove={onRemove}
    renderItemContent={(item, index) => (
      <>
        <span>({index + 1})</span>
        <span className={styles.content}>{item.description}</span>
      </>
    )}
    list={waypoints}
  />
));
