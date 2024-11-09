import { IsArray, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateChatDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  chat_name: string;

  @IsArray()
  @IsNotEmpty()
  participants: number[];
}
