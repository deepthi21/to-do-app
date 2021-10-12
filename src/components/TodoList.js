import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import moment from "moment";
import db from "../models/db";
import { useLiveQuery } from "dexie-react-hooks";
import ToDoItems from "./TodoItems";
import AddTask from "./AddTask";
import { Divider } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    height: "95%",
    margin: `4px auto`,
    padding: "8px",
  },
  gridWrapper: {
    height: "90%",
  },
  grid: {
    overflow: "auto",
  },
  divider: {
    margin: "10px",
  },
});

const TODO_TYPES = [
  {
    name: "today",
    filter: (item) =>
      item.done === 0 &&
      item.done === 0 &&
      moment(new Date()).isSame(moment(item.due_date), "day"),
    enable: true,
  },
  {
    name: "overdue",
    filter: (item) =>
      item.done === 0 &&
      moment(new Date()).isAfter(moment(item.due_date), "day"),
    enable: true,
    showDate: true,
  },
  {
    name: "futuredue",
    filter: (item) =>
      item.done === 0 &&
      moment(new Date()).isBefore(moment(item.due_date), "day"),
    enable: false, // set to true to display tasks that are due on future date
    showDate: true,
  },
];

export default function TodoList(props) {
  const classes = useStyles();
  const todoItems = useLiveQuery(
    () => db.tasks.where("done").equals(0).toArray(),
    []
  );

  const { setNotification } = props;

  return (
    <div className={classes.root}>
      <Grid
        container
        className={classes.gridWrapper}
        wrap="nowrap"
        direction="column"
        spacing={2}
      >
        {todoItems && todoItems.length > 0 ? TODO_TYPES.map((type, i) => {
          if (!type.enable) {
            return null;
          }
          const filteredTodoItems = todoItems.filter((item) =>
            type.filter(item)
          );
          return (
            <React.Fragment>
              {i !== 0 && <Divider className={classes.divider} />}
              <Grid key={type.name} item xs={12} className={classes.grid}>
                <ToDoItems type={type.name} todoItems={filteredTodoItems} setNotification={setNotification}/>
              </Grid>
            </React.Fragment>
          );
        }) : <div>No tasks are due. Keep adding!</div>}
      </Grid>
      <AddTask setNotification={setNotification}/>
    </div>
  );
}
