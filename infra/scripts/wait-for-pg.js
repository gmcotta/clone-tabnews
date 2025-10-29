const { exec } = require('node:child_process');

function checkPostgres() {
  exec(`docker exec postgres_dev pg_isready --host localhost`, handleReturn);

  function handleReturn(_, stdout) {
    if (stdout.search('accepting connections') === -1) {
      process.stdout.write('.');
      checkPostgres();
      return;
    }

    console.log('\nPostgres está pronto e aceitando conexões!');
  }
}

process.stdout.write('Aguardando Postgres ficar pronto');

checkPostgres();
