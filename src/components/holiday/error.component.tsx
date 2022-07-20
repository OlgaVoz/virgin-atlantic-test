import { h, JSX } from "preact";
import * as styles from "./error.module.less";

export const ErrorComponent = () => {
  return <div className={styles["error"]}>Error. Please reload a page</div>;
};

export default ErrorComponent;
