import { execSync } from 'child_process';
import * as path from 'path';

/**
 * 
 * @param name - name of the library to publish
 * @param type - type of publish to be done: Major | Minor | Patch
 * @returns The name and new version of the published library
 */
function deployLib(name: string, type: 'Major' | 'Minor' | 'Patch'): string {
  const currentVersion: string = require(path.join(__dirname, `../libs/${name}/package.json`)).version;

  console.log(`${name}: current version`, currentVersion);

  const newVersion: string = execSync(`(cd libs/${name} && npm version ${type})`)
    .toString()
    .replace('v', '');

  console.log(`${name}: new version`, newVersion);

  console.log(`${name}: start building`);
  execSync(`npm run ng build ${name}`);

  console.log(`${name}: library built`);
  console.log('creating tar file');
  const tarFileName: string = `${name}.tar.gz`;
  execSync(`(cd dist/libs/${name} && tar -cvzf ../../../${tarFileName} ./)`);

  console.log('tar file created');
  console.log('verify files');
  const files: string = execSync(`tar -ztvf ${tarFileName}`).toString();
  
  console.log('files', files);
  console.log('publishing');

  execSync(`npm publish ${tarFileName} --access public`);
  console.log(`${name} published`);

  return `${name}(${newVersion})`;
}

export { deployLib };
