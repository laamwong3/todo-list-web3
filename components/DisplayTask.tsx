import { IconButton, InputBase, Stack, Typography } from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { OwnerTask } from "./TodoCard";
import { ResolveCallOptions } from "react-moralis/lib/hooks/internal/_useResolveAsyncCall";
import { Web3ExecuteFunctionParameters } from "react-moralis";

interface DisplayTaskProps {
  ownerTask: OwnerTask;
  setDeleteId: React.Dispatch<React.SetStateAction<number | undefined>>;
}

const DisplayTask = ({ ownerTask, setDeleteId }: DisplayTaskProps) => {
  return (
    <>
      <Stack direction="row" width={"100%"}>
        <Typography
          variant="subtitle1"
          sx={{
            flex: 1,
            padding: 1,
            border: "2px solid grey",
            borderRadius: 3,
          }}
        >
          {ownerTask.text}
        </Typography>
        <IconButton onClick={() => {}}>
          <DeleteOutlineOutlinedIcon fontSize="large" />
        </IconButton>
      </Stack>
    </>
  );
};

export default DisplayTask;
