import React from "react";
import styles from "../../styles/Home.module.css";
import { TypeAnimation } from "react-type-animation";

const CompanyTagLine = ({ tagLine, mobile }) => {
  return (
    <i className={styles.landYourDreamJobAutomatic}>
    <div style={{ height: "180px" }}>
      {!mobile && (
        <TypeAnimation
          sequence={[
            tagLine,
            // "Land your dream job, automatically.",
            // 1500,
            // "Never waste time on a cover letter again.",
            // 1500,
            // "Click below to get started!",
            // 2000,
          ]}
          wrapper="div"
          cursor={true}
          repeat={false}
          deletionSpeed={65}
          style={{ all: "inherit" }}
        />
      )}
      {mobile && (
        <div
          style={{
            height: "180px",
            fontSize: "50px",
            lineHeight: "60px",
          }}
        >
          <TypeAnimation
            sequence={[
              tagLine,
            ]}
          />
        </div>
      )}
    </div>
  </i>
  );
};

export default CompanyTagLine;