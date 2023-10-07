import {
  cpSync,
  existsSync,
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
} from 'fs';
import { addProjectConfiguration, formatFiles, Tree } from '@nx/devkit';
import * as path from 'path';
import { LibraryGeneratorSchema } from './schema';

/**
 * Generate the new library
 * @param tree Virtual FIle system tree
 * @param options Library Options
 */
export async function libraryGenerator(
  tree: Tree,
  options: LibraryGeneratorSchema
) {
  options = {
    ...options,
    org: options.org ? options.org : `CodeDesignPlus`,
  };

  const library = `${options.org}.Net.${options.name}`;
  const target = `packages/${options.org}.Net.${options.name}`;

  const source = path.join(__dirname, 'files');

  addProjectConfiguration(tree, library, {
    root: target,
    projectType: 'library',
    sourceRoot: target,
    targets: {},
  });

  const template = copyTemplate(tree.root, source);

  if (template) {
    generateFiles(tree, source, target, options);
  }

  await formatFiles(tree);
}

/**
 * Copy template from submodules/CodeDesignPlus.Net.Library to files
 * @param target Source destination
 * @param sourcePath Source origin
 */
export function copyTemplate(sourcePath: string, target: string): boolean {
  const source = `${sourcePath}/submodules/CodeDesignPlus.Net.Library`;

  if (!existsSync(source)) {
    return false;
  }

  if (existsSync(target)) {
    rmSync(target, {
      recursive: true,
    });
  }

  cpSync(source, target, {
    recursive: true,
  });

  return true;
}

/**
 * Create the files with the new values
 * @param tree Virtual FIle system tree
 * @param source Source origin
 * @param target Source destination
 * @param options Library Options
 */
export function generateFiles(
  tree: Tree,
  source: string,
  target: string,
  options: LibraryGeneratorSchema
) {
  const files = allFilesInDir(source);

  files.forEach((filePath) => {
    const newFile = computePath(source, target, filePath);

    const template = readFileSync(filePath, 'utf-8');

    const newContent = replace(template, options);

    tree.write(newFile, newContent);
  });
}

/**
 * Remplate the path of the file with the target
 * @param source Source origin
 * @param target Source destination
 * @param filePath File path
 * @param options Library Options
 * @returns Return an new string of the path the file with the target update
 */
export function computePath(
  source: string,
  target: string,
  filePath: string
): string {
  const relativeFromSrcFolder = path.relative(source, filePath);

  return path.join(target, relativeFromSrcFolder);
}

/**
 * Search all match CodeDesignPlus and Library and replace with the new values
 * @param value Value to replace
 * @param options Object with the new values to set to the param value
 * @returns Return a new string with the new values
 */
export function replace(value: string, options: LibraryGeneratorSchema) {
  return value
    .replace(/CodeDesignPlus/g, options.org)
    .replace(/Library/g, options.name);
}

/**
 * Scan all the files the @param source recursively
 * @param source Directory to scan
 * @returns Return an array of the string with all files with yours path
 */
export function allFilesInDir(source: string): string[] {
  let files: string[] = [];
  const exclude = ['bin', 'obj'];

  readdirSync(source).forEach((x) => {
    const child = path.join(source, x);

    const state = statSync(child);

    if (!state.isDirectory()) {
      files.push(child);
    } else if (state.isDirectory() && !exclude.includes(x)) {
      files = [...files, ...allFilesInDir(child)];
    }
  });

  return files;
}

export default libraryGenerator;
