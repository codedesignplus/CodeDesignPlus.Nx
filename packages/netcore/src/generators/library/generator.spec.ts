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

/**
 * Tests for the library generator
 */
describe('library generator', () => {
  let tree: Tree;

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  /**
   * Tests if the library generator runs successfully with default configuration
   */
  it('should generate library with default organization name', async () => {
    const options: LibraryGeneratorSchema = { name: 'Test', org: '' };

    await libraryGenerator(tree, options);

    const config = readProjectConfiguration(tree, 'CodeDesignPlus.Net.Test');

    expect(config).toBeDefined();
  });

  /**
   * Tests if the library generator runs successfully with a custom organization name
   */
  it('should generate library with custom organization name', async () => {
    const options: LibraryGeneratorSchema = { name: 'Test', org: 'MyOrg' };

    await libraryGenerator(tree, options);

    const config = readProjectConfiguration(tree, 'MyOrg.Net.Test');

    expect(config).toBeDefined();
  });

  /**
   * Tests the replacement functionality for organization and name
   */
  it('should replace default organization and name with custom values', () => {
    const options: LibraryGeneratorSchema = { name: 'Test', org: 'MyOrg' };

    const value = replace('CodeDesignPlus.Net.Library', options);

    expect(value).toBe('MyOrg.Net.Test');
  });

  /**
   * Tests the path computation for target replacement
   */
  it('should compute target path based on provided source and target', () => {
    const path = '/virtual/submodules/CodeDesigPlus.Net.Library/class.cs';
    const source = '/virtual/submodules/CodeDesigPlus.Net.Library/';

    const target = '/packages/CodeDesignPlus.Net.Test';

    const value = computePath(source, target, path);

    expect(value.split(/[\\/]/)).toEqual(
      '/packages/CodeDesignPlus.Net.Test/class.cs'.split('/')
    );
  });

  /**
   * Tests retrieving all files in a directory
   */
  describe('allFilesInDir', () => {
    const source = './__allFiles__';
    const filesFake = ['file1.txt', 'subfolder/file2.txt'];

    beforeEach(() => {
      fs.mkdirSync(source);
      fs.mkdirSync(path.join(source, 'subfolder'));
      filesFake.forEach((file) =>
        fs.writeFileSync(path.join(source, file), `${file} - Hi`)
      );
    });

    it('should retrieve all files from a given directory', () => {
      const files = allFilesInDir(source);

      expect(files.length).toBe(filesFake.length);
    });

    afterEach(() => {
      fs.rmSync(source, { recursive: true });
    });
  });

  /**
   * Tests copying template functionality
   */
  describe('copyTemplate', () => {
    const base = path.join('./__copy__');
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

    it('should return false if source directory does not exist', () => {
      const value = copyTemplate(source, target);

      expect(value).toBe(false);
    });

    it('should copy all files from source to target directory', () => {
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

  /**
   * Tests generating files functionality
   */
  describe('generateFiles', () => {
    const base = path.join('./__generate__');
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

    it('should generate files and replace organization and name in the content', async () => {
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
      fs.rmSync(base, { recursive: true });
    });
  });
});
