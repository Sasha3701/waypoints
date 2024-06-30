import { PlacemarkColor, type TPlacemarkColor } from "src/types";

export function debounce<F extends (...args: Parameters<F>) => ReturnType<F>>(
  func: F,
  waitFor: number,
): (...args: Parameters<F>) => void {
  let timeout: ReturnType<typeof setTimeout>;

  return (...args: Parameters<F>): void => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), waitFor);
  };
}

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
