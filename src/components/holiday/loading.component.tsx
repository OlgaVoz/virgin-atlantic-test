import { h, JSX } from "preact";
import * as styles from "./loading.module.less";

export const LoadingComponent = () => {
  return <div className={styles["loading"]}>Loading...</div>;
};

export default LoadingComponent;
