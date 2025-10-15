import database from '../../../../infra/database.js';

export default async function status(req, res) {
  const result = await database.query('SELECT 1 + 1;');
  console.log(result);
  // res.status(200).send('curso.dev - status está ok');
  res.status(200).json({ teste: 'curso.dev - status está ok' });
}
