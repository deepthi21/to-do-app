import React from "react";
import {
  render,
  waitFor,
  screen,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import moment from "moment";
import App from "../App";

const mockTaskData = [
  {
    done: 0,
    due_date: moment().format('MMMM D YYYY'),
    id: 1,
    name: "Task 1",
  },
  {
    done: 0,
    due_date: moment().subtract(2, 'days').format('MMMM D YYYY'),
    id: 2,
    name: "Task 2",
  },
  {
    done: 1,
    due_date: moment().subtract(1, 'days').format('MMMM D YYYY'),
    id: 3,
    name: "Task 3",
  },
  {
    done: 0,
    due_date: moment().add(3, 'days').format('MMMM D YYYY'),
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

describe("App Test", () => {
  beforeEach(() => {
    console.log(mockTaskData);
    useLiveQuery.mockReturnValue(mockTaskData);
  });

  it("test if application loaded", async () => {
    render(<App />);

    await waitFor(() => screen.findByTestId("header"));
    expect(screen.getByTestId("header")).toHaveTextContent("My Todos");
  });
});
