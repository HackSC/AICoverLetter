import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.footer}>
      Made with ❤️ by{" "}
      {/*temporarily deciding against linktree as my website includes all links*/}
      <a style={{ color: "white" }} href="https://danialasaria.com/about">
        <u>Danial</u>
      </a>{" "}
      and{" "}
      <a style={{ color: "white" }} href="https://reesebretow.com/">
        <u>Reese</u>
      </a>
    </div>
  );
};

export default Footer;
