import postgraphile from 'postgraphile';
const { DATABASE, PG_USER, PASSWORD, HOST, PG_PORT } = process.env;

export const postgraph = postgraphile(
  {
    database: 'student',
    user: 'postgres',
    password: 'javascript',
    host: 'localhost',
    port: parseInt(PG_PORT),
  },
  'public',
  {
    watchPg: true,
    graphiql: true,
    enhanceGraphiql: true,
    enableCors: true,
  },
);
