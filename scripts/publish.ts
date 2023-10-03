import { execSync } from 'child_process';
import fs from 'fs';
import * as path from 'path';
import { GitVersionOptions, GitVersion } from '@codedesignplus/git-version';
import * as core from '@actions/core'
import { create } from 'domain';

const NPM_TOKEN =  "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"
const GITHUB_PACKAGE_TOKEN =  "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"

const getAffectedLibs = (): string[] => {
  const result: string = execSync(`npm run affected`).toString();

  return result.split('\n').filter((line) => line.trim() !== '');
};

const getDeployableLibs = (): string[] => {
  const libs = getAffectedLibs();

  return libs.filter((lib) => {
    const projectPath = path.join(__dirname, '../', 'packages', lib);

    const exist = fs.existsSync(projectPath);

    if (!exist) return false;

    const files: string[] = fs.readdirSync(projectPath);

    return files.indexOf('package.json') > -1;
  });
};

const createTag = (tag: string) => {
  execSync(`git tag ${tag}`);
  execSync(`git push origin ${tag}`);
}

const  deployLib = (name: string): string => {
  const projectPath = path.join(__dirname, '../', 'packages', name);
  const packagePath = path.join(__dirname,  '../', 'dist', 'packages', name);

  const currentVersion: string = require(path.join(
    projectPath,
    'package.json'
  )).version;

  const newVersion = getVersion(name, projectPath);

  execSync(`npm version ${newVersion.version} --no-git-tag-version`, {
    cwd: projectPath,
  });

  execSync(`npx nx affected:build`);

  execSync(`npm pack --pack-destination ${packagePath}`, {
    cwd: packagePath,
  });

  const content = `//registry.npmjs.org/:_authToken=${NPM_TOKEN} \n//npm.pkg.github.com/:_authToken=${GITHUB_PACKAGE_TOKEN}`;
  
  fs.writeFileSync(`${packagePath}/.npmrc`, content, 'utf8');

  // execSync(`npm publish --registry=https://registry.npmjs.org/ --access public`, {
  //   cwd: packagePath,
  // })
  // execSync(`npm publish --registry=https://npm.pkg.github.com/ --access public`, {
  //   cwd: packagePath,
  // })

  createTag(newVersion['version-complete'])

  return newVersion['version-complete'];
};


const deployableLibs: string[] = getDeployableLibs();

console.log(deployableLibs);

for (const lib of deployableLibs) {
  const version = deployLib(lib);

  console.log(`${lib}: new version ${version}`);
}

function getVersion(name: string, projectPath: string) {
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
}