import { PlacemarkColor, type TPlacemarkColor } from "src/types";

export const checkOnStartEnd = <T>(
  currentItemIndex: number,
  items: Array<T>,
): TPlacemarkColor => {
  const length = items.length;

  if (currentItemIndex === 0) {
    return PlacemarkColor.Start;
  } else if (currentItemIndex === length - 1) {
    return PlacemarkColor.End;
  }

  return PlacemarkColor.Middle;
};
