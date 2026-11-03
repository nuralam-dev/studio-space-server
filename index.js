import cors from "cors";
import "dotenv/config";
import express from "express";

import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);
const PORT = 4000;
const app = express();
export async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("You successfully connected to MongoDB!");
    return client;
  } catch (err) {
    console.dir(err);
  }
}
const connectClient = await connectToMongoDB();
const db = connectClient.db("studio-space-server");
const facilitiesCollection = db.collection("facilities");

app.post("/facilities", async (req, res) => {
  // step 01
  const facilitiesData = req.body;
  // step 02
  const result = await facilitiesCollection.insertOne(facilitiesData);
  // step 03
  res.send(result);
});
app.get("/facilities", async (req, res) => {
  const result = await facilitiesCollection.find().toArray();
  res.send(result);
});

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("this is studio space home page api");
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
