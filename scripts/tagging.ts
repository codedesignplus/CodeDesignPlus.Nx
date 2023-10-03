import { execSync } from 'child_process';

/**
 * @returns New tag for release
 */
function getReleaseVersion(): string {
  const lastTag: string = execSync('git tag | sort -V | tail -1').toString().trim();

  if (lastTag) {
    return createReleaseTag(lastTag);
  }
  return createFirstTag();
}

/**
 * @param lastTag - The last tag/version
 * @returns New tag for release
 */
function createReleaseTag(lastTag: string): string {
  const splitted: string[] = lastTag.replace(/\D/g, '').split('');
  const major: number = Number(splitted[0]),
    minor: number = Number(splitted[1]),
    patch: number = Number(splitted[2]);

  let newVersion: string;

  if (patch > 8) {
    if (minor > 8) {
      newVersion = `${major + 1}.${0}.${0}`;
    } else {
      newVersion = `${major}.${minor + 1}.${0}`;
    }
  } else {
    newVersion = `${major}.${minor}.${patch + 1}`;
  }

  return newVersion;
}

/**
 * @returns First tag
 */
function createFirstTag(): string {
  return '1.0.0';
}

/**
 * @description Saves version and changes and pushes it to the repo
 * @param message - Commit message
 */
function commitAndSaveChanges(message: string): void {
  const releaseVersion: string = getReleaseVersion();

  execSync(
    `git tag -a v${releaseVersion}-release -m "Release ${releaseVersion}"`
  );
  console.log('status:');
  execSync('git status');
  execSync('git add .');
  execSync(
    `git commit -m "chore(release):${releaseVersion}, libs versions: ${message}"`
  );
  execSync('git push --follow-tags');
  console.log('tags pushed to repo');
}

export {
  commitAndSaveChanges
};
