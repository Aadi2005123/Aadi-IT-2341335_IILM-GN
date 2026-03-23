import express from "express";
import path from "path";
import cors from "cors";
import {serve} from "inngest/express";

import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
import { inngest, functions } from "./lib/inngest.js";

const app = express();

const __dirname = path.resolve()

// middleware layers
app.use(express.json());
// allow browser to include cookies in requests to our api
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));
app.use("/api/inngest", serve({ client: inngest, functions }));

app.get("/health", (req, res) => {
    res.status(200).json({ message: "api is up and running" });
});

app.get("/books", (req, res) => {
    res.status(200).json({ books: ["book1", "book2", "book3"] });
});

// make our app ready for deployment
if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

const startServer = async () => {
    try {
        if (!ENV.PORT) throw new Error("Missing required environment variable: PORT");
        if (!ENV.DB_URL) throw new Error("Missing required environment variable: DB_URL");
        await connectDB();
        app.listen(ENV.PORT, () => console.log("Server is running on port: " + ENV.PORT));
    } catch (error) {
        console.error("Error starting the server:", error);
    }
};

startServer();