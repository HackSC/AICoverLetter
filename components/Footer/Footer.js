import React from "react";
import styles from "./Footer.module.css";

const Footer = ({ mobile }) => {
  return (
    <div className={mobile ? styles.footerMobile : styles.footer}>
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
