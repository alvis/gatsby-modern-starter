/*
 *                            *** MIT LICENSE ***
 * -------------------------------------------------------------------------
 * This code may be modified and distributed under the MIT license.
 * See the LICENSE file for details.
 * -------------------------------------------------------------------------
 *
 * @summary   Schema for the landing page
 *
 *            See https://www.sanity.io/docs/schema-types
 *            for detailed usage
 *
 * @author    Alvis HT Tang <alvis@hilbert.space>
 * @license   MIT
 * @copyright Copyright (c) 2020 - All Rights Reserved.
 * -------------------------------------------------------------------------
 */

import { SchemaType } from '@sanity/types';

const schema = {
  name: 'landing',
  type: 'document',
  title: 'Landing Page',
  fields: [
    {
      title: 'Hero Title',
      name: 'hero_title',
      type: 'string',
      description: 'The hero title on the landing page.',
    },
    {
      title: 'Hero Content',
      name: 'hero_content',
      type: 'string',
      description: 'The copy under the hero title.',
    },
  ],
};

export default schema;
