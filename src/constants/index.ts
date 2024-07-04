import { type TPlacemarkColor } from "src/types";

export const API_KEY =
  (import.meta.env.VITE_YANDEX_KEY as string) ||
  "b14d1c6c-fba1-49a9-82d6-f14b01d24f4d";

export const DEFAULT_STATE_MAP = {
  center: [55.739625, 37.5412],
  zoom: 7,
};

export const hashColorPlacemark: Record<TPlacemarkColor, string> = {
  start: "#00ff00",
  middle: "#ff9900",
  end: "#ff0000",
};
