import cors from "cors";
import "dotenv/config";
import express from "express";
import connectMongoDB from "./connection";
import Todo from "./model/Todo";

const app = express();
app.use(cors());

const port = process.env.PORT;
console.log(port);

await connectMongoDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ a: "Hello there" });
});

app.listen(port, () => {
  console.log("listening to port", port);
});

app.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.find();
    console.log("todos", todos);
    // const updatedTodos = todos.map((todo) => {
    //   const id = todo._id.toString();
    //   // delete todo._id;

    //   console.log("hello")

    //   return {
    //     ...todo,
    //     id,
    //   };
    // });

    // console.log(updatedTodos)

    res.send({
      success: true,
      payload: todos,
      // payload: updatedTodos,

      message: "Successfully retrieved all the todos ",
    });
  } catch (e) {
    res.send(e);
  }
});

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

    console.log(response);

    // const data = await response.json();
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
