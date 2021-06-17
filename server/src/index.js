import express from 'express';
import { postgraphile } from 'postgraphile';

import { NodePlugin } from 'graphile-build';
import PgSimpleInflector from 'graphile-simple-inflector';
import PgMetaschema from 'graphile-meta-schema';
import ConnectionFilterPlugin from 'postgraphile-plugin-connection-filter';
import FulltextFilterPlugin from '@pyramation/postgraphile-plugin-fulltext-filter';
// import PostGraphileUploadFieldPlugin from 'postgraphile-derived-upload-field';
import PgPostgis from '@pyramation/postgis';
import PgPostgisFilter from 'postgraphile-plugin-connection-filter-postgis';
import PgManyToMany from '@graphile-contrib/pg-many-to-many';
import PgSearch from 'graphile-search-plugin';

import env from './env';

const app = express();

const getDbString = () =>
  `postgres://${env.PGUSER}:${env.PGPASSWORD}@${env.PGHOST}:${env.PGPORT}/${env.PGDATABASE}`;

app.use(
  postgraphile(getDbString(), env.SCHEMA, {
    graphiql: true,
    enhanceGraphiql: true,
    enableCors: true,
    dynamicJson: true,
    skipPlugins: [NodePlugin],
    appendPlugins: [
      ConnectionFilterPlugin,
      FulltextFilterPlugin,
      // PostGraphileUploadFieldPlugin,
      PgMetaschema,
      PgManyToMany,
      PgSearch,
      PgPostgis,
      PgPostgisFilter,
      PgSimpleInflector
    ]
  })
);

export default app;
