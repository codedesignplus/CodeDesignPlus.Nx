import { execSync } from 'child_process';
import fs from 'fs';
import * as path from 'path';
import { GitVersionOptions, GitVersion } from '@codedesignplus/git-version';

/**
 * The `Publish` class provides utilities to automate the deployment of libraries.
 * This includes reading authentication tokens from command line arguments,
 * determining which libraries have been affected by recent changes, creating Git tags,
 * and deploying libraries.
 */
export class Publish {
  /**
   * Tokens for npm and GitHub authentication.
   */
  private readonly tokens = {
    npm: '',
    github: '',
  };

  /**
   * Constructor for the `Publish` class.
   * Initializes the class by reading npm and GitHub tokens from command line arguments.
   */
  public constructor() {
    this.readArgs();
  }

  /**
   * Reads and processes command line arguments to extract authentication tokens.
   */
  private readArgs = () => {
    const args = process.argv.slice(2);

    args.forEach((arg) => {
      if (arg.startsWith('--npm-token=')) {
        this.tokens.npm = arg.split('=')[1];
      } else if (arg.startsWith('--npm-gh-token=')) {
        this.tokens.github = arg.split('=')[1];
      }
    });

    if (!this.tokens.npm || !this.tokens.github) {
      console.error('Both --npm-token and --npm-gh-token are required.');
      process.exit(1);
    }
  };

  /**
   * Retrieves the list of libraries affected by recent changes.
   * @returns An array of affected library names.
   */
  private getAffectedLibs = (): string[] => {
    const result: string = execSync(`npm run affected`).toString();

    return result.split('\n').filter((line) => line.trim() !== '');
  };

  /**
   * Filters out deployable libraries from affected libraries.
   * A library is considered deployable if it contains a `package.json` file.
   * @returns An array of deployable library names.
   */
  private getDeployableLibs = (): string[] => {
    const libs = this.getAffectedLibs();

    return libs.filter((lib) => {
      const projectPath = path.join(__dirname, '../', 'packages', lib);

      const exist = fs.existsSync(projectPath);

      if (!exist) return false;

      const files: string[] = fs.readdirSync(projectPath);

      return files.indexOf('package.json') > -1;
    });
  };

  /**
   * Creates a new Git tag and pushes it to the remote repository.
   * @param tag - The name of the tag to be created.
   */
  private createTag = (tag: string) => {
    execSync(`git tag ${tag}`);
    execSync(`git push origin ${tag}`);
  };

  /**
   * Computes the new version of the library based on Git commits and branch information.
   * @param name - Name of the library.
   * @param projectPath - File path to the library project.
   * @returns Object containing version details.
   */
  private getVersion = (name: string, projectPath: string) => {
    const optionsValues: Record<string, string | boolean> = {
      releaseBranch: 'main',
      releaseCandidateBranch: 'rc',
      betaBranch: 'dev',
      prefix: `${name}-`,
      majorIdentifier: 'breaking:',
      minorIdentifier: 'feat:',
      folder: projectPath,
      dirAffected: name,
      previousVersion: true,
      newVersion: true,
    };

    const options = new GitVersionOptions(optionsValues);

    const git = new GitVersion(options);

    const newVersion = git.getNewVersion();

    return newVersion;
  };

  /**
   * Deploys the specified library.
   * This involves updating the library version, building the affected library,
   * packaging it, and writing authentication tokens for npm publishing.
   * @param name - Name of the library to be deployed.
   * @returns The complete new version string.
   */
  private deployLib = (name: string) => {
    this.logTitle(`Deploy lib ${name}`);

    const projectPath = path.join(__dirname, '../', 'packages', name);
    const packagePath = path.join(__dirname, '../', 'dist', 'packages', name);

    const currentVersion: string = require(path.join(
      projectPath,
      'package.json'
    )).version;

    const newVersion = this.getVersion(name, projectPath);

    console.log(`${name} | Version: `, {
      currentVersion,
      newVersion,
    });

    this.logTitle(`Set Version: ${newVersion.version}`);

    execSync(`npm version ${newVersion.version} --no-git-tag-version`, {
      cwd: projectPath,
    });

    this.logTitle(`Build affected**`);

    execSync(`npx nx affected:build`);

    this.logTitle(`Package**`);

    execSync(`npm pack --pack-destination ${packagePath}`, {
      cwd: packagePath,
    });

    this.logTitle(`Write .npmrc**`);

    const content = `//registry.npmjs.org/:_authToken=${this.tokens.npm} \n//npm.pkg.github.com/:_authToken=${this.tokens.github}`;

    fs.writeFileSync(`${packagePath}/.npmrc`, content, 'utf8');

    this.logTitle(`Publish npmjs**`);

    execSync(
      `npm publish --registry=https://registry.npmjs.org/ --access public`,
      {
        cwd: packagePath,
      }
    );

    this.logTitle(`Publish github**`);

    execSync(
      `npm publish --registry=https://npm.pkg.github.com/ --access public`,
      {
        cwd: packagePath,
      }
    );

    this.logTitle(`Create Tag**`);

    this.createTag(newVersion['version-complete']);
  };

  /**
   * Initializes the publishing process.
   * For each deployable library, this method will execute the deployment process.
   */
  public initialize = () => {
    console.log(`Initialize Publish ...\n`);

    const deployableLibs: string[] = this.getDeployableLibs();

    for (const lib of deployableLibs) {
      console.log(`Publishing ${lib}...\n`);

      this.deployLib(lib);
    }
  };

  /**
   * Imprime un título centrado entre dos líneas de asteriscos.
   *
   * @function
   * @param {string} title - El título que se desea imprimir.
   * @example
   *
   * logTitle("Publish github");
   * // *****************************************
   * // ************ Publish github *************
   * // *****************************************
   */
  private logTitle(title: string): void {
    const totalLength = 40;
    const titleLength = title.length;
    const spaceForPadding = totalLength - titleLength - 2 * 2;
    const paddingPerSide = spaceForPadding / 2;

    const line = '*'.repeat(totalLength);
    const sidePadding = '*'.repeat(paddingPerSide);

    console.log(line);
    console.log(`${sidePadding} ${title} ${sidePadding}`);
    console.log(line);
  }
}
