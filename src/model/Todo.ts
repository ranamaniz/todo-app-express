import { Schema, model } from "mongoose";

interface TODO {
  // id: string;
  title: string;
  isComplete: boolean;
}
const todoSchema = new Schema<TODO>({
  // id: { type: String },
  title: { type: String },
  isComplete: { type: Boolean },
});

const Todo = model("Todo", todoSchema);

export default Todo;
