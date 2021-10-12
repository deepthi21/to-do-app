import React from "react";
import {
  render,
  fireEvent,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import AddTask from "../components/AddTask";

const mockTaskData = [
  {
    done: 0,
    due_date: "October 11 2021",
    id: 1,
    name: "Task 1",
  },
  {
    done: 0,
    due_date: "October 9 2021",
    id: 2,
    name: "Task 2",
  },
  {
    done: 1,
    due_date: "October 10 2021",
    id: 3,
    name: "Task 3",
  },
  {
    done: 0,
    due_date: "October 30 2021",
    id: 4,
    name: "Task 4",
  },
];

const mockNewTask = {
  done: 0,
  due_date: "October 11th 2021",
  id: 5,
  name: "Task 5",
};

jest.mock("../models/db", () => {
  return {
    ...jest.requireActual(),
    addTask: jest.fn(() => {
      mockTaskData.push(mockNewTask);
    }),
  };
});

describe("Test Add Task component", () => {
  it("opens Add Task popup on clicking Add button", () => {
    render(<AddTask />);
    fireEvent.click(screen.getByTestId("addTaskBtn"));
    expect(screen.getByTestId("popup")).toBeInTheDocument();
  });

  it("test popup close when clicking cancel", async () => {
    render(<AddTask />);
    fireEvent.click(screen.getByTestId("addTaskBtn"));
    expect(screen.getByTestId("popup")).toBeInTheDocument();
    fireEvent.click(screen.getByTestId("cancelBtn"));
    await waitForElementToBeRemoved(() => screen.getByTestId("popup"));
    expect(screen.queryByTestId("popup")).not.toBeInTheDocument();
  });
});
