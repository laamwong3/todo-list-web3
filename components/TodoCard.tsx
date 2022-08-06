import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import { Divider, IconButton, InputBase, Stack } from "@mui/material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import TodoList from "../constants/TodoList.json";
import DisplayTask from "./DisplayTask";

export interface OwnerTask {
  text: string;
  id: number;
  isDeleted: boolean;
}
interface Confirmation {
  wait: (block: number) => Promise<void>;
}

const typoHeight = 80;

export default function TodoCard() {
  const [deleteId, setDeleteId] = React.useState<number>();
  const [value, setValue] = React.useState("");
  const { account, isWeb3Enabled } = useMoralis();
  const [ownerTask, setOwnerTask] = React.useState<OwnerTask[]>();

  const { fetch: addTask, isFetching: isAddTaskFetching } =
    useWeb3ExecuteFunction({
      abi: TodoList.abi,
      contractAddress: TodoList.address,
      functionName: "addTask",
      params: {
        _text: value,
      },
    });

  const { fetch: getOwnerTask } = useWeb3ExecuteFunction({
    abi: TodoList.abi,
    contractAddress: TodoList.address,
    functionName: "getOwnerTask",
    params: {},
  });

  const { fetch: deleteTask, isFetching: isDeleteTaskFetching } =
    useWeb3ExecuteFunction({
      abi: TodoList.abi,
      contractAddress: TodoList.address,
      functionName: "deleteTask",
      params: {
        _id: deleteId,
      },
    });

  // console.log(ownerTask);

  const updateTask = (result: unknown) => {
    let tempArr: OwnerTask[] = [];
    (result as OwnerTask[]).map((res) => {
      // console.log(res);
      tempArr.push({
        id: parseInt(res.id.toString()),
        isDeleted: res.isDeleted,
        text: res.text,
      });
    });
    setOwnerTask(tempArr);
  };

  React.useEffect(() => {
    (async () => {
      if (account && isWeb3Enabled) {
        await getOwnerTask({
          onSuccess: (result) => {
            updateTask(result);
          },
        });
      }
    })();
  }, [account]);

  const saveToBlockchain = async () => {
    if (value.trim() !== "" && account && isWeb3Enabled) {
      await addTask({
        onSuccess: async (result) => {
          await (result as Confirmation).wait(1);
          await getOwnerTask({
            onSuccess: (result) => {
              updateTask(result);
            },
          });
        },
      });
    }
  };

  return (
    <Box sx={{ width: "100%", height: "80%" }}>
      <Card
        variant="outlined"
        sx={{
          background: "#212F3C",
          height: "100%",
          width: "100%",
          borderRadius: 5,
        }}
      >
        <Stack
          direction="column"
          justifyContent={"center"}
          height="100%"
          padding={3}
          gap={3}
        >
          <Typography variant="h3" textAlign={"center"}>
            Hello
          </Typography>
          <Typography variant="subtitle1" textAlign={"center"}>
            {account}
          </Typography>
          <Box
            sx={{
              border: "2px solid grey",
              flex: 1,
              borderRadius: 5,
              padding: 3,
              overflowY: "scroll",
              scrollbarWidth: "thin",
            }}
          >
            <Stack direction={"row"} width={"100%"}>
              <InputBase
                sx={{
                  border: "2px solid grey",
                  borderRadius: 3,
                  flex: 1,
                  paddingX: 1.5,
                }}
                value={value}
                onChange={(e) => {
                  e.preventDefault();
                  setValue(e.target.value);
                }}
                placeholder="Add a task"
              />
              <IconButton
                onClick={saveToBlockchain}
                disabled={isAddTaskFetching}
              >
                <AddCircleOutlineOutlinedIcon fontSize="large" />
              </IconButton>
            </Stack>
            <Divider sx={{ marginY: 3 }} />
            <Stack direction={"column"} gap={3}>
              {ownerTask &&
                ownerTask.map((task, index) => {
                  if (!task.isDeleted) {
                    return (
                      <Stack key={index} direction="row" width={"100%"}>
                        <Typography
                          variant="subtitle1"
                          sx={{
                            flex: 1,
                            padding: 1,
                            border: "2px solid grey",
                            borderRadius: 3,
                          }}
                        >
                          {task.text}
                        </Typography>
                        <IconButton
                          disabled={isDeleteTaskFetching}
                          onClick={async () => {
                            // setIsDeletingTask(true);
                            setDeleteId(task.id);
                            await deleteTask({
                              onSuccess: async (result) => {
                                await (result as Confirmation).wait(1);
                                await getOwnerTask({
                                  onSuccess: (result) => {
                                    updateTask(result);
                                    // setIsDeletingTask(false);
                                  },
                                });
                              },
                            });
                          }}
                        >
                          <DeleteOutlineOutlinedIcon fontSize="large" />
                        </IconButton>
                      </Stack>
                    );
                  }
                })}
            </Stack>
          </Box>
        </Stack>
      </Card>
    </Box>
  );
}
