import React from "react";
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <>
      <h1 className={styles["main-text"]}>Hacker News</h1>
      <hr />
      <h2 className={styles["sub-text"]}>
        10 random stories from hacker news api <br />
        you never knew <span className={styles.highlight}> you needed</span>
      </h2>
    </>
  );
};

export default Header;
