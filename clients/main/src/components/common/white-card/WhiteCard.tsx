import type { FC, PropsWithChildren } from "react";

import "./white-card.scss";

interface WhiteCardProps {
  width?: string;
  height?: string;
}

const WhiteCard: FC<PropsWithChildren<WhiteCardProps>> = ({
  children,
  width = "68.75vw",
  height = "73vh",
}) => {
  return (
    <div style={{ width, height }} className="white-card">
      {children}
    </div>
  );
};

export default WhiteCard;
