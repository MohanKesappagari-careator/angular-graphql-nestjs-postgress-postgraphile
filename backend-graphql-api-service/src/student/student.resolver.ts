import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Subscription,
} from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { CreateStudentInput } from './dto/create-student.input';
import { PaginationDto } from './dto/pagination.dto';
import { SearchSort } from './dto/search-sort-dto';
import { UpdateStudentInput } from './dto/update-student.input';
import { Student } from './entities/student.entity';
import { StudentService } from './student.service';

@Resolver(() => Student)
export class StudentResolver {
  private pubsub: PubSub;
  constructor(private readonly studentService: StudentService) {
    this.pubsub = new PubSub();
  }

  @Mutation(() => Student)
  async createStudent(
    @Args('createStudentInput') createStudentInput: CreateStudentInput,
  ) {
    const create = await this.studentService.create(createStudentInput);
    this.pubsub.publish('create', { create: create });
    return create;
  }

  @Query(() => [Student], { name: 'findAllStudentsWithPagination' })
  findAllWithPagination(@Args('pagination') pagination: PaginationDto) {
    return this.studentService.findAllWithPagination(pagination);
  }

  @Query(() => [Student], { name: 'findAllStudents' })
  findAll() {
    return this.studentService.findAll();
  }

  @Query(() => [Student], { name: 'searchAndSortAllStudents' })
  serach(@Args('searchAndSortAll') searchAndSortAll: SearchSort) {
    return this.studentService.searchAndSortAll(searchAndSortAll);
  }

  @Query(() => Student, { name: 'findOneStudent' })
  findOne(@Args('id') id: string) {
    return this.studentService.findOne(id);
  }

  @Mutation(() => Student)
  updateStudent(
    @Args('updateStudentInput') updateStudentInput: UpdateStudentInput,
  ) {
    return this.studentService.update(
      updateStudentInput.id,
      updateStudentInput,
    );
  }

  @Mutation(() => Student)
  removeStudent(@Args('id') id: string) {
    return this.studentService.remove(id);
  }

  @Subscription(() => Student, { name: 'create' })
  create() {
    return this.pubsub.asyncIterator('create');
  }
}
