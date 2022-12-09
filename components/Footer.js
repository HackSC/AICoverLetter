import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.footer}>
        Made with ❤️ by{" "}
        <a
            href="https://linktr.ee/danial_asaria">
            <u>Danial Asaria</u>
        </a>
    </div>
  );
};

export default Footer;
