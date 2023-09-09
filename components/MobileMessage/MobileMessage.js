import React from "react";
import styles from "./MobileMessage.module.css";

const MobileMessage = () => {
  return (
    <div className={styles.MobileMessage}>
      &#34;Thanks for visiting aicoverletter.org! We optimized this experience
      for desktop. Please go get out your computer and we&#39;ll love you
      forever.&#34;
      <br />
      <div style={{ display: "inline-block" }}>
        <p>
          -{" "}
          <a style={{ color: "white" }} href="https://danialasaria.com">
            <u>Danial</u>
          </a>{" "}
          and{" "}
          <a style={{ color: "white" }} href="https://reesebretow.com/">
            <u>Reese</u>
          </a>
        </p>
      </div>
    </div>
  );
};

export default MobileMessage;
