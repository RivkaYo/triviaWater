import { type Dispatch, type SetStateAction, useEffect, type FC } from "react";
import { isMobile } from "react-device-detect";
import { withAuth } from "@hilma/auth-client";

import WhiteCard from "../common/white-card/WhiteCard";

import PartOfLoadingMonkey from "./PartOfLoadingMonkey";

import "./loading-monkey.scss";

interface LoadingProps {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}
// eslint-disable-next-line react-refresh/only-export-components -- component name
const LoadingMonkey: FC<LoadingProps> = ({ isLoading, setIsLoading }) => {
  useEffect(() => {
    setIsLoading(true);
  }, []);

  return (
    <>
      {!isMobile ? (
        <WhiteCard>
          <PartOfLoadingMonkey
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        </WhiteCard>
      ) : (
        <PartOfLoadingMonkey
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      )}
    </>
  );
};

const wrappedLoadingMonkey = withAuth(LoadingMonkey, { access: "private" });
export default wrappedLoadingMonkey;
