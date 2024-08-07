import type { Mongoose } from "mongoose";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

// Extend the NodeJS global type
declare global {
  var mongoose: {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
  };
}

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI as string;
if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

// Define Waitlist schema
const waitlistSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

const Waitlist =
  mongoose.models.Waitlist || mongoose.model("Waitlist", waitlistSchema);

export async function POST(request: Request) {
  const { email } = await request.json();

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  try {
    await dbConnect();
    const newEntry = new Waitlist({ email });
    await newEntry.save();
    return NextResponse.json(
      { message: "Successfully added to waitlist" },
      { status: 201 }
    );
  } catch (error: any) {
    if (error.code === 11000) {
      // Duplicate key error
      return NextResponse.json(
        { error: "Email already exists in waitlist" },
        { status: 409 }
      );
    } else {
      console.error("Error adding to waitlist:", error);
      return NextResponse.json(
        { error: "Error adding to waitlist" },
        { status: 500 }
      );
    }
  }
}
