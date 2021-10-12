import React from "react";
import {
  render,
  waitFor,
  screen,
  within,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import TodoList from "../components/TodoList";

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

jest.mock("dexie-react-hooks", () => ({
  useLiveQuery: jest.fn(),
}));

const useLiveQuery = require("dexie-react-hooks").useLiveQuery;
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

describe("Test Todo List component", () => {
  beforeEach(() => {
    console.log(mockTaskData);
    useLiveQuery.mockReturnValue(mockTaskData);
  });

  it("test if today's tasks displayed", async () => {
    render(<TodoList />);

    await waitFor(() => screen.findByTestId("today-tasks"));
    expect(
      within(screen.getByTestId("today-tasks")).getAllByTestId("task").length
    ).toEqual(1);
  });

  it("test if overdue tasks displayed", async () => {
    render(<TodoList />);

    await waitFor(() => screen.findByTestId("overdue-tasks"));
    expect(
      within(screen.getByTestId("overdue-tasks")).getAllByTestId("task").length
    ).toEqual(1);
  });
});
