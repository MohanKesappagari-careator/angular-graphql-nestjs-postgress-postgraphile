import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsNumber, IsOptional, Min } from 'class-validator';

@InputType()
export class PaginationDto {
  @Field(() => Int)
  @IsOptional()
  @IsNumber()
  @Min(0)
  offset?: number;

  @Field(() => Int)
  @IsOptional()
  @IsNumber()
  @Min(1)
  limit?: number;
}
