const mongoose = require("mongoose");
require("dotenv").config();

const newConnection = (uri) => {
  const conn = mongoose.createConnection(uri, {
    serverSelectionTimeoutMS: 3000,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  conn.on("connected", () => {
    console.log("MongoDB connected");
  });

  conn.on("error", (err) => {
    console.log("MongoDB error", JSON.stringify(error));
  });

  conn.on("disconnected", () => {
    console.log("MongoDB disconnected");
  });

  process.on("SIGINT", async () => {
    await conn.close();
    process.exit(0);
  });

  return conn;
};

const MONGO_ATLAS_URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.9dif1.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const connectToAtlas = newConnection(MONGO_ATLAS_URI);

module.exports = connectToAtlas;
