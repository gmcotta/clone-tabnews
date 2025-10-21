import { Client } from "pg";

function getSSLInfo() {
  if (process.env.POSTGRES_HOST === "localhost") return false;
  if (process.env.POSTGRES_SSLMODE === "true") return true;
  return {
    rejectUnauthorized: false,
    ca: process.env.POSTGRES_CERTIFICATE,
  };
}

async function query(queryObject) {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    ssl: getSSLInfo(),
    enableChannelBinding: process.env.POSTGRES_CHANNELBINDING === "true",
  });

  try {
    await client.connect();
    const result = await client.query(queryObject);
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    await client.end();
  }
}

export default {
  query,
};
