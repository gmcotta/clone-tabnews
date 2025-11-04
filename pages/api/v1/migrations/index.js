import { runner } from 'node-pg-migrate';
import { resolve } from 'node:path';

import database from 'infra/database';

export default async function migrations(req, res) {
  const allowedMethods = ['GET', 'POST'];
  if (!allowedMethods.includes(req.method)) {
    res.status(405).send({
      error: `Method ${req.method} not allowed.`
    });
  }

  let dbClient;
  try {
    dbClient = await database.getNewClient();
    const migrationOptions = {
      dbClient,
      // databaseUrl: process.env.DATABASE_URL,
      dir: resolve(process.cwd(), 'infra', 'migrations'),
      direction: 'up',
      verbose: true,
      migrationsTable: 'pgmigrations'
    };

    if (req.method === 'GET') {
      const pendingMigrations = await runner({
        ...migrationOptions,
        dryRun: true
      });
      console.log(pendingMigrations);
      await dbClient.end();
      res.status(200).json(pendingMigrations);
    }

    if (req.method === 'POST') {
      const completedMigrations = await runner({
        ...migrationOptions,
        dryRun: false
      });
      await dbClient.end();
      if (completedMigrations.length > 0) {
        res.status(201).json(completedMigrations);
      } else {
        res.status(200).json(completedMigrations);
      }
    }
  } catch (error) {
    res.status(500).send({
      error: error.message
    });
  } finally {
    await dbClient.end();
  }
}
