export enum PlacemarkColor {
  Start = "start",
  Middle = "middle",
  End = "end",
}

export type TPlacemarkColor = `${PlacemarkColor}`;

export interface IWaypoint {
  id: string;
  position: [number, number];
  description: string;
}
