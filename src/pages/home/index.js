import React, { PureComponent } from "react";
import pic from "images/a.png";
import styles from "./index.css";

export default class Home extends PureComponent {
  render() {
    return (
      <div className={styles.homeBox}>
        <div>this is Home~Welcome to JJ-cli!</div>
        <img src={pic} alt="" className={styles.srcSty} />
      </div>
    );
  }
}
