import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class NewContactDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  chatname: string;

  @IsNumber()
  @IsNotEmpty()
  @Length(1, 100)
  user_id: number;

  @IsNumber()
  @IsNotEmpty()
  @Length(1, 100)
  contact_id: number;
}
