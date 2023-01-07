import React from "react";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <div className={styles.headerDiv}>
      <h1 className={styles.headerText}>AI Cover Letter</h1>
    </div>
  );
};

export default Header;
