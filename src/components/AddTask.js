import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { DatePicker } from "@material-ui/pickers";
import moment from "moment";
import db from "../models/db";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";

const useStyles = makeStyles({
  buttonWrapper: {
    marginBottom: "0px",
    float: "right"
  },
});

export default function AddTask(props) {
  const classes = useStyles();
  const [openPopup, setOpenPopup] = useState(false);
  const [newTask, setNewTask] = useState({});

  const { addTask } = db;

  return (
    <React.Fragment>
      <Fab
        className={classes.buttonWrapper}
        data-testid="addTaskBtn"
        color="primary"
        aria-label="add"
        onClick={() => {
          setOpenPopup(true);
        }}
      >
        <AddIcon />
      </Fab>
      <Dialog
        data-testid="popup"
        open={openPopup}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add Task</DialogTitle>
        <DialogContent>
          <TextField
            id="filled-textarea"
            label="Description"
            multiline
            variant="filled"
            onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
            fullWidth
          />

          <MuiPickersUtilsProvider utils={MomentUtils}>
            <DatePicker
              autoOk
              disableToolbar
              variant="inline"
              label="Due date"
              disablePast
              value={newTask.due_date || moment(new Date())}
              onChange={(value) => {
                setNewTask({ ...newTask, due_date: value });
              }}
            />
          </MuiPickersUtilsProvider>
        </DialogContent>
        <DialogActions>
          <Button
            data-testid="cancelBtn"
            onClick={() => {
              setOpenPopup(false);
              setNewTask({});
            }}
            color="secondary"
          >
            Cancel
          </Button>
          <Button
            data-testid="addBtn"
            disabled={!newTask.name}
            onClick={() => {
              setOpenPopup(false);
              const { name, due_date = moment(new Date()), done = 0 } = newTask;
              addTask({ name, due_date, done });
              setNewTask({});
              props.setNotification({open: true, message: `Task "${name}" created successfully`});
            }}
            color="primary"
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
