import { TodoList } from "./../typechain-types/TodoList";
import { TodoList__factory } from "./../typechain-types/factories/TodoList__factory";

import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

describe("Testing TodoList.sol", () => {
  let TodoList: TodoList__factory;
  let todoList: TodoList;
  let owner: SignerWithAddress;
  let users: SignerWithAddress[];

  beforeEach(async () => {
    [owner, ...users] = await ethers.getSigners();
    TodoList = await ethers.getContractFactory("TodoList");
    todoList = await TodoList.connect(owner).deploy();
    await todoList.deployed();
  });

  describe("getOwnerTask", () => {
    it("Should only show tasks to owner", async () => {
      const totalTasks = 10;
      //add items
      for (let i = 0; i < totalTasks; i++) {
        let tx = await todoList.connect(owner).addTask(`${i}`);
      }

      const tasks = await todoList.connect(users[0]).getOwnerTask();
      expect(tasks.length).to.be.equal(0);
    });
  });
  describe("addTask", () => {
    it("Should add the text to the blockchain", async () => {
      const text = "testing string";
      const tx = await todoList.connect(owner).addTask(text);
      await tx.wait(1);

      const newTask = await todoList.connect(owner).getTasks();
      expect(newTask[newTask.length - 1].id).to.be.equal(newTask.length - 1);
      expect(newTask[newTask.length - 1].text).to.be.equal(text);
      expect(newTask[newTask.length - 1].isDeleted).to.be.equal(false);
    });
  });
  describe("deleteTask", () => {
    it("Should mark the unwanted task to be deleted", async () => {
      const totalTasks = 10;
      //add items
      for (let i = 0; i < totalTasks; i++) {
        let tx = await todoList.connect(owner).addTask(`${i}`);
      }
      let idTobeDeleted = 5;
      //delete item
      let tx = await todoList.connect(owner).deleteTask(idTobeDeleted);
      const ownerTasks = await todoList.connect(owner).getTasks();
      expect(ownerTasks[idTobeDeleted].isDeleted).to.be.equal(true);
    });
  });
});
