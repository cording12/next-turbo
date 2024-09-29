import { validateDirectory } from "@cnt/utils";
import inquirer from "inquirer";
import type { CreateCommandArgument } from "./types";

export async function directory({ dir }: { dir: CreateCommandArgument }) {
  const projectDirectoryAnswer = await inquirer.prompt<{
    projectDirectory: string;
  }>({
    type: "input",
    name: "projectDirectory",
    message: "Where would you like to create your Next Turbo project?",
    when: !dir,
    default: "./next-turbo",

    validate: (d: string) => {
      const { valid, error } = validateDirectory(d);
      if (!valid && error) {
        return error;
      }
      return true;
    },
    filter: (d: string) => d.trim(),
  });

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- we know it's defined because of the `when` condition above
  const { projectDirectory: selectedProjectDirectory = dir! } =
    projectDirectoryAnswer;

  return validateDirectory(selectedProjectDirectory);
}
