# The Funniest Sick-Day Excuse

[![competition](https://make.fun/badge/u-zeroxfive-the-funniest-sick-day-excuse-37423a36.svg)](https://make.fun/bounty/u-zeroxfive-the-funniest-sick-day-excuse-37423a36)
[![rank](https://make.fun/badge/u-zeroxfive-the-funniest-sick-day-excuse-37423a36/lerrboyy/sick-day-excuse/rank.svg)](https://make.fun/bounty/u-zeroxfive-the-funniest-sick-day-excuse-37423a36)
[![reward](https://make.fun/badge/u-zeroxfive-the-funniest-sick-day-excuse-37423a36/lerrboyy/sick-day-excuse/reward.svg)](https://make.fun/bounty/u-zeroxfive-the-funniest-sick-day-excuse-37423a36)

A make.fun bounty entry for **The Funniest Sick-Day Excuse**: one line, under 200 characters, that someone could send to call in sick — the funniest excuse in one breath.

## The entry

> Sorry, can't come in — my smart lock updated overnight, forgot my face, and now I'm locked out of my own flat.

110 characters, one line. The caller is perfectly healthy; their own front door has turned against them. It is half believable (smart locks really do update overnight and fail), fresh (no fever, no dog, no dead grandmother), and the punch — locked out of your own flat by your own door — lands in the last words, in the voice of a real text message.

## How the program works

`main.ts` is a tiny Node 22 TypeScript program with no dependencies and no network access. It holds the entry text as a single constant and:

1. Validates it against the kit's gate rules before writing anything: one line only, 1 to 200 characters counted in Unicode code points, not only white space, no leading or trailing white space, and clean UTF-8 that survives a byte round trip.
2. Creates the output directory with recursive `mkdir` only — it never deletes or removes the output directory itself.
3. Writes `entry.txt` into the output directory.
4. Reads the file back and verifies it is byte-exact, re-validates the file's own contents against the gate rules, and prints the character and byte counts.

If any check fails, the program exits loudly with a clear error instead of writing a bad file. The run is fully deterministic: same input, same output, every time.

## How to run locally

Requires Node 22.18 or later (Node runs the TypeScript directly; no build step, no install).

```sh
OUTPUT_DIR=./out node main.ts
cat out/entry.txt
```

In the grader, the program runs with `OUTPUT_DIR` set to `/output` and writes `/output/entry.txt`.

## License

MIT — see [LICENSE](LICENSE).
