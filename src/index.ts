import cors from "cors";
import "dotenv/config";
import express from "express";
import connectMongoDB from "./connection.ts";
import Todo from "./model/Todo.ts";

const app = express();
app.use(cors());

const port = process.env.PORT;

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
