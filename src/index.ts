#!/usr/bin/env node

import { execSync } from "child_process";
import { copyFileSync, existsSync } from "fs";
import { resolve } from "path";

function main() {
  if (existsSync(resolve(process.cwd(), "yarn.lock"))) {
    console.info("Running yarn add -D prettier");
    execSync("yarn add -D prettier");
    console.info("Running yarn add -D prettier-plugin-organize-imports");
    execSync("yarn add -D prettier-plugin-organize-imports");
  } else if (existsSync(resolve(process.cwd(), "package-lock.json"))) {
    console.info("Running npm install --save-dev prettier");
    execSync("npm install --save-dev prettier");
    console.info(
      "Running npm install --save-dev prettier-plugin-organize-imports"
    );
    execSync("npm install --save-dev prettier-plugin-organize-imports");
  } else {
    console.info(
      "Neither package-lock or yarn.lock detected. Please manually install prettier."
    );
  }

  console.info("Creating .prettierrc");
  const prettierrc = ".prettierrc";
  const source = resolve(__dirname, "assets", prettierrc);
  const dest = resolve(process.cwd(), prettierrc);
  copyFileSync(source, dest);
}

main();
