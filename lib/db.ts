import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI as string | undefined

declare global {
  var mongooseCache: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null } | undefined
}

let cached = global.mongooseCache as { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null } | undefined

if (!cached) {
  cached = { conn: null, promise: null }
  global.mongooseCache = cached
}

export async function connectToDatabase() {
  if (!MONGODB_URI) {
    throw new Error("Missing MONGODB_URI. Add it to your .env.local")
  }
  if (cached!.conn) return cached!.conn
  if (!cached!.promise) {
    cached!.promise = mongoose.connect(MONGODB_URI, { dbName: process.env.MONGODB_DB || "cmptasks" })
  }
  cached!.conn = await cached!.promise
  return cached!.conn
}


