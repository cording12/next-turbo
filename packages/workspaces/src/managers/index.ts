import type { PackageManager } from "@cnt/utils";
import type { ManagerHandler } from "../types";
import { pnpm } from "./pnpm";
import { npm } from "./npm";
import { yarn } from "./yarn";

export const MANAGERS: Record<PackageManager, ManagerHandler> = {
  pnpm,
  yarn,
  npm,
};
