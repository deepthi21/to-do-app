import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import moment from "moment";
import db from "../models/db";

//const styles = (theme) => ({
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
  list: {
    textAlign: "left",
    fontSize: "18px",
  },
  listItem: {
    border: "1px solid grey",
    borderRadius: "5px",
    margin: `4px auto`,
  },
  checkbox: {
    color: "green",
  },
  floatRight: {
    textAlign: "right",
  },
});

const label = {
    today: "Due Today",
    overdue: "Overdue",
    futuredue: "Due Later",
}

export default function ToDoItems(props) {
  const classes = useStyles();
  const { todoItems, type, setNotification } = props;

  const { markAsDone } = db;

  if (!todoItems) {
    return null;
  }
  return (
    <List
      key={`${type}-tasks`}
      data-testid={`${type}-tasks`}
      className={classes.list}
      subheader={`${label[type]} (${todoItems.length})`}
    >
      {todoItems.length > 0 ? todoItems
        .map((item) => {
          return (
            <ListItem
              key={item.id}
              data-testid="task"
              className={classes.listItem}
            >
              <ListItemText primary={item.name} />
              {
                  item.showDate && <ListItemText
                  className={classes.floatRight}
                  secondary={moment(item.due_date).format("MMMM Do")}
                />
              }
              <ListItemSecondaryAction>
                <Checkbox
                  className={classes.checkbox}
                  edge="end"
                  onChange={(e) => {
                    markAsDone(item.id, e);
                    setNotification({open: true, message: `Task "${item.name}" is marked complete`})
                  }}
                  checked={item.done !== 0}
                />
              </ListItemSecondaryAction>
            </ListItem>
          );
        }) :
        <div>No tasks to display</div>}
    </List>
  );
}
