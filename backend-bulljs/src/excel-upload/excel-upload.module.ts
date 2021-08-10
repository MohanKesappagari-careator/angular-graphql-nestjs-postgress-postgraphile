import { Module } from '@nestjs/common';
import { ExcelUploadService } from './excel-upload.service';
import { ExcelUploadResolver } from './excel-upload.resolver';
import { Upload } from 'graphql-upload';

@Module({
  imports: [Upload],
  providers: [ExcelUploadResolver, ExcelUploadService],
})
export class ExcelUploadModule {}
