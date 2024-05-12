import { IsNotEmpty, IsString } from 'class-validator';

export class TodoDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsString()
  author: string;
}
