import migrationRunner from 'node-pg-migrate';
import { join } from 'node:path';

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
      dir: join('infra', 'migrations'),
      direction: 'up',
      verbose: true,
      migrationsTable: 'pgmigrations'
    };

    if (req.method === 'GET') {
      const pendingMigrations = await migrationRunner({
        ...migrationOptions,
        dryRun: true
      });
      await dbClient.end();
      res.status(200).json(pendingMigrations);
    }

    if (req.method === 'POST') {
      const completedMigrations = await migrationRunner({
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
