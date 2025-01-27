import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { type FC } from "react";

import colors from "../../style/colors";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 5,
  borderRadius: 0,
  backgroundColor: colors.white,
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: colors.loadingBar,
    ...theme.applyStyles("dark", {
      backgroundColor: colors.white,
    }),
  },
}));

interface CustomizedProgressBarProps {
  value: number;
}

const CustomizedProgressBar: FC<CustomizedProgressBarProps> = ({ value }) => {
  return (
    <Stack spacing={2} sx={{ flexGrow: 1 }}>
      <br />
      <BorderLinearProgress variant="determinate" value={value} />
    </Stack>
  );
};

export default CustomizedProgressBar;
