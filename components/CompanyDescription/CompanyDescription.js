import React from "react";
import styles from "../../styles/Home.module.css";

const CompanyDescription = ({ description }) => {
  return <div className={styles.itOnlyTakes30Seconds}>{description}</div>;
};

export default CompanyDescription;
