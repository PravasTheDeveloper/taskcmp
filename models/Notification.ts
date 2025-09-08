import mongoose, { Schema, InferSchemaType, models, model } from "mongoose"

const NotificationSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", index: true },
  title: { type: String, required: true },
  body: { type: String, default: "" },
  read: { type: Boolean, default: false },
}, { timestamps: true })

export type NotificationDoc = InferSchemaType<typeof NotificationSchema>
export default models.Notification || model("Notification", NotificationSchema)


