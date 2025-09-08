import mongoose, { Schema, InferSchemaType, models, model } from "mongoose"

const TimeLogSchema = new Schema({
  task: { type: Schema.Types.ObjectId, ref: "Task", index: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  hours: { type: Number, required: true },
  note: { type: String, default: "" },
}, { timestamps: true })

export type TimeLogDoc = InferSchemaType<typeof TimeLogSchema>
export default models.TimeLog || model("TimeLog", TimeLogSchema)


