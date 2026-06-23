/**
 * Add these fields to your Sanity Studio `service` and `blogPost` document types
 * before running: npm run cms:import-wordpress-to-sanity
 *
 * Example (sanity.config.ts / schemaTypes):
 *
 *   import { legacyPathFields } from './schema/legacyPathFields'
 *   defineType({ name: 'service', fields: [ ...existing, ...legacyPathFields ] })
 */
export const legacyPathFields = [
  {
    name: "legacyPath",
    title: "Legacy URL path",
    type: "string",
    description: "e.g. /hair-transplant-in-delhi/beard — used for WordPress URL parity",
  },
  {
    name: "wpSourceId",
    title: "WordPress source ID",
    type: "number",
    readOnly: true,
  },
  {
    name: "wpSourceLink",
    title: "WordPress source URL",
    type: "url",
    readOnly: true,
  },
];
