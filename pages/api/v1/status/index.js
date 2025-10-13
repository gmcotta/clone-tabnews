export default function status(req, res) {
  // res.status(200).send('curso.dev - status está ok');
  res.status(200).json({ teste: 'curso.dev - status está ok' });
}
