import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Tree, readProjectConfiguration } from '@nx/devkit';

import { libraryGenerator } from './generator';
import { LibraryGeneratorSchema } from './schema';

describe('library generator', () => {
  let tree: Tree;
  const options: LibraryGeneratorSchema = { name: 'Test', org: '' };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    await libraryGenerator(tree, options);
    const config = readProjectConfiguration(tree, 'CodeDesignPlus.Net.Test');
    expect(config).toBeDefined();
  });
});
