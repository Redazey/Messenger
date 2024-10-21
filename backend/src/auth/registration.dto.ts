import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  username: string;

  @IsEmail()
  @IsNotEmpty()
  @Length(1, 100)
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 50)
  password: string;
}
