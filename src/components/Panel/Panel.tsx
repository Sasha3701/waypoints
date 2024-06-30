import { type PropsWithChildren, useState } from "react";

import styles from "./Panel.module.scss";

export const Panel = ({ children }: PropsWithChildren) => {
  const [isHiddenPanel, setIsHiddenPanel] = useState(true);

  return (
    <div
      style={{ opacity: isHiddenPanel ? 0.5 : 1 }}
      onMouseOver={() => setIsHiddenPanel(false)}
      onMouseOut={() => setIsHiddenPanel(true)}
      className={styles.container}
    >
      {children}
    </div>
  );
};
