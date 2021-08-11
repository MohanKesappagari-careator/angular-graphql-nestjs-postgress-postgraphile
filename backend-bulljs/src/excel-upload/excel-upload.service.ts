import { Injectable } from '@nestjs/common';
import { CreateExcelUploadInput } from './dto/create-excel-upload.input';
import { UpdateExcelUploadInput } from './dto/update-excel-upload.input';
import * as reader from 'xlsx';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
@Injectable()
export class ExcelUploadService {
  constructor(@InjectQueue('student') private queue: Queue) {}

  read(filename: string) {
    const file = reader.readFile(`./uploads/${filename}`);
    const sheets = file.SheetNames;
    let data = [];
    for (let i = 0; i < sheets.length; i++) {
      const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);
      temp.forEach((res) => {
        data.push(res);
      });
    }
    console.log('_______', data);
    data.map((value) => {
      this.queue.add('create', {
        name: value.name,
        email: value.email,
        dateofbirth: value.dateofbirth,
      });
    });
  }

  findAll() {
    return `This action returns all excelUpload`;
  }
}
