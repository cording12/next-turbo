import path from "node:path";
import { bold, red, green } from "picocolors";

import { install, getWorkspaceDetails } from "@cnt/workspaces";
import type { Project } from "@cnt/workspaces";

import {
  createProject,
  DownloadError,
  logger,
  getAvailablePackageManagers,
} from "@cnt/utils";

import { isOnline } from "../../utils/isOnline";
import { tryGitCommit, tryGitInit } from "../../utils/git";
import * as prompts from "./prompts";
import type { CreateCommandArgument, CreateCommandOptions } from "./types";

const { turboGradient, turboLoader, info, error, warn } = logger;

function handleErrors(err: unknown) {
  // @ts-ignore
  if (err instanceof DownloadError) {
    error(red("Unable to download template from Github"));
    // @ts-ignore
    error(red(err.message));
    process.exit(1);
  }

  // handle unknown errors (no special handling, just re-throw to catch at root)
  else {
    throw err;
  }
}

const DEFAULT_EXAMPLES = new Set(["basic", "default"]);

function isDefaultExample(example: string): boolean {
  return DEFAULT_EXAMPLES.has(example);
}

export async function create(
  directory: CreateCommandArgument,
  opts: CreateCommandOptions
) {
  const { skipInstall } = opts;
  const [online, availablePackageManagers] = await Promise.all([
    isOnline(),
    getAvailablePackageManagers(),
  ]);

  if (!online) {
    error(
      "You appear to be offline. Please check your network connection and try again."
    );
    process.exit(1);
  }

  // Prompts the user for the directory to create the project in
  const { root } = await prompts.directory({ dir: directory });

  // Gets file paths from prompt
  const relativeProjectDir = path.relative(process.cwd(), root);
  const projectDirIsCurrentDir = relativeProjectDir === "";

  const { example, examplePath } = opts;
  const exampleName = example && example !== "default" ? example : "next-turbo";

  let projectData = {} as Awaited<ReturnType<typeof createProject>>;

  // Create the project
  try {
    projectData = await createProject({
      appPath: root,
      example: exampleName,
      isDefaultExample: isDefaultExample(exampleName),
      examplePath,
    });
  } catch (err) {
    handleErrors(err);
  }

  const { hasPackageJson, repoInfo } = projectData;

  // create a new git repo after creating the project
  tryGitInit(root, `feat(create-next-turbo): create ${exampleName}`);

  // read the project after creating it to get details about workspaces, package manager, etc.
  let project: Project = {} as Project;

  try {
    project = await getWorkspaceDetails({ root });
  } catch (err) {
    handleErrors(err);
  }

  // Expected to be pnpm - removed logic around package manager selection
  const projectPackageManager = {
    name: project.packageManager,
    version: availablePackageManagers[project.packageManager],
  };

  info("Creating a new Turborepo with pnpm");
  logger.log();

  // run install
  logger.log();
  if (hasPackageJson && !skipInstall) {
    const loader = turboLoader("Installing dependencies...").start();

    await install({
      project,
      to: projectPackageManager,
      options: {
        interactive: false,
      },
    });

    tryGitCommit("feat(create-turbo): install dependencies");
    loader.stop();
  }

  if (projectDirIsCurrentDir) {
    logger.log(
      `${bold(turboGradient(">>> Success!"))} Your new Next Turbo project is ready.`
    );
  } else {
    logger.log(
      `${bold(turboGradient(">>> Success!"))} Created your Next Turbo project at ${green(
        relativeProjectDir
      )}`
    );
  }
}
