import type { NextFunction, Request, Response } from "express";
import {
  access,
  constants,
  mkdir,
  writeFile,
  appendFile,
} from "node:fs/promises";
import path from "node:path";

//Creating a log file and checking existence
async function fileExists(filePath: string): Promise<boolean> {
  try {
    await access(filePath, constants.W_OK);
    return true;
  } catch {
    return false;
  }
}

export async function ensureLogFile(filePath: string): Promise<void> {
  const exists = await fileExists(filePath);

  if (!exists) {
    await mkdir(path.dirname(filePath), { recursive: true });
    await writeFile(filePath, "", { encoding: "utf-8" });
  }
}

// TODO Double (app.ts S.18)!!!
const LOG_FILE = path.join(process.cwd(), "logs", "access.log");

async function addLogMessage(message: string): Promise<void> {
  await appendFile(LOG_FILE, message + "\n", { encoding: "utf-8" });
}

export function logger(req: Request, res: Response, next: NextFunction) {
  res.on("finish", async () => {
    const logEntry = [
      new Date().toISOString(),
      req.method,
      req.ip,
      req.originalUrl,
      res.statusCode,
    ].join(" ");

    await addLogMessage(logEntry);
  });

  next();
}
