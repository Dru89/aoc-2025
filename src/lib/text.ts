export default function splitLines(text: string): string[] {
  const result = text.split("\n");
  if (result.at(-1) === "") {
    return result.slice(0, -2);
  } else {
    return result;
  }
}
