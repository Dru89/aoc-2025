export type Day = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type Part = "a" | "b";

export interface Module {
  default(input: string): void;
}

export function asDay(input: unknown): Day {
  let result: unknown = input;
  if (typeof result === "string" && /\d+/.test(result)) {
    result = parseInt(result);
  }
  if (typeof result === "number" && result >= 1 && result <= 12) {
    return result as Day;
  }
  throw new Error(
    `Invalid input for type "Day". Found ${input} (${typeof input}). Expected 1-12 (string or number).`
  );
}

export function asPart(input: unknown): Part {
  if (input === "a" || input === "b") {
    return input;
  }
  throw new Error(
    `Invalid input for type "Part". Found ${input} (${typeof input}). Expected "a" or "b".`
  );
}
