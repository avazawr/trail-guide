import type { Request, Response, NextFunction } from "express";

interface Counter {
  count: number;
  updatedAt: number;
}

const counters = new Map<string, Counter>();

export const limiting = (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.headers["x-api-key"];

  if (typeof apiKey !== "string") {
    next();
    return;
  }

  const counter = counters.get(apiKey);
  const now = Date.now();

  // limit 5 requests per minute
  if (counter) {
    if (now - counter.updatedAt >= 60000) {
      counter.count = 1;
      counter.updatedAt = now;
    } else {
      counter.count++;
    }

    if (counter.count > 5) {
      res.status(429).json({ error: "Too many requests" });
      return;
    }
  } else {
    counters.set(apiKey, {
      count: 1,
      updatedAt: now,
    });
  }

  next();
};
