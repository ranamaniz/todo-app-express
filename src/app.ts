import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import Todo from "./model/Todo";
import { asyncHandler } from "./utils/asyncHandler";
import { RouteHandlerParams } from "./types";

const app = express();
app.use(cors());

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json({ a: "Hello there" });
});

// app.get("/todos", async (req, res) => {
//   try {
//     const todos = await Todo.find();
//     console.log("todos", todos);

//     res.send({
//       success: true,
//       payload: todos,
//       // payload: updatedTodos,

//       message: "Successfully retrieved all the todos ",
//     });
//   } catch (e) {
//     res.send(e);
//   }
// });

app.get(
  "/todos",
  asyncHandler(async (req, res, next) => {
    const todos = await Todo.find();
    console.log("todos", todos);

    res.status(200).json({
      success: true,
      data: todos,
      message: "Successfully retrieved all the todos ",
    });
  })
);

app.post("/todos", async (req, res) => {
  try {
    const data = req.body;

    const todo = new Todo({ ...data });

    console.log(todo);

    const response = await todo.save();

    console.log(response);

    res.send({
      success: true,
      payload: response,
      error: null,
      message: "Successfully added the todo",
    });
  } catch (e) {
    console.log(e);
    // res.send({
    //   success: false,
    //   payload: {},
    //   message: "Sorry, could not add todo. Please try again later",
    //   error: e,
    // });
    res.send(e);
  }
});

app.put("/todos/:id", async (req, res) => {
  try {
    const todoId = req.params.id;
    console.log("todoId", todoId);

    const updatedData = req.body;
    console.log("updatedData", updatedData);

    const response = await Todo.findByIdAndUpdate(todoId, updatedData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: "Successfully updated the todo",
      statusCode: "SUCCESS",
      data: response,
    });
  } catch (e) {
    res.status(500).json({
      status: false,
      message: "Sorry something went wrong",
      error: e,
      statusCode: "ERROR",
    });
  }
});

app.delete(`/todos/:id`, async (req, res) => {
  try {
    const id = req.params.id;

    const response = await Todo.findByIdAndDelete(id);

    console.log(response);

    res.send({
      success: true,
      payload: response,
      message: "Successfully deleted the todo item",
    });
  } catch (e) {
    res.send(e);
  }
});

export { app };
