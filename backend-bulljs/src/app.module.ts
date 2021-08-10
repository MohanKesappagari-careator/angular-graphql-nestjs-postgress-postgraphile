import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { Upload } from 'graphql-upload';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ExcelUploadModule } from './excel-upload/excel-upload.module';
import { GraphQLWithUploadModule } from './graphql-uploa-middleware';

@Module({
  imports: [GraphQLWithUploadModule.forRoot(), ExcelUploadModule],
  controllers: [AppController],
  providers: [AppService, Upload],
})
export class AppModule {}
