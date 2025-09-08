import mongoose, { Schema, InferSchemaType, models, model } from "mongoose"

const TaskSchema = new Schema({
  project: { type: Schema.Types.ObjectId, ref: "Project", required: true, index: true },
  name: { type: String, required: true },
  description: { type: String, default: "" },
  assignee: { type: Schema.Types.ObjectId, ref: "User" },
  status: { type: String, enum: ["not-started", "in-progress", "completed"], default: "not-started" },
  priority: { type: String, enum: ["high", "medium", "low"], default: "medium" },
  deadline: { type: Date },
  estimate: { type: String },
  progress: { type: Number, min: 0, max: 100, default: 0 },
}, { timestamps: true })

export type TaskDoc = InferSchemaType<typeof TaskSchema>
export default models.Task || model("Task", TaskSchema)


