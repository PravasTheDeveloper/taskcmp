import mongoose, { Schema, InferSchemaType, models, model } from "mongoose"

const RiskSchema = new Schema({
  project: { type: Schema.Types.ObjectId, ref: "Project", index: true },
  title: { type: String, required: true },
  level: { type: String, enum: ["High", "Medium", "Low"], default: "Low" },
  owner: { type: Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true })

export type RiskDoc = InferSchemaType<typeof RiskSchema>
export default models.Risk || model("Risk", RiskSchema)


