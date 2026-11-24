// The Funniest Sick-Day Excuse — make.fun bounty entry.
// Writes one line, under 200 characters, to <OUTPUT_DIR>/entry.txt.
// No dependencies, no network, fully deterministic.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: one line, a real text message, punch at the end.
const ENTRY =
  "Sorry, can't come in \u2014 my smart lock updated overnight, forgot my face, and now I'm locked out of my own flat.";

// Kit gate: /output/entry.txt must be UTF-8 text of 1 to 200 characters,
// not only white space.
const MIN_CHARS = 1;
const MAX_CHARS = 200;

function fail(message: string): never {
  console.error(`error: ${message}`);
  process.exit(1);
}

function charCount(text: string): number {
  // Count Unicode code points, not UTF-16 code units, so characters
  // outside the BMP (and the em dash) count the way the gate counts them.
  return Array.from(text).length;
}

function validateEntry(text: string): void {
  if (text.length === 0) {
    fail("entry is empty");
  }
  if (text.trim().length === 0) {
    fail("entry is only white space");
  }
  const chars = charCount(text);
  if (chars > MAX_CHARS) {
    fail(`entry is ${chars} characters, over the ${MAX_CHARS} limit`);
  }
  if (chars < MIN_CHARS) {
    fail(`entry is under the ${MIN_CHARS} character minimum`);
  }
  if (text.includes("\n") || text.includes("\r")) {
    fail("entry must be a single line");
  }
  if (text !== text.trim()) {
    fail("entry has leading or trailing white space");
  }
  // The file must survive a UTF-8 round trip byte for byte.
  if (Buffer.from(text, "utf8").toString("utf8") !== text) {
    fail("entry is not clean UTF-8 text");
  }
}

function main(): void {
  const outputDir = process.env.OUTPUT_DIR ?? "/output";
  if (outputDir.length === 0) {
    fail("OUTPUT_DIR is empty");
  }

  validateEntry(ENTRY);

  // Create the output directory if needed. Never delete or remove it:
  // the grader's /output is a mount point and removing it fails the run.
  mkdirSync(outputDir, { recursive: true });

  const outFile = join(outputDir, "entry.txt");
  writeFileSync(outFile, ENTRY, "utf8");

  // Read it back and verify byte-exact, then re-validate the file's own
  // contents against the gate rules so a bad write can never slip through.
  const readBack = readFileSync(outFile, "utf8");
  if (readBack !== ENTRY) {
    fail("entry.txt read back does not match the entry");
  }
  if (Buffer.byteLength(readBack, "utf8") !== Buffer.byteLength(ENTRY, "utf8")) {
    fail("entry.txt byte length does not match the entry");
  }
  validateEntry(readBack);

  console.log(
    `wrote ${outFile} (${charCount(ENTRY)} characters, ${Buffer.byteLength(ENTRY, "utf8")} bytes)`,
  );
}

main();
