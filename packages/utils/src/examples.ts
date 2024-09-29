import { Stream } from "node:stream";
import { promisify } from "node:util";
import { createWriteStream, promises as fs } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import got from "got";
import { x as extract } from "tar";

const pipeline = promisify(Stream.pipeline);

export interface RepoInfo {
  username: string;
  name: string;
  branch: string;
  filePath: string;
}

async function downloadTar(url: string, name: string) {
  const tempFile = join(tmpdir(), `${name}.temp-${Date.now()}`);
  await pipeline(got.stream(url), createWriteStream(tempFile));
  return tempFile;
}

export async function downloadAndExtractExample(root: string, name: string) {
  const tempFile = await downloadTar(
    `https://codeload.github.com/cording12/next-turbo/tar.gz/main`,
    `temp-name`
  );

  let rootPath: string | null = null;

  await extract({
    file: tempFile,
    cwd: root,
    strip: 2 + name.split("/").length,
    filter: (p: string) => {
      // Determine the unpacked root path dynamically instead of hardcoding. This avoids the condition when the repository has been renamed, and the
      // old repository name is used to fetch the example. The tar download will work as it is redirected automatically, but the root directory of the extracted
      // example will be the new, renamed name instead of the name used to fetch the example.
      if (rootPath === null) {
        const pathSegments = p.split("/");
        rootPath = pathSegments.length ? pathSegments[0] : null;
      }

      return p.includes(`${rootPath}/examples/${name}/`);
    },
  });

  await fs.unlink(tempFile);
}
