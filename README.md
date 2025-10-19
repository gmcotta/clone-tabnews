# clone-tabnews

Repositório sobre o projeto do [curso.dev](https://curso.dev/), do Filipe Deschamps.

## Tecnologias

- NodeJS
- NextJS
- Jest
- Docker
- PostgreSQL
- Prettier

## Variáveis de ambiente

### PostgreSQL

- POSTGRES_HOST: host do postgres;
- POSTGRES_PORT: porta do postgres (default: 5432);
- POSTGRES_DB: nome do banco de dados;
- POSTGRES_USER: usuário do banco;
- POSTGRES_PASSWORD: senha do banco;
- POSTGRES_SSLMODE: necessário ser `true` caso queira usar o [Neon](https://neon.com/) como banco de dados e testar localmente. Caso contrário, use `false`;
- POSTGRES_CHANNELBINDING: necessário ser `true` caso queira usar o [Neon](https://neon.com/) como banco de dados e testar localmente. Caso contrário, use `false`;
- POSTGRES_CERTIFICATE: necessário ter o certificado caso queira usar a [DigitalOcean](https://www.digitalocean.com/) como banco de dados e testar localmente. Caso contrário, use `false`. Ao colocar o certificado no `.env`, colocar aspas duplas, colocar `\n` no lugar da quebra de linha.

  Ex: "-----BEGIN CERTIFICATE-----\nllkjALKJLKjljLJHDJH\nlaksjdailsdlkasjd...restante da chave...\n-----END CERTIFICATE-----"

## Como rodar o projeto localmente

- No terminal, clonar o repositório.
- Verificar se a versão do node é a `v20.19.5`. Se estiver com o nvm instalado, rodar `nvm use` no terminal para usar a versão.
- No terminal, rodar o comando `npm install` para instalar as dependências.
- Verificar se o Docker está configurado.
- Copiar o arquivo `.env.example`, renomear como `.env.development`.
- No terminal, rodar o comando `npm run dev`. Ele vai iniciar o Docker e o NextJS.
