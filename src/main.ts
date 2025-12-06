import "dotenv/config";
import { asDay, asPart, type Day, type Module, type Part } from "./types.js";
import { fetchInput } from "./lib/fetch.js";

async function run(day: Day, part: Part) {
  const [input, module] = await Promise.all([
    fetchInput({ day }),
    import(`./day${day}/${part}.js`) as Promise<Module>,
  ]);
  module.default(input);
}

async function main() {
  const input = process.argv.at(-1);
  if (typeof input === "string") {
    const exec = /(1?\d)([ab])/.exec(input);
    if (exec != null) {
      await run(asDay(exec[1]), asPart(exec[2]));
      return;
    }
  }

  let day: Day;
  let part: Part;
  try {
    day = asDay(process.argv.at(-2));
    part = asPart(process.argv.at(-1));
  } catch {
    console.error(`Usage: npm run check 1a`);
    console.error(`   or: npm run check 1 a`);
    return;
  }
  run(day, part);
}

await main();
