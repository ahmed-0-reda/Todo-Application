import * as React from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

//ATHOR
import { useTodos } from "../contextFile/TodoContext";

import Todo from "./ToDo";
import { useToast } from "../contextFile/ToastContext";

// =====toggle Buttons=====
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useState, useEffect } from "react";

//DIALOG
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useMemo } from "react";

//.......................................................................
export default function ToDoList() {
  //_____________HOOKSHOOKS
  const { todos, dispatch } = useTodos();
  const { showHideAlert } = useToast();
  const [input, setInput] = useState({ title: "", details: "" });
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [updateDialog, setUpdateDialog] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState();
  const [displayToggle, setDisplayToggle] = useState("all");
  //_____________HOOKS

  function handelAddTodoBtn() {
    dispatch({
      type: "added",
      payloud: { title: input.title, details: input.details },
    });
    input.title = "";
    input.details = "";
  }
  useEffect(() => {
    dispatch({ type: "get" });
  }, []);

  //DELETE DIALOG
  function handelOpenDeleteDialog(todo) {
    setSelectedTodo(todo);
    setDeleteDialog(true);
  }
  function handleCloseDeleteDialog() {
    setDeleteDialog(false);
  }
  function confirmDeleteTodo() {
    handleCloseDeleteDialog();
    showHideAlert("تم الحذف بنجاح");
    dispatch({ type: "deleted", payloud: selectedTodo });
  }
  //DELETE DIALOG
  //.............................................
  //UPDATE DIALOG
  function handelOpenUpdateDialog(todo) {
    console.log(todo);
    setSelectedTodo(todo);
    setUpdateDialog(true);
  }
  function handleCloseUpdateDialog() {
    setUpdateDialog(false);
  }
  function confirmUpdateTodo() {
    dispatch({ type: "Edit", payloud: selectedTodo });
    handleCloseUpdateDialog();
    showHideAlert("تم التعديل بنجاح");
  }
  //UPDATE DIALOG

  
  //FILTERING ARRAYS
  const completedTodo = useMemo(() => {
    return todos.filter((t) => {
      return t.isCompleted;
    });
  }, [todos]);

  const nonCompletedTodo = useMemo(() => {
    return todos.filter((t) => {
      return !t.isCompleted;
    });
  }, [todos]);

  let filteringTodos = todos;

  if (displayToggle == "completed") {
    filteringTodos = completedTodo;
  } else if (displayToggle == "non-completed") {
    filteringTodos = nonCompletedTodo;
  }

  const TodosJsx = filteringTodos.map((t) => {
    return (
      <Todo
        key={t.id}
        todo={t}
        showDeleteDialog={handelOpenDeleteDialog}
        showUpdateDialog={handelOpenUpdateDialog}
      />
    );
  });

  return (
    <>
      {/* DELETE DIALOG */}
      <Dialog
        open={deleteDialog}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{ direction: "rtl" }}
      >
        <DialogTitle id="alert-dialog-title">
          {"هل تريد حذف هذه المهمه..؟"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            لن تستطيع استعاده هذه المهمه اذا قمت بالحذف هل انت متاكد
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>الغاء</Button>
          <Button onClick={confirmDeleteTodo} autoFocus>
            حذف
          </Button>
        </DialogActions>
      </Dialog>
      {/* DELETE DIALOG */}
      {/* EDIT DIALOG */}
      <Dialog
        open={updateDialog}
        onClose={handleCloseUpdateDialog}
        sx={{ direction: "rtl" }}
      >
        <DialogTitle>هل تريد التعديل علي هذه المهمه..؟</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ............................................. >>
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            label="عنوان المهمه"
            fullWidth
            variant="standard"
            value={selectedTodo?.title}
            onChange={(e) => {
              setSelectedTodo({
                ...selectedTodo,
                title: e.target.value,
              });
            }}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            label="تفاصيل المهمه"
            fullWidth
            variant="standard"
            value={selectedTodo?.details}
            onChange={(e) => {
              setSelectedTodo({ ...selectedTodo, details: e.target.value });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUpdateDialog}>الغاء</Button>
          <Button onClick={confirmUpdateTodo}>تعديل</Button>
        </DialogActions>
      </Dialog>
      {/* EDIT DIALOG */}
      <Container className="to-do-list-container">
        <Card>
          <CardContent sx={{ padding: "0" }}>
            <Typography className="title">بسم الله الرحمن الرحيم</Typography>
            <Divider sx={{ background: "#fff" }} />
            {/* ====== Filter Buttons ====== */}
            <ToggleButtonGroup
              className="ToggleButtonGroup"
              exclusive
              aria-label="text alignment"
              value={displayToggle}
              onClick={(e) => {
                setDisplayToggle(e.target.value);
              }}
            >
              <ToggleButton value="non-completed">الغير منجز</ToggleButton>
              <ToggleButton value="completed">المنجز</ToggleButton>
              <ToggleButton value="all">الكل</ToggleButton>
            </ToggleButtonGroup>
            {/* ====== Filter Buttons ====== */}

            {TodosJsx}
            <Grid
              container
              spacing={2}
              className="adding-input-field"
              sx={{ margin: "20px 0" }}
            >
              <Grid item className="add-todo-input-section">
                <TextField
                  id="outlined-basic"
                  label="مهمه جديده"
                  variant="outlined"
                  className="input-text-field"
                  value={input.title}
                  onChange={(e) => {
                    setInput({ ...input, title: e.target.value });
                  }}
                />
                <TextField
                  id="outlined-basic"
                  label="تفاصيل المهمه الجديده"
                  variant="outlined"
                  value={input.details}
                  onChange={(e) => {
                    setInput({ ...input, details: e.target.value });
                  }}
                />
              </Grid>
              <Grid item className="add-btn-click">
                <Button
                  variant="contained"
                  disabled={
                    input.title == "" || input.details == "" ? true : false
                  }
                  sx={{
                    bgcolor:
                      input.title == "" || input.details == ""
                        ? "#42476d6e"
                        : "primary.main",
                  }}
                  onClick={handelAddTodoBtn}
                >
                  ضيفه المهمه ي نجم
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
