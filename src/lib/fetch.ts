import fs from "node:fs/promises";
import type { Day } from "../types.js";

export interface FetchOptions {
  day: Day;
  session?: string;
}

function isNodeError(error: unknown): error is NodeJS.ErrnoException {
  return typeof error === "object" && error !== null && "code" in error;
}

function getCacheFile(day: number) {
  return new URL(`../../cache/${day}.txt`, import.meta.url);
}

async function readCacheFile(day: number): Promise<string | null> {
  try {
    return await fs.readFile(getCacheFile(day), "utf8");
  } catch (error) {
    if (isNodeError(error) && error.code === "ENOENT") {
      console.info(`No cache file found for ${day}`);
      return null;
    }
    throw error;
  }
}

async function writeCacheFile(day: number, data: string): Promise<void> {
  await fs.writeFile(getCacheFile(day), data, "utf8");
}

async function fetchFromWeb(
  day: number,
  session: string | undefined
): Promise<string> {
  if (session == null) {
    throw new Error("No session was provided. Can't fetch from web.");
  }

  const response = await fetch(
    `https://adventofcode.com/2025/day/${day}/input`,
    {
      headers: {
        cookie: `session=${session}`,
      },
      referrer: "https://adventofcode.com/2025/day/1",
      body: null,
      method: "GET",
      mode: "cors",
      credentials: "include",
    }
  );

  if (!response.ok) {
    try {
      const text = await response.text();
      console.error(text);
    } catch {}
    throw new Error(`Could not fetch input for day ${day}: ${response.status}`);
  }

  const input = await response.text();
  return input;
}

export async function fetchInput({
  day,
  session,
}: FetchOptions): Promise<string> {
  const cached = await readCacheFile(day);
  if (cached != null) {
    return cached;
  }

  const result = await fetchFromWeb(day, session ?? process.env.SESSION_COOKIE);
  await writeCacheFile(day, result);
  return result;
}
