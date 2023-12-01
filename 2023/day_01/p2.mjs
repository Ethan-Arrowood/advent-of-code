import fs from "node:fs";

const input = fs.readFileSync("input", "utf-8");

let t = 0;

const m = {
  1: "1",
  2: "2",
  3: "3",
  4: "4",
  5: "5",
  6: "6",
  7: "7",
  8: "8",
  9: "9",
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
};

function rev(s) {
  return s.split("").reverse().join("");
}

const r1 = /[1-9]|one|two|three|four|five|six|seven|eight|nine/g;
const r2 = /[1-9]|eno|owt|eerht|ruof|evif|xis|neves|thgie|enin/g;

for (const line of input.split("\n")) {
  t += parseInt(
    m[line.match(r1)[0]] +
    m[rev(rev(line).match(r2)[0])]
  );
}

console.log(t);
