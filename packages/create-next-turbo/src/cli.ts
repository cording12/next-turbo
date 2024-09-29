#!/usr/bin/env node

// Based on https://github.com/vercel/turborepo/blob/ad4cf20f9d59a39196eae22102bced36bf5fd76b/packages/create-turbo/src/cli.ts
import http from "node:http";
import https from "node:https";
import { bold } from "picocolors";
import { Command, Option } from "commander";
import { logger } from "@cnt/utils";
import { ProxyAgent } from "proxy-agent";
import cliPkg from "../package.json";
import { create } from "./commands";

// Support http proxy vars
const agent = new ProxyAgent();
http.globalAgent = agent;
https.globalAgent = agent;

const createNextTurboCli = new Command();

// create
createNextTurboCli
  .name(bold(logger.turboGradient("create-next-turbo")))
  .description("Create a new Next-Turbo project")
  .usage(`${bold("<project-directory>")} [options]`)

  .argument("[project-directory]")
  .addOption(
    new Option(
      "-m, --package-manager <package-manager>",
      "Specify the package manager to use"
    ).choices(["npm", "yarn", "pnpm"])
  )
  .option(
    "--skip-install",
    "Do not run a package manager install after creating the project",
    false
  )
  .option(
    "-e, --example <name>",
    `
  An example to bootstrap the app with. You can use an example name
  from the official next-turbo repo
  `
  )
  .version(cliPkg.version, "-v, --version", "Output the current version")
  .helpOption("-h, --help", "Display help for command")
  .action(create);

createNextTurboCli.parseAsync().catch(async (reason) => {
  logger.log();
  logger.error("Unexpected error. Please report it as a bug:");
  logger.log(reason);
  logger.log();
  process.exit(1);
});
