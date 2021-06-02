/*
 *                            *** MIT LICENSE ***
 * -------------------------------------------------------------------------
 * This code may be modified and distributed under the MIT license.
 * See the LICENSE file for details.
 * -------------------------------------------------------------------------
 *
 * @summary   Specify the configuration related to
 *            node generation.
 *
 *            See https://www.gatsbyjs.org/docs/node-apis
 *            for detailed usage
 *
 * @author    Alvis HT Tang <alvis@hilbert.space>
 * @license   MIT
 * @copyright Copyright (c) 2020 - All Rights Reserved.
 * -------------------------------------------------------------------------
 */

const { readFileSync } = require('fs');
const { resolve } = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

// export const createPages: GatsbyNode['createPages'] = async (parameters): Promise<void> => {};
// export const createPagesStatefully: GatsbyNode['createPagesStatefully'] = async (parameters): Promise<void> => {};

// export const onCreateBabelConfig: GatsbyNode['onCreateBabelConfig'] = async (parameters): Promise<void> => {};

// export const onCreateNode: GatsbyNode['onCreateNode'] = async (parameters): Promise<void> => {};
// export const onCreatePage: GatsbyNode['onCreatePage'] = async (parameters): Promise<void> => {};

// export const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] = async (parameters): Promise<void> => {};

// export const onPreInit: GatsbyNode['onPreInit'] = async (parameters): Promise<void> => {};
// export const onPreExtractQueries: GatsbyNode['onPreExtractQueries'] = async (parameters): Promise<void> => {};

// export const onPreBootstrap: GatsbyNode['onPreBootstrap'] = async (parameters): Promise<void> => {};
// export const onPostBootstrap: GatsbyNode['onPostBootstrap'] = async (parameters): Promise<void> => {};

// export const onPreBuild: GatsbyNode['onPreBuild'] = async (parameters): Promise<void> => {};
// export const onPostBuild: GatsbyNode['onPostBuild'] = async (parameters): Promise<void> => {};

// export const preprocessSource: GatsbyNode['preprocessSource'] = async (parameters): Promise<string> => {};
// export const resolvableExtensions: GatsbyNode['resolvableExtensions'] = async (parameters): Promise<string[]> => {};
// export const setFieldsOnGraphQLNodeType: GatsbyNode['setFieldsOnGraphQLNodeType'] = async (parameters): Promise<{ [field: string]: GraphQLField<any, any> }> => {};
// export const sourceNodes: GatsbyNode['sourceNodes'] = async (parameters): Promise<void> => {};

// use babel to transpile typescript
const onCreateBabelConfig = async ({ actions }) => {
  actions.setBabelPreset({
    name: '@babel/preset-typescript',
    options: {},
  });

  actions.setBabelPreset({
    name: '@babel/preset-env',
    options: {
      loose: true,
      targets: '> 0.25%, not dead',
    },
  });

  // add module resolution configuration specified in tsconfig
  const path = getTSPathAlias();
  if (path) {
    actions.setBabelPlugin({
      name: 'babel-plugin-module-resolver',
      options: {
        extensions: ['.d.ts', '.ts', '.tsx', '.js', '.jsx'],
        ...path,
      },
    });
  }
};

const onCreateWebpackConfig = ({ stage, actions }) => {
  switch (stage) {
    case 'build-javascript':
      actions.setWebpackConfig({
        plugins: [
          new BundleAnalyzerPlugin({
            openAnalyzer: false,
            analyzerMode: 'static',
            reportFilename: resolve(
              __dirname,
              'webpack-bundle-analyzer-report.html',
            ),
          }),
        ],
      });

      break;
    default:
      break;
  }
};

const createPagesStatefully = async ({ actions: { createPage } }) => {
  // host all protected pages under /app
  createPage({
    path: `/app`,
    matchPath: '/app/*',
    component: resolve('./src/app/index.tsx'),
    context: {},
  });
};

/**
 * get the path setting for babel-plugin-module-resolver from tsconfig
 * @returns path alias if present
 */
function getTSPathAlias() {
  const { baseUrl, paths } = getTSCompilerOptions();

  if (paths) {
    const alias = Object.fromEntries(
      Object.entries(paths)
        .filter(([key]) => key !== '*')
        .map(([key, [path]]) => {
          // must start with ./, not just dir
          const prefixedPath = path.startsWith('./') ? path : `./${path}`;

          // replace * as a regular expression replacement
          return convertTSPathToAlias(key, prefixedPath);
        }),
    );

    return { root: baseUrl ?? '.', alias };
  }
}

/**
 * map a TS path to a module loader alias
 * @param key mapping key
 * @param path ts path
 * @returns pairs of module loader alias
 */
function convertTSPathToAlias(key, path) {
  return key.endsWith('*')
    ? [`^${key.replace(/\*$/, '(.+)')}`, path.replace(/\*$/, '\\1')]
    : [key, path];
}

/**
 * get compiler options from tsconfig.json
 * @returns compiler options
 */
function getTSCompilerOptions() {
  const tsconfig = JSON.parse(
    readFileSync(resolve(__dirname, 'tsconfig.json')).toString(),
  );

  return tsconfig.compilerOptions ?? {};
}

module.exports = {
  onCreateBabelConfig,
  onCreateWebpackConfig,
  createPagesStatefully,
};
