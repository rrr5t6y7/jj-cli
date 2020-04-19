import React, { PureComponent } from "react";
import pic from "images/a.jpg";
import styles from "./index.css";

export default class Page extends PureComponent {
  componentDidMount() {
    var scope = "global";
    function checkScope(flag) {
      if (flag) {
        scope = "local";
      }
      return scope;
    }
    console.log(checkScope(true)); // ???
    console.log(checkScope(false)); // ???
  }

  render() {
    return (
      <div className={styles.pageBox}>
        this is Page~
        <img src={pic} alt='' className={styles.srcSty} />
      </div>
    );
  }
}
