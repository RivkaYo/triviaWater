import { type Dispatch, type SetStateAction, type FC } from "react";

import Loading from "./Loading";

import "./loading-monkey.scss";

interface LoadingProps {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const PartOfLoadingMonkey: FC<LoadingProps> = ({ isLoading, setIsLoading }) => {
  return (
    <div className="monkey-and-loading-bar">
      <img
        className="loading-monkey-img"
        src="/images/loadingMonkey.svg"
        alt="Loading Monkey"
      />
      <div className="loading-bar">
        <Loading isLoading={isLoading} setIsLoading={setIsLoading} />
      </div>
    </div>
  );
};

export default PartOfLoadingMonkey;
