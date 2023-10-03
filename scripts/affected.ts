import { execSync } from 'child_process';
import { readdirSync } from 'fs';

/**
 * @returns Affected libraries
 */
function getAffectedLibs(): string[] {
  const result: string = execSync(`npm run affected`).toString();

  return result.split('\n').filter(line => line.trim() !== '')
}

/**
 * @returns Deployable libraries
 */
function getDeployableLibs(): string[] {
  const libs = getAffectedLibs();
  
  return libs.filter((lib) => {
    const files: string[] = readdirSync(`./libs/${lib}`);
    return files.indexOf('package.json') > -1;
  });
}

/**
 * @returns Type of commit
 */
function getTypeOfCommit(): string | null {
  const result: string = execSync('git log -1 --pretty=%B').toString();
  const matches = result.match(/^(.+):/gm);
  return matches ? matches[0] : null;
}

/**
 * @returns Type of modifier
 */
function getPublishType(): 'major' | 'patch' | 'minor' | null {
  const type: string | null = getTypeOfCommit();
  switch (type) {
    case 'feat':
      return 'major';
    case 'fix':
    case 'docs':
      return 'patch';
    case 'perf':
      return 'minor';
    default:
      return 'minor';
  }
}

export { getAffectedLibs, getDeployableLibs, getPublishType };
