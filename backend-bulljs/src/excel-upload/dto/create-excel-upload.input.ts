import { InputType, Int, Field } from '@nestjs/graphql';
import { Upload } from 'src/Upload';

@InputType()
export class CreateExcelUploadInput {
  @Field()
  susces: string;
}
