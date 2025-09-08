import mongoose, { Schema, InferSchemaType, models, model } from "mongoose"

const UserSchema = new Schema({
  fullName: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, index: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ["client", "developer", "designer", "qa", "executive", "hr", "admin"], default: "developer" },
  country: { type: String, default: "" },
  department: { type: String, default: "" },
  avatarUrl: { type: String },
  isActive: { type: Boolean, default: true },
  joinedAt: { type: Date, default: () => new Date() },
}, { timestamps: true })

export type UserDoc = InferSchemaType<typeof UserSchema>
export default models.User || model("User", UserSchema)


