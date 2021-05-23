/*
 *                            *** MIT LICENSE ***
 * -------------------------------------------------------------------------
 * This code may be modified and distributed under the MIT license.
 * See the LICENSE file for details.
 * -------------------------------------------------------------------------
 *
 * @summary   Configuration for storybook
 *
 * @author    Alvis HT Tang <alvis@hilbert.space>
 * @license   MIT
 * @copyright Copyright (c) 2021 - All Rights Reserved.
 * -------------------------------------------------------------------------
 */

// see https://storybook.js.org/docs/react/configure/overview
import type { StorybookConfig } from '@storybook/core-common';

export const stories: StorybookConfig['stories'] = [
  '../src/**/*.stories.mdx',
  '../src/**/*.stories.@(ts|tsx)',
];

export const addons: StorybookConfig['addons'] = [
  '@storybook/addon-links',
  '@storybook/addon-essentials',
];
