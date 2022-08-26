import {
  Tree,
  formatFiles,
  names,
  offsetFromRoot,
  generateFiles,
  readJson,
} from '@nrwl/devkit';

interface Schema {
  name: string;
  project: string;
  directory?: string;
  e2eDirectory?: string;
  style?: 'scss' | 'css' | 'none';
}

interface NormalizedSchema extends Schema {
  projectRoot: string;
  genStyle: boolean;
}

// Add the project root to the options
const normalizeOptions = (tree: Tree, options: Schema): NormalizedSchema => {
  const projectRoot = readJson(tree, 'workspace.json')['projects'][
    options.project
  ];
  return {
    ...options,
    projectRoot,
    genStyle: options.style !== 'none',
  };
};

// Generate the files
const addFiles = (tree: Tree, options: NormalizedSchema) => {
  const templateOptions = {
    ...options,
    ...names(options.name),
    name: names(options.name).fileName,
    offsetFromRoot: offsetFromRoot(options.projectRoot),
    template: '',
  };

  const projectConf = readJson(tree, `${options.projectRoot}/project.json`);

  let leadingDir = projectConf['sourceRoot'].substring(
    options.projectRoot.length
  );
  let pageDir = `${options.projectRoot}/${leadingDir}${
    options.directory ? `/${options.directory}` : ''
  }/${templateOptions.fileName}`;
  // Generate the main component and unit test
  generateFiles(tree, `${__dirname}/files`, pageDir, templateOptions);
  if (templateOptions.style !== 'none') {
    // Generate a stylesheet if not `none`
    generateFiles(tree, `${__dirname}/style`, pageDir, templateOptions);
  }
  if (projectConf['targets']['storybook']) {
    // Generate a story if storybook is configured
    generateFiles(tree, `${__dirname}/story`, pageDir, templateOptions);
  }
  const e2eRoot = readJson(tree, 'workspace.json')['projects'][
    `${options.project}-e2e`
  ];
  if (e2eRoot) {
    leadingDir = readJson(tree, `${e2eRoot}/project.json`)[
      'sourceRoot'
    ].substring(e2eRoot.length);
    pageDir = `${e2eRoot}/${leadingDir}/integration${
      options.e2eDirectory ? `/${options.e2eDirectory}` : ''
    }/${templateOptions.fileName}`;
    // Generate an e2e test if an e2e project exists
    generateFiles(tree, `${__dirname}/cypress`, pageDir, templateOptions);
  }
};

// Runner. Normalizes the options, generates the files, then applies a formatter to them to match the styling
export const generator = async (tree: Tree, schema: Schema) => {
  const normalizedOptions = normalizeOptions(tree, schema);
  addFiles(tree, normalizedOptions);
  await formatFiles(tree);
};

export default generator;
