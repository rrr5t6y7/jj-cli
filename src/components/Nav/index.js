import React from "react";
import { Link } from "react-router-dom";
import styles from "./index.scss";

export default () => {
  return (
    <div className={styles.navBox}>
      <ul>
        <li>
          <Link to="/">首页</Link>
        </li>
        <li>
          <Link to="/page">Page</Link>
        </li>
        <li>
          <Link to="/counter">Counter</Link>
        </li>
        <li>
          <Link to="/userinfo">UserInfo</Link>
        </li>
      </ul>
    </div>
  );
};
