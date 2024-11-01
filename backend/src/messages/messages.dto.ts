import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
} from 'class-validator';

export class CreateMessageDto {
  @IsString()
  @IsNotEmpty()
  message_text: string;

  @IsNumber()
  @IsNotEmpty()
  @Length(1, 100)
  user_id: number;

  @IsNumber()
  @IsNotEmpty()
  @Length(1, 100)
  chat_id: number;

  @IsBoolean()
  deleted: boolean;
}

export class EditMessageDto {
  @IsString()
  @IsNotEmpty()
  message_text: string;

  @IsNumber()
  @IsNotEmpty()
  @Length(1, 100)
  message_id: number;
}
