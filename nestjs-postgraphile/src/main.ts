import { postgraph } from "./postgraphile";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
const { PORT, PASSWORD } = process.env;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.use(postgraph);

  app.listen(PORT, () =>
    console.log(`Server running${PASSWORD} on port ${PORT}`),
  );
}
bootstrap();
