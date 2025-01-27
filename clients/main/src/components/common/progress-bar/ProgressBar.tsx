import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { type FC } from "react";
import { Stack } from "@mui/material";

import "./progress-bar.scss";

interface ProgressProps {
  currQuestion: number;
  numQuestions: number;
  isEnd?: boolean;
}

const ProgressBar: FC<ProgressProps> = ({
  numQuestions,
  currQuestion,
  isEnd,
}) => {
  const calcProgress = () => {
    return numQuestions === currQuestion && !isEnd
      ? 95
      : 100 * (currQuestion / numQuestions);
  };

  return (
    <Stack>
      <Box className="progress-box">
        <LinearProgress
          className="linear-progress-bar"
          variant="determinate"
          value={calcProgress()}
        />
      </Box>
    </Stack>
  );
};

export default ProgressBar;
