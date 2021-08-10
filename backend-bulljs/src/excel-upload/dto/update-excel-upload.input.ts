import { CreateExcelUploadInput } from './create-excel-upload.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateExcelUploadInput extends PartialType(CreateExcelUploadInput) {
  @Field(() => Int)
  id: number;
}
