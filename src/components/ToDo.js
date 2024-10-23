import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import { useTodos } from "../contextFile/TodoContext";
import { useToast } from "../contextFile/ToastContext";

// ====== icons =======
import CheckIcon from "@mui/icons-material/Check";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Todo({ todo, showDeleteDialog, showUpdateDialog }) {
  const { todos, dispatch } = useTodos();
  const { showHideAlert } = useToast();
  // ===================style
  let styleBtnIcon = {
    background: todo.isCompleted ? "#81735b" : "#ffe4b5",
    color: todo.isCompleted ? "#b3b3b3" : "primary.icons",
  };
  let cardStyle = {
    background: todo.isCompleted ? "transparent" : "#385b66",
    color: todo.isCompleted ? "#b3b3b3" : "#fff",
    bgcolor: "primary.main",
  };

  // ===================style
  //FUNCTIONS....
  function handelCheckClick() {
    showHideAlert("تم التعديل بنجاح");
    dispatch({ type: "checkIscompleted", payloud: todo });
  }
  function handelDeleteClick() {
    showDeleteDialog(todo);
  }
  function handelUpdateClick() {
    showUpdateDialog(todo);
  }
  //FUNCTIONS....
  return (
    <>
      {/*   THIS IS TODO CARD   */}
      <Card sx={cardStyle} className="main-todo-card">
        <CardContent className="todo-card-content">
          <Grid container sx={{ direction: "rtl", textAlign: "right" }}>
            <Grid xs={8} sx={{ lineBreak: "anywhere" }}>
              <Typography>{todo.title}</Typography>
              <Typography>{todo.details}</Typography>
            </Grid>
            {/* ============ Aciton Buttons============ */}
            <Grid xs={4} className="grid-child-icon">
              <IconButton
                sx={styleBtnIcon}
                className="btn-icons"
                onClick={handelCheckClick}
              >
                <CheckIcon fontSize="inherit" />
              </IconButton>
              <IconButton
                sx={styleBtnIcon}
                className="btn-icons"
                onClick={handelDeleteClick}
              >
                <DeleteIcon fontSize="inherit" />
              </IconButton>
              <IconButton
                sx={styleBtnIcon}
                className="btn-icons"
                onClick={handelUpdateClick}
              >
                <ModeEditIcon fontSize="inherit" />
              </IconButton>
            </Grid>
            {/* ============ Aciton Buttons============ */}
          </Grid>
        </CardContent>
      </Card>
      {/* ==== THIS IS TODO CARD ==== */}
    </>
  );
}
