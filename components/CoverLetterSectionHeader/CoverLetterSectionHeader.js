import React from "react";
import styles from "../../styles/Home.module.css";

const CoverLetterSectionHeader = ({ mobile, title, subTitle }) => {
  return <div className={styles.frameDiv13}>
  <i
    className={
      mobile
        ? styles.createYourCoverLetterMobile
        : styles.createYourCoverLetter
    }
  >
    {title}
  </i>
  <div
    className={
      mobile
        ? styles.uploadYourResumePasteTheMobile
        : styles.uploadYourResumePasteThe
    }
    style={{ paddingBottom: "10px" }}
  >
    {subTitle}
  </div>
</div>;
};

export default CoverLetterSectionHeader;
