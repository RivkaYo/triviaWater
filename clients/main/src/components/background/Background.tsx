import { type FC, type ReactNode } from "react";
import clsx from "clsx";

import leftImage from "/images/banana-leaf2.svg";
import rightImage from "/images/banana-leaf1.svg";

import "./background.scss";

const Background: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="web-background">
      <img
        className={clsx("leaf", "left-leaf")}
        src={leftImage}
        alt="pic of banana leaf"
      />
      <img
        className={clsx("leaf", "right-leaf")}
        src={rightImage}
        alt="pic of banana leaf"
      />
      <div className="background-content">{children}</div>
    </div>
  );
};

export default Background;
