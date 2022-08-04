// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

//implements
// add task
// delete task
// view task

contract TodoList {
    event AddTask(address recipient, uint id);
    event DeleteTask(uint id, bool isDeleted);

    struct Task {
        uint id;
        string text;
        bool isDeleted;
    }

    Task[] private tasks;
    mapping(uint => address) taskToOwner;

    function addTask(string memory _text) external {
        uint taskId = tasks.length;
        tasks.push(Task(taskId, _text, false));
        taskToOwner[taskId] = msg.sender;
    }

    function getTask() external view returns (Task[] memory) {
        Task[] memory tempTask = new Task[](tasks.length);
        uint counter = 0;

        for (uint i = 0; i < tasks.length; i++) {
            if (taskToOwner[i] == msg.sender && !tasks[i].isDeleted) {
                tempTask[counter] = tasks[i];
                counter++;
            }
        }

        return tempTask;
    }
}
