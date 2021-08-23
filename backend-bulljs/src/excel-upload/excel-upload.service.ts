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
      temp.forEach((res: any) => {
        var year = parseInt(res.dateofbirth.substring(0, 4));
        var month = parseInt(res.dateofbirth.substring(5, 7));
        var day = parseInt(res.dateofbirth.substring(8, 10));
        let today = new Date();
        //let dateof = new Date(job.data.dateofbirth).toISOString();
        var d = today.getFullYear();
        let age: number = d - year;
        if (
          today.getMonth() < month ||
          (today.getMonth() == month && today.getDate() < day)
        ) {
          age--;
        }
        console.log('job____', age);
        data.push({
          name: res.name,
          email: res.email,
          dateofbirth: res.dateofbirth,
          age: age,
        });
      });
    }
    console.log('_______', data);
    this.queue.add('create', data);
    // data.map((value) => {
    //   this.queue.add('create', {
    //     name: value.name,
    //     email: value.email,
    //     dateofbirth: value.dateofbirth,
    //   });
    // });
  }

  findAll() {
    return `This action returns all excelUpload`;
  }
}
