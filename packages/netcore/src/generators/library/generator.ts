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
    targets: {
      restore: {
        executor: 'nx:run-commands',
        outputs: [],
        options: {
          command: 'dotnet restore {projectRoot}/${library}.sln',
        },
      },
      format: {
        executor: 'nx:run-commands',
        outputs: [],
        options: {
          command: 'dotnet format {projectRoot}/${library}.sln',
        },
      },
      build: {
        executor: 'nx:run-commands',
        outputs: [],
        options: {
          command: 'dotnet build {projectRoot}/${library}.sln',
        },
        configurations: {
          production: {
            command:
              'dotnet build {projectRoot}/${library}.sln --configuration Release',
          },
        },
      },
      test: {
        executor: 'nx:run-commands',
        outputs: [],
        options: {
          command: 'dotnet test {projectRoot}/${library}.sln',
        },
        configurations: {
          coverage: {
            command:
              'dotnet test {projectRoot}/${library}.sln --configuration Release --no-build /p:CollectCoverage=true /p:CoverletOutputFormat=opencover',
          },
        },
      },
      sonarqube: {
        executor: '@koliveira15/nx-sonarqube:scan',
        options: {
          name: '${library}',
          hostUrl: 'https://sonarcloud.io/',
          projectKey: '${library}.Key',
          organization: 'codedesignplus',
          skipTargetDefaults: false,
          branches: false,
          qualityGate: false,
          qualityGateTimeout: '600',
          skipImplicitDeps: false,
          exclusions: '**Tests*.cs',
          extra: {
            'sonar.cs.opencover.reportsPaths':
              '{projectRoot}/tests/${library}.Test/coverage.opencover.xml',
          },
        },
      },
      pack: {
        executor: 'nx:run-commands',
        outputs: [],
        options: {
          command:
            'dotnet pack {projectRoot}/${library}.sln --configuration Release /p:Version={args.version} --output dist/${library}',
        },
      },
      push: {
        executor: 'nx:run-commands',
        outputs: [],
        options: {
          command:
            'dotnet nuget push dist/${library}/*.nupkg --source {args.source} --api-key {args.token}',
        },
      },
    },
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

    const path = replace(newFile, options);

    tree.write(path, newContent);
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
