import mongoose, { Schema, InferSchemaType, models, model } from "mongoose"

const DocSchema = new Schema({
  project: { type: Schema.Types.ObjectId, ref: "Project", index: true },
  title: { type: String, required: true },
  content: { type: String, default: "" },
  approved: { type: Boolean, default: false },
  updatedBy: { type: Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true })

export type DocDoc = InferSchemaType<typeof DocSchema>
export default models.Doc || model("Doc", DocSchema)


