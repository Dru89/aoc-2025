import splitLines from "../lib/text.js";

function parseStep(step: Step): number {
  const result = /^([LR])(\d+)$/.exec(step);
  if (result == null) {
    throw new Error(`Invalid step: ${step}`);
  }
  const number = result[2];
  if (number == null) {
    throw new Error(`Invalid step: ${step}`);
  }
  return result[1] === "R" ? parseInt(number) : -parseInt(number);
}

function mod(value: number, modulo: number) {
  return ((value % modulo) + modulo) % modulo;
}

type Step = `${"L" | "R"}${number}`;
export default function main(input: string) {
  const lines = (splitLines(input) as Step[]).map((step) => parseStep(step));
  let position = 50;
  let count = 0;
  lines.forEach((line) => {
    position += line;
    position = mod(position, 100);
    if (position === 0) {
      count++;
    }
  });
  console.log(`Times hit zero: ${count}`);
}
