import mongoose, { Schema, InferSchemaType, models, model } from "mongoose"

const ActivitySchema = new Schema({
  project: { type: Schema.Types.ObjectId, ref: "Project", index: true },
  task: { type: Schema.Types.ObjectId, ref: "Task", index: true },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  type: { type: String, enum: ["comment", "file", "status", "assignment", "time"], required: true },
  message: { type: String, default: "" },
}, { timestamps: true })

export type ActivityDoc = InferSchemaType<typeof ActivitySchema>
export default models.Activity || model("Activity", ActivitySchema)


