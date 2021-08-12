import {
  OnQueueCompleted,
  OnQueueFailed,
  Process,
  Processor,
} from '@nestjs/bull';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from 'bull';
import { StudentD } from 'src/Student';
import { Repository } from 'typeorm';
import { Student } from './entities/student.entity';
import * as SC from 'socketcluster-client';
import { Logger } from '@nestjs/common';

let socket = SC.create({
  hostname: 'socket',
  port: 8002,
});
@Processor('student')
export class StudentConsumer {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}
  @Process('create')
  async createStudent(job: Job<StudentD>) {
    //let userBirthYear = parseInt(job.data.dateofbirth.substring(8, 10));
    var year = parseInt(job.data.dateofbirth.substring(0, 4));
    var month = parseInt(job.data.dateofbirth.substring(5, 7));
    var day = parseInt(job.data.dateofbirth.substring(8, 10));
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
    const createStudentInput: Object = {
      name: job.data.name,
      email: job.data.email,
      dateofbirth: job.data.dateofbirth,
      age: age,
    };

    return await this.studentRepository.save(createStudentInput);
  }
  @OnQueueCompleted()
  completed(job: Job, result: any) {
    (async () => {
      try {
        await socket.invokePublish(
          'student',
          `Completed job with result ${result}`,
        );
      } catch (error) {
        Logger.log(error);
      }
    })();
    Logger.log(`Completed job with result ${result}`);
  }

  @OnQueueFailed()
  failed(job: Job, err: Error) {
    (async () => {
      try {
        await socket.invokePublish('studentF', `Failed job with error ${err}`);
      } catch (error) {
        Logger.log(error);
      }
    })();
    Logger.log(`Failed job with error ${err}...`);
  }
}
