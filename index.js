import cors from "cors";
import "dotenv/config";
import express from "express";

import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);

export async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("You successfully connected to MongoDB!");
    return client;
  } catch (err) {
    console.dir(err);
  }
}
connectToMongoDB();

const PORT = 4000;
const app = express();
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("this is studio space home page api");
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
