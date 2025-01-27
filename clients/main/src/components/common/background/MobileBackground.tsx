import type { ReactNode, FC } from "react";

import "./mobile-background.scss";

interface MobileBackgroundProps {
  children: ReactNode;
}

const MobileBackground: FC<MobileBackgroundProps> = ({ children }) => {
  return (
    <div className="mobile-background">
      <img
        className="bottom-leaf-img"
        src="/images/bottom-leaf.svg"
        alt="leaf"
      />
      {children}
    </div>
  );
};

export default MobileBackground;
