import { ethers } from "hardhat";
import fs from "fs";

async function main() {
  const TodoList = await ethers.getContractFactory("TodoList");
  const todoList = await TodoList.deploy();

  const todoListData = {
    address: todoList.address,
    abi: JSON.parse(todoList.interface.format("json").toString()),
  };

  fs.writeFileSync(
    "../constants/TodoList.json",
    JSON.stringify(todoListData, null, 2)
  );
  console.log("Contract deployed to ", todoList.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
