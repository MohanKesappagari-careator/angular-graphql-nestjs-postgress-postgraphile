import postgraphile from "postgraphile";
const { DATABASE, PG_USER, PASSWORD, HOST, PG_PORT } = process.env;

export const postgraph = postgraphile(
  "postgres://postgres:javascript@postgres:5432/student",
  "public",
  {
    watchPg: true,
    graphiql: true,
    enhanceGraphiql: true,
    enableCors: true,
  },
);
