import { Inject, Injectable } from '@nestjs/common';
import { Message } from './messages.entity';
import { CreateMessageDto, EditMessageDto } from './messages.dto';

@Injectable()
export class MessagesService {
  constructor(
    @Inject('MESSAGES_REPOSITORY')
    private messages: typeof Message
  ) {}

  async findAll(chat_id: number): Promise<Message[] | undefined> {
    return await this.messages.findAll({
      where: {
        chat_id: chat_id,
      },
    });
  }

  async edit(editMessageDto: EditMessageDto) {
    await this.messages.update(
      {
        message_text: editMessageDto.message_text,
      },
      {
        where: {
          message_id: editMessageDto.message_id,
        },
      }
    );
  }

  async delete(message_id: number) {
    await this.messages.destroy({
      where: {
        message_id: message_id,
      },
    });
  }

  async create(
    createMessageDto: CreateMessageDto
  ): Promise<Message | undefined> {
    createMessageDto.deleted = false;
    return this.messages.create(createMessageDto);
  }
}
