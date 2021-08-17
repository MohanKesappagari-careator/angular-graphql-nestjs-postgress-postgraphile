import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStudentInput } from './dto/create-student.input';
import { Student } from './entities/student.entity';
import { StudentService } from './student.service';

export type MockType<T> = {
  [P in keyof T]: jest.Mock<{}>;
};

//@ts-ignore
const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(() => ({
  findOne: jest.fn((entity) => entity),
  find: jest.fn((entity) => entity),
  findAll: jest.fn((entity) => entity),
  create: jest.fn((entity) => entity),
  save: jest.fn((entity) => entity),
  update: jest.fn((entity) => entity),
}));

const createStudentDto: CreateStudentInput = {
  name: 'mohan',
  email: 'mohan@gmail.com',
  dateofbirth: '1998/11/13',
};

const createStudentResponse: any = {
  id: 'uuid-123',
  name: 'mohan',
  email: 'mohan@gmail.com',
  dateofbirth: '1998/11/13',
  age: 22,
};

const updateStudentDto: CreateStudentInput = {
  name: 'krishna',
  email: 'krishna@gmail.com',
  dateofbirth: '1998/11/13',
};

const updateStudentResponse: any = {
  name: 'krishna',
  email: 'krishna@gmail.com',
  dateofbirth: new Date(),
};

describe('StudentService', () => {
  let service: StudentService;
  let studentRepositoryMock: MockType<Repository<Student>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentService,
        {
          provide: getRepositoryToken(Student),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<StudentService>(StudentService);
    studentRepositoryMock = module.get(getRepositoryToken(Student));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should create student', async () => {
    // let isUserAvailable = await service.findByEmail('mohan@gmail.com');
    // if (isUserAvailable) {
    //   throw new HttpException({ message: 'User already exists' }, 400);
    // }
    expect(service.findByEmail('mohan@gmail.com')).toEqual(
      createStudentResponse,
    );

    studentRepositoryMock.save.mockReturnValue(createStudentResponse);
    expect(await service.create(createStudentDto)).toEqual(
      createStudentResponse,
    );
  });

  // it('should update student', async() => {
  //   let id={}
  //   expect(await service.update("1",updateStudentDto)).not.toEqual(null)
  // })

  it('should return one student details', async () => {
    expect(service.findOne('uuid-1234')).not.toEqual(null);
  });
  it('should return one student details', async () => {
    expect(service.findByEmail('mohan@gnail.com')).not.toEqual(null);
  });

  it('should return all students', () => {
    expect(service.findAll()).not.toEqual(null);
  });
});
