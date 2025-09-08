import mongoose, { Schema, InferSchemaType, models, model } from "mongoose"

const ProjectSchema = new Schema({
  name: { type: String, required: true, trim: true },
  clientName: { type: String, required: true },
  status: { type: String, enum: ["running", "queue", "request", "completed"], default: "running" },
  deadline: { type: Date },
  budgetTotal: { type: Number, default: 0 },
  description: { type: String, default: "" },
  team: [{ type: Schema.Types.ObjectId, ref: "User" }],
  createdBy: { type: Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true })

export type ProjectDoc = InferSchemaType<typeof ProjectSchema>
export default models.Project || model("Project", ProjectSchema)


