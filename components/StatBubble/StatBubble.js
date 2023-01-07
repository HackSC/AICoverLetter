import React from "react";
import styles from "../../styles/Home.module.css";

const StatBubble = ({ mobile, percent, stat }) => {
  return (
    <div className={mobile ? styles.frameDiv5Mobile : styles.frameDiv5}>
      <div className={styles.frameDiv6}>
        <b className={styles.statWidget}>
          <span className={styles.statFontSize}>{percent}</span>
          <span className={styles.statPercentSize}>{`% `}</span>
        </b>
        <div className={styles.ofRecruitersPreferCandidate}>{stat}</div>
      </div>
    </div>
  );
};

export default StatBubble;
