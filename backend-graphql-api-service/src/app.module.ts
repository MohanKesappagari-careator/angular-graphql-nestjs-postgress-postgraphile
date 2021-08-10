import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StudentModule } from './student/student.module';
import { BullModule } from '@nestjs/bull';
@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      installSubscriptionHandlers: true,
    }),
    TypeOrmModule.forRoot({}),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),

    StudentModule,
  ],
})
export class AppModule {}
