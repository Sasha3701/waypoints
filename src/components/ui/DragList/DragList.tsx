import { type ReactNode, useRef } from "react";
import srcRubbish from "src/assets/rubbish.svg";

import styles from "./DragList.module.scss";

interface IProps<T> {
  readonly onMove: (list: Array<T>) => void;
  readonly onRemove: (item: T) => void;
  readonly renderItemContent: (item: T, index: number) => ReactNode;
  readonly list: Array<T>;
}

export const DragList = <T extends { id: string }>({
  onRemove,
  onMove,
  renderItemContent,
  list,
}: IProps<T>) => {
  const dragItemRef = useRef<number>(0);
  const draggedOverItemRef = useRef<number>(0);

  const handleChange = () => {
    const itemsClone = [...list];
    const temp = itemsClone[dragItemRef.current];
    itemsClone[dragItemRef.current] = itemsClone[draggedOverItemRef.current];
    itemsClone[draggedOverItemRef.current] = temp;
    onMove(itemsClone);
  };

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {list.map((item, index) => (
          <li
            className={styles.item}
            key={item.id}
            onDragStart={() => (dragItemRef.current = index)}
            onDragEnter={() => (draggedOverItemRef.current = index)}
            onDragEnd={handleChange}
            onDragOver={(e) => e.preventDefault()}
            draggable
          >
            <div className={styles.item__content}>
              {renderItemContent(item, index)}
              <button className={styles.button}>
                <img
                  className={styles.img}
                  onClick={() => onRemove(item)}
                  src={srcRubbish}
                  alt="remove-item"
                />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
