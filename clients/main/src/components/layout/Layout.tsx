import type { FC } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { isMobile } from "react-device-detect";

import Background from "../background/Background";
import NavBar from "../nav-bar/NabBar";
import MobileBackground from "../common/background/MobileBackground";

import "./layout.scss";

export const Layout: FC = () => {
  const currentLocation = useLocation().pathname.split("/");

  return isMobile ? (
    currentLocation[1] === "quizzes" &&
    currentLocation.length === 3 &&
    currentLocation[2] !== "" ? (
      <MobileBackground>
        <Outlet />
      </MobileBackground>
    ) : (
      <Outlet />
    )
  ) : (
    <div className="app-layout">
      <NavBar />
      <Background>
        <Outlet />
      </Background>
    </div>
  );
};
