import path from "node:path";
import { existsSync, writeJSONSync, rmSync, rm } from "fs-extra";
import { ConvertError } from "../errors";
import { updateDependencies } from "../updateDependencies";
import type {
  DetectArgs,
  ReadArgs,
  CreateArgs,
  RemoveArgs,
  ConvertArgs,
  CleanArgs,
  Project,
  ManagerHandler,
  Manager,
} from "../types";
import {
  getMainStep,
  getWorkspaceInfo,
  getPackageJson,
  expandPaths,
  expandWorkspaces,
  getWorkspacePackageManager,
  parseWorkspacePackages,
  removeLockFile,
} from "../utils";

const PACKAGE_MANAGER_DETAILS: Manager = {
  name: "yarn",
  lock: "yarn.lock",
};

/**
 * Check if a given project is using yarn workspaces
 * Verify by checking for the existence of:
 *  1. yarn.lock
 *  2. packageManager field in package.json
 */
// eslint-disable-next-line @typescript-eslint/require-await -- must match the detect type signature
async function detect(args: DetectArgs): Promise<boolean> {
  const lockFile = path.join(args.workspaceRoot, PACKAGE_MANAGER_DETAILS.lock);
  const packageManager = getWorkspacePackageManager({
    workspaceRoot: args.workspaceRoot,
  });
  return (
    existsSync(lockFile) || packageManager === PACKAGE_MANAGER_DETAILS.name
  );
}

/**
  Read workspace data from yarn workspaces into generic format
*/
async function read(args: ReadArgs): Promise<Project> {
  const isYarn = await detect(args);
  if (!isYarn) {
    throw new ConvertError("Not a yarn project", {
      type: "package_manager-unexpected",
    });
  }

  const packageJson = getPackageJson(args);
  const { name, description } = getWorkspaceInfo(args);
  const workspaceGlobs = parseWorkspacePackages({
    workspaces: packageJson.workspaces,
  });
  return {
    name,
    description,
    packageManager: PACKAGE_MANAGER_DETAILS.name,
    paths: expandPaths({
      root: args.workspaceRoot,
      lockFile: PACKAGE_MANAGER_DETAILS.lock,
    }),
    workspaceData: {
      globs: workspaceGlobs,
      workspaces: expandWorkspaces({
        workspaceGlobs,
        ...args,
      }),
    },
  };
}

/**
 * Create yarn workspaces from generic format
 *
 * Creating yarn workspaces involves:
 *  1. Adding the workspaces field in package.json
 *  2. Setting the packageManager field in package.json
 *  3. Updating all workspace package.json dependencies to ensure correct format
 */
// eslint-disable-next-line @typescript-eslint/require-await -- must match the create type signature
async function create(args: CreateArgs): Promise<void> {
  const { project, to, options } = args;
  const hasWorkspaces = project.workspaceData.globs.length > 0;

  const packageJson = getPackageJson({ workspaceRoot: project.paths.root });

  packageJson.packageManager = `${to.name}@${to.version}`;

  if (hasWorkspaces) {
    // workspaces field
    packageJson.workspaces = project.workspaceData.globs;

    if (!options?.dry) {
      writeJSONSync(project.paths.packageJson, packageJson, { spaces: 2 });
    }

    // root dependencies
    updateDependencies({
      workspace: { name: "root", paths: project.paths },
      project,
      to,
      options,
    });

    // workspace dependencies
    project.workspaceData.workspaces.forEach((workspace) => {
      updateDependencies({ workspace, project, to, options });
    });
  } else if (!options?.dry) {
    writeJSONSync(project.paths.packageJson, packageJson, { spaces: 2 });
  }
}

/**
 * Remove yarn workspace data
 *
 * Removing yarn workspaces involves:
 *  1. Removing the workspaces field from package.json
 *  2. Removing the node_modules directory
 */
async function remove(args: RemoveArgs): Promise<void> {
  const { project, options } = args;
  const hasWorkspaces = project.workspaceData.globs.length > 0;

  const packageJson = getPackageJson({ workspaceRoot: project.paths.root });

  if (hasWorkspaces) {
    delete packageJson.workspaces;
  }

  delete packageJson.packageManager;

  if (!options?.dry) {
    writeJSONSync(project.paths.packageJson, packageJson, { spaces: 2 });

    // collect all workspace node_modules directories
    const allModulesDirs = [
      project.paths.nodeModules,
      ...project.workspaceData.workspaces.map((w) => w.paths.nodeModules),
    ];
    try {
      await Promise.all(
        allModulesDirs.map((dir) => rm(dir, { recursive: true, force: true }))
      );
    } catch (err) {
      throw new ConvertError("Failed to remove node_modules", {
        type: "error_removing_node_modules",
      });
    }
  }
}

/**
 * Clean is called post install, and is used to clean up any files
 * from this package manager that were needed for install,
 * but not required after migration
 */
// eslint-disable-next-line @typescript-eslint/require-await -- must match the clean type signature
async function clean(args: CleanArgs): Promise<void> {
  const { project, options } = args;

  if (!options?.dry) {
    rmSync(project.paths.lockfile, { force: true });
  }
}

/**
 * Attempts to convert an existing, non yarn lockfile to a yarn lockfile
 *
 * If this is not possible, the non yarn lockfile is removed
 */
async function convertLock(args: ConvertArgs): Promise<void> {
  const { project, options } = args;

  // handle moving lockfile from `packageManager` to yarn
  switch (project.packageManager) {
    case "pnpm":
      // can't convert from pnpm to yarn - just remove the lock
      removeLockFile({ project, options });
      break;
    case "npm":
      // can't convert from npm to yarn - just remove the lock
      removeLockFile({ project, options });
      break;
    case "yarn":
      // we're already using yarn, so we don't need to convert
      break;
  }
}

export const yarn: ManagerHandler = {
  detect,
  read,
  create,
  remove,
  clean,
  convertLock,
};
