export type PackageManager = "npm" | "yarn" | "pnpm";

export type DependencyList = Record<string, string>;

export interface DependencyGroups {
  dependencies?: DependencyList;
  devDependencies?: DependencyList;
  peerDependencies?: DependencyList;
  optionalDependencies?: DependencyList;
}

export interface PackageJson extends DependencyGroups {
  name: string;
  version: string;
  description?: string;
  private?: boolean;
  packageManager?: string;
  workspaces?: Array<string> | { packages?: Array<string> };
  main?: string;
  module?: string;
  exports?: object;
  scripts?: Record<string, string>;
}
