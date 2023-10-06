import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Tree, readProjectConfiguration } from '@nx/devkit';

import {
  allFilesInDir,
  computePath,
  copyTemplate,
  generateFiles,
  libraryGenerator,
  replace,
} from './generator';
import { LibraryGeneratorSchema } from './schema';
import fs from 'fs';
import path from 'path';

describe('library generator', () => {
  let tree: Tree;

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    const options: LibraryGeneratorSchema = { name: 'Test', org: '' };

    await libraryGenerator(tree, options);

    const config = readProjectConfiguration(tree, 'CodeDesignPlus.Net.Test');

    expect(config).toBeDefined();
  });

  it('should run successfully with cutsom org', async () => {
    const options: LibraryGeneratorSchema = { name: 'Test', org: 'MyOrg' };

    await libraryGenerator(tree, options);

    const config = readProjectConfiguration(tree, 'MyOrg.Net.Test');

    expect(config).toBeDefined();
  });

  it('should replace the name and org', () => {
    const options: LibraryGeneratorSchema = { name: 'Test', org: 'MyOrg' };

    const value = replace('CodeDesignPlus.Net.Library', options);

    expect(value).toBe('MyOrg.Net.Test');
  });

  it('should replace to target path', () => {
    const path = '/virtual/submodules/CodeDesigPlus.Net.Library/class.cs';
    const source = '/virtual/submodules/CodeDesigPlus.Net.Library/';

    const target = '/packages/CodeDesignPlus.Net.Test';

    const value = computePath(source, target, path);

    expect(value).toBe('/packages/CodeDesignPlus.Net.Test/class.cs');
  });

  describe('allFilesInDir', () => {
    const source = './__allFiles__';
    const filesFake = ['file1.txt', 'subfolder/file2.txt'];

    beforeEach(() => {
      fs.mkdirSync(path.join(__dirname, source));
      fs.mkdirSync(path.join(__dirname, source, 'subfolder'));
      filesFake.forEach((file) =>
        fs.writeFileSync(path.join(__dirname, source, file), `${file} - Hi`)
      );
    });

    it('should return all files in dir', () => {
      const files = allFilesInDir(path.join(__dirname, source));

      expect(files.length).toBe(filesFake.length);
    });

    afterEach(() => {
      fs.rmSync(path.join(__dirname, source), { recursive: true });
    });
  });

  describe('copyTemplate', () => {
    const base = path.join(__dirname, '__copy__');
    const source = path.join(base, 'source');
    const target = path.join(base, 'target');
    const filesFake = ['file1.txt', 'subfolder/file2.txt'];

    beforeEach(() => {
      fs.mkdirSync(base);
      fs.mkdirSync(source);
      fs.mkdirSync(target);
      fs.mkdirSync(path.join(source, 'subfolder'));
      filesFake.forEach((file) =>
        fs.writeFileSync(path.join(source, file), `${file} - Hi`)
      );
    });

    it('should return false when directory source not exist', () => {
      const value = copyTemplate(source, target);

      expect(value).toBe(false);
    });

    it('should copy all files in source to target', () => {
      fs.mkdirSync(path.join(source, 'submodules'));
      fs.mkdirSync(
        path.join(source, 'submodules', 'CodeDesignPlus.Net.Library')
      );
      fs.writeFileSync(
        `${source}/submodules/CodeDesignPlus.Net.Library/class.cs`,
        'class.cs - Hi'
      );

      const result = copyTemplate(source, target);

      const filesExpected = fs.readdirSync(
        `${source}/submodules/CodeDesignPlus.Net.Library/`
      );
      const files = fs.readdirSync(target);

      expect(result).toBe(true);
      expect(files.length).toBe(filesExpected.length);
    });

    afterEach(() => {
      fs.rmSync(base, { recursive: true });
    });
  });

  describe('generateFiles', () => {
    const base = path.join(__dirname, '__generate__');
    const target = path.join(base, 'target');
    const source = path.join(base, 'source');
    const subModules = path.join(source, 'submodules');
    const library = path.join(subModules, 'CodeDesignPlus.Net.Library');

    beforeEach(() => {
      fs.mkdirSync(base);
      fs.mkdirSync(source);
      fs.mkdirSync(target);
      fs.mkdirSync(subModules);
      fs.mkdirSync(library);
    });

    it('should generate files and replace org and name', async () => {
      const options: LibraryGeneratorSchema = { name: 'Phone', org: 'MyOrg' };

      fs.writeFileSync(
        `${source}/submodules/CodeDesignPlus.Net.Library/PhoneService.cs`,
        'namespace CodeDesignPlus.Net.Library.Services; public class PhoneService {}'
      );

      generateFiles(tree, source, target, options);

      const fileExpected = path.join(
        target,
        'submodules',
        'CodeDesignPlus.Net.Library',
        'PhoneService.cs'
      );
      const exist = tree.exists(fileExpected);

      const data = tree.read(fileExpected).toString();

      expect(exist).toBe(true);
      expect(data).toBe(
        'namespace MyOrg.Net.Phone.Services; public class PhoneService {}'
      );
    });

    afterEach(() => {
      fs.rmSync(path.join(__dirname, '__generate__'), { recursive: true });
    });
  });
});
