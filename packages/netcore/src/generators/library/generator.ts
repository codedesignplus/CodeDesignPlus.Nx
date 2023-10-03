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
import { logger } from 'nx/src/devkit-exports';

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

  copyTemplate(tree.root, source);

  generateFiles(tree, source, target, options);

  await formatFiles(tree);
}

/**
 * Copy template from submodules/CodeDesignPlus.Net.Library to files
 * @param target Source destination
 * @param sourcePath Source origin
 */
function copyTemplate(sourcePath: string, target: string) {
  const source = `${sourcePath}/submodules/CodeDesignPlus.Net.Library`;

  if (!existsSync(source)) return;

  try {
    rmSync(source, {
      recursive: true,
    });

    cpSync(source, target, {
      recursive: true,
    });
  } catch (error) {
    logger.error(
      `Error copy files from ${source} to ${target}: ${error.message}`
    );

    throw error;
  }
}

/**
 * Create the files with the new values
 * @param tree Virtual FIle system tree
 * @param source Source origin
 * @param target Source destination
 * @param options Library Options
 */
function generateFiles(
  tree: Tree,
  source: string,
  target: string,
  options: LibraryGeneratorSchema
) {
  const files = allFilesInDir(source);

  files.forEach((filePath) => {
    let newContent: Buffer | string;

    const newFile = computePath(source, target, filePath);

    const template = readFileSync(filePath, 'utf-8');

    try {
      newContent = replace(template, options);
    } catch (e) {
      logger.error(`Error in ${filePath.replace(`${tree.root}/`, '')}:`);

      throw e;
    }

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
function computePath(source: string, target: string, filePath: string): string {
  const relativeFromSrcFolder = path.relative(source, filePath);

  return path.join(target, relativeFromSrcFolder);
}

/**
 * Search all match CodeDesignPlus and Library and replace with the new values
 * @param value Value to replace
 * @param options Object with the new values to set to the param value
 * @returns Return a new string with the new values
 */
function replace(value: string, options: LibraryGeneratorSchema) {
  return value
    .replace(/CodeDesignPlus/g, options.org)
    .replace(/Library/g, options.name);
}

/**
 * Scan all the files the @param source recursively
 * @param source Directory to scan
 * @returns Return an array of the string with all files with yours path
 */
function allFilesInDir(source: string): string[] {
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

  if (files.length === 0) {
    throw new Error(
      `generator: No files found in "${source}". Are you sure you specified the correct path?`
    );
  }

  return files;
}

export default libraryGenerator;
