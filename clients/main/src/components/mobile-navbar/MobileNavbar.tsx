import { IconButton, Stack } from "@mui/material";
import type { FC } from "react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";

import "./mobile-navbar.scss";

interface MobileNavbarProps {
  text: string;
  goBackIcon?: boolean;
  bananaIcon?: boolean;
  monkeyIcon?: boolean;
}

const MobileNavbar: FC<MobileNavbarProps> = ({
  text,
  goBackIcon = false,
  bananaIcon = false,
  monkeyIcon = false,
}) => {
  const navigate = useNavigate();
  return (
    <Stack direction="row-reverse" className="mobile-navbar-container">
      <Stack className="icon-container">
        {monkeyIcon && (
          <img src="/icons/monkey-with-laptop.svg" alt="monkey with laptop" />
        )}
      </Stack>
      <Stack
        direction="row-reverse"
        className="middle-section-container"
        gap="0.5rem"
      >
        {bananaIcon && (
          <Stack className="icon-container">
            <img src="/icons/banana.svg" alt="banana peel" />
          </Stack>
        )}
        <Stack
          className={clsx(
            "text-container",
            bananaIcon
              ? "site-logo-style"
              : text.length > 15
                ? "small-text-style"
                : "big-text-style",
          )}
        >
          {text}
        </Stack>
      </Stack>
      <Stack className="icon-container">
        {goBackIcon && (
          <IconButton>
            <img
              src="/icons/back-arrow.svg"
              alt="go back"
              onClick={() => void navigate(-1)}
            />
          </IconButton>
        )}
      </Stack>
    </Stack>
  );
};

export default MobileNavbar;
