import path from "node:path";
import retry from "async-retry";
import { dim, red } from "picocolors";
import { mkdir, readJsonSync, existsSync } from "fs-extra";
import * as logger from "./logger";
import {
  downloadAndExtractExample,
  type RepoInfo,
} from "./examples";
import { isWriteable } from "./isWriteable";
import { isFolderEmpty } from "./isFolderEmpty";
import type { PackageJson } from "./types";

function isErrorLike(err: unknown): err is { message: string } {
  return (
    typeof err === "object" &&
    err !== null &&
    typeof (err as { message?: unknown }).message === "string"
  );
}

export class DownloadError extends Error {}

export async function createProject({
  appPath,
  example,
  isDefaultExample,
  examplePath,
}: {
  appPath: string;
  example: string;
  isDefaultExample?: boolean;
  examplePath?: string;
}): Promise<{
  cdPath: string;
  hasPackageJson: boolean;
  repoInfo?: RepoInfo;
}> {
  let repoInfo: RepoInfo | undefined;

  repoInfo = {
    username: "cording12",
    name: "next-turbo",
    branch: "main",
    filePath: "examples/next-turbo",
  };

  const root = path.resolve(appPath);

  if (!(await isWriteable(path.dirname(root)))) {
    logger.error(
      "The application path is not writable, please check folder permissions and try again."
    );
    logger.error(
      "It is likely you do not have write permissions for this folder."
    );
    process.exit(1);
  }

  const appName = path.basename(root);

  try {
    await mkdir(root, { recursive: true });
  } catch (err) {
    logger.error("Unable to create project directory");
    logger.error(err);
    process.exit(1);
  }

  const { isEmpty, conflicts } = isFolderEmpty(root);
  if (!isEmpty) {
    logger.error(
      `${dim(root)} has ${conflicts.length} conflicting ${
        conflicts.length === 1 ? "file" : "files"
      } - please try a different location`
    );
    process.exit(1);
  }

  const originalDirectory = process.cwd();
  process.chdir(root);

  /**
   * clone the repository
   */
  logger.log();
  const loader = logger.turboLoader(
    "Downloading files... (This might take a moment)"
  );
  try {
    loader.start();
    await retry(() => downloadAndExtractExample(root, example), {
      retries: 3,
    });
  } catch (reason) {
    throw new DownloadError(
      isErrorLike(reason) ? reason.message : String(reason)
    );
  } finally {
    loader.stop();
  }

  const rootPackageJsonPath = path.join(root, "package.json");
  const hasPackageJson = existsSync(rootPackageJsonPath);

  if (hasPackageJson) {
    let packageJsonContent;
    try {
      packageJsonContent = readJsonSync(rootPackageJsonPath) as PackageJson;
    } catch {
      // ignore
    }
  }

  let cdPath: string = appPath;

  if (path.join(originalDirectory, appName) === appPath) {
    cdPath = appName;
  }

  return { cdPath, hasPackageJson, repoInfo };
}
