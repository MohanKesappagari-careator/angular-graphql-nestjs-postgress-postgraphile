import { Field, InputType, Int } from '@nestjs/graphql';
import { IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';

@InputType()
export class SearchSort {
  @IsString()
  @IsOptional()
  @Field()
  search?: string = '';

  @IsString()
  @IsOptional()
  @Field()
  sort?: string = 'name';

  @IsOptional()
  @Field()
  order?: 'ASC' | 'DESC' = 'ASC';

  @Field(() => Int)
  @IsOptional()
  @IsNumber()
  @Min(0)
  offset?: number = 0;

  @Field(() => Int)
  @IsOptional()
  @IsNumber()
  @Min(1)
  limit?: number = 1;
}
