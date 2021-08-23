import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentResolver } from './student.resolver';
import { Student } from './entities/student.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';
import { StudentConsumer } from './student.consumer';

@Module({
  imports: [
    TypeOrmModule.forFeature([Student]),
    BullModule.registerQueue({
      name: 'student',
      redis: {
        host: 'redis',
        port: 6379,
      },
    }),
  ],
  providers: [StudentResolver, StudentService],
})
export class StudentModule {}
