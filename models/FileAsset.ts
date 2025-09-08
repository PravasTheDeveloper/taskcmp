import mongoose, { Schema, InferSchemaType, models, model } from "mongoose"

const FileAssetSchema = new Schema({
  task: { type: Schema.Types.ObjectId, ref: "Task", index: true },
  project: { type: Schema.Types.ObjectId, ref: "Project", index: true },
  uploader: { type: Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  url: { type: String, required: true },
  type: { type: String, default: "file" },
  version: { type: Number, default: 1 },
}, { timestamps: true })

export type FileAssetDoc = InferSchemaType<typeof FileAssetSchema>
export default models.FileAsset || model("FileAsset", FileAssetSchema)


