import { type TPlacemarkColor } from "src/types";

export const DEFAULT_STATE_MAP = {
  center: [55.739625, 37.5412],
  zoom: 7,
};

export const hashColorPlacemark: Record<TPlacemarkColor, string> = {
  start: "#00ff00",
  middle: "#ff9900",
  end: "#ff0000",
};
