import mongoose, { Schema, InferSchemaType, models, model } from "mongoose"

const CommentSchema = new Schema({
  task: { type: Schema.Types.ObjectId, ref: "Task", index: true },
  project: { type: Schema.Types.ObjectId, ref: "Project", index: true },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  text: { type: String, required: true },
  mentions: [{ type: Schema.Types.ObjectId, ref: "User" }],
  attachments: [{ name: String, url: String, type: String }],
}, { timestamps: true })

export type CommentDoc = InferSchemaType<typeof CommentSchema>
export default models.Comment || model("Comment", CommentSchema)


