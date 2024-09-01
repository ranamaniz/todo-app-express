import { Schema, model } from "mongoose";

const todoSchema = new Schema({
  // id: { type: String },
  title: { type: String },
  isComplete: { type: Boolean },
});

const Todo = model("Todo", todoSchema);

export default Todo;
