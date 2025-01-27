import {
  type Dispatch,
  useState,
  type FC,
  type SetStateAction,
  useEffect,
} from "react";
import Box from "@mui/material/Box";

import CustomizedProgressBar from "./CustomLoading";

interface LoadingProps {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const LinearDeterminate: FC<LoadingProps> = ({ isLoading, setIsLoading }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          setIsLoading(!isLoading);
          return 0;
        }
        const arr = [10, 90, 30];
        let diff = 0;
        for (const value of arr) {
          diff = value;
        }
        return Math.min(oldProgress + diff, 100);
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Box sx={{ width: "273px" }}>
      <CustomizedProgressBar value={progress} />
    </Box>
  );
};

export default LinearDeterminate;
