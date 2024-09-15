import { MongoClient, MongoClientOptions } from "mongodb";

// Ensure MONGODB_URI is defined or use an empty string
const uri: string | null = process.env.MONGODB_URI ?? null; // Use nullish coalescing for better clarity

// Specify options type
const options: MongoClientOptions = {};

// Declare variables for the client and the clientPromise
let client: MongoClient;
let clientPromise: Promise<MongoClient>;

// Extend global object to include _mongoClientPromise
declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

// If MONGODB_URI is not set, throw an error
if (!uri) {
  throw new Error("Please add your Mongo URI to .env.local");
}

console.log(uri);

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable to prevent creating new clients after hot reloads
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, create a new client
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
