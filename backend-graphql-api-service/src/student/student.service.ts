import { Student } from './entities/student.entity';
import { HttpException, Logger } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStudentInput } from './dto/create-student.input';
import { UpdateStudentInput } from './dto/update-student.input';
import { PaginationDto } from './dto/pagination.dto';
import { SearchSort } from './dto/search-sort-dto';

@Injectable()
export class StudentService {
  private readonly logger = new Logger(StudentService.name);
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}

  async findByEmail(email: string) {
    return this.studentRepository.findOne({ where: { email: email } });
  }

  //create
  async create(createStudentInput: CreateStudentInput) {
    const { name, email, dateofbirth } = createStudentInput;
    var year = parseInt(dateofbirth.substring(0, 4));
    var month = parseInt(dateofbirth.substring(5, 7));
    var day = parseInt(dateofbirth.substring(8, 10));
    let today = new Date();
    var d = today.getFullYear();
    let age: number = d - year;
    if (
      today.getMonth() < month ||
      (today.getMonth() == month && today.getDate() < day)
    ) {
      age--;
    }
    const isUserAvailable = await this.findByEmail(email);
    if (isUserAvailable) {
      throw new HttpException({ message: 'User already exists' }, 400);
    }
    return await this.studentRepository.save({
      name: name,
      email: email,
      dateofbirth: dateofbirth,
      age: age,
    });
  }

  //pagination
  async findAllWithPagination(pagination: PaginationDto) {
    let [page, data] = await this.studentRepository.findAndCount({
      take: pagination.limit,
      skip: pagination.offset,
    });
    let page1: any = [...page];
    return page1;
  }

  async findAll() {
    return await this.studentRepository.find();
  }

  async findOne(id: string) {
    return await this.studentRepository.findOne(id);
  }

  //search,filter,sort and pagination
  async searchAndSortAll(search: SearchSort) {
    let data = await this.studentRepository
      .createQueryBuilder()
      .select([
        'Student.id as id',
        'Student.name as name',
        'Student.email as email',
        'Student.age as age',
        'Student.dateofbirth as dateofbirth',
      ])
      .where('name ILIKE :name', { name: `%${search.search}%` })
      .orWhere('email ILIKE :email', { email: `%${search.search}%` })
      .orderBy(`${search.sort}`, `${search.order}`)
      .skip(search.offset)
      .take(search.limit)
      .getRawMany();

    return data;
  }

  //update
  async update(id: string, updateStudentInput: UpdateStudentInput) {
    const { name, dateofbirth, email } = updateStudentInput;
    var year = parseInt(dateofbirth.substring(0, 4));
    var month = parseInt(dateofbirth.substring(5, 7));
    var day = parseInt(dateofbirth.substring(8, 10));
    let today = new Date();
    var d = today.getFullYear();
    let age: number = d - year;
    if (
      today.getMonth() < month ||
      (today.getMonth() == month && today.getDate() < day)
    ) {
      age--;
    }

    const update = await this.studentRepository.update(
      { id: updateStudentInput.id },
      {
        name: name,
        email: email,
        dateofbirth: dateofbirth,
        age: age,
      },
    );
    if (update.affected === 1) {
      return {
        age,
        name,
        email,
        dateofbirth,
      };
    }
  }

  //delete
  async remove(id: string) {
    const Student = await this.studentRepository.findOne(id);
    if (!Student) {
      throw new HttpException('Not Found', 404);
    }
    const del = await this.studentRepository.delete(id);
    if (del.affected === 1) {
      return Student;
    }
  }
}
