import express from "express";
import nunjucks from "nunjucks";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { closeDB, connectDB } from "./models/db";

import { ensureLogFile, logger } from "./middleware/logger";

import websiteRouter from "./routes/websiteRoutes";
import adminRouters from "./routes/adminRoutes";

// Define path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const assetsDir = path.join(projectRoot, "src", "assets");
// Logger
const LOG_DIR = path.join(projectRoot, "logs");
const LOG_FILE = path.join(LOG_DIR, "access.log");

const app = express();

// Serve static files from the public directory
app.use("/static", express.static("public"));

// Configure Nunjucks
nunjucks.configure(path.join(projectRoot, "views"), {
  autoescape: true,
  express: app,
  watch: true,
});

// for forms
app.use(express.urlencoded({ extended: true }));

// Logger
await ensureLogFile(LOG_FILE);
app.use(logger);

// Website routers
app.use("/", websiteRouter);
// Admin routers
app.use("/", adminRouters);
// API routers
//

// DB connection
await connectDB();

// Start the Express server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Event Hub running at http://localhost:${PORT}`);
});

// SIGINT / SIGTERM to close the database connection
process.on("SIGINT", async () => {
  console.log("SIGINT received. Closing database connection...");
  await closeDB();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("SIGTERM received. Closing database connection...");
  await closeDB();
  process.exit(0);
});
