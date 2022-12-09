import React, { useState } from "react";
import styles from "../../../styles/Home.module.css";

  const Footer = () => {

  return (
    <div className={styles.footer}>
        Made with ❤️ by 
        <a
            href="https://linktr.ee/danial_asaria">
            <u>Danial Asaria</u>
        </a>
    </div>
  );
};

export default Footer;
