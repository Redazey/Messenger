import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { Message } from './messages.entity';
import { CreateMessageDto, EditMessageDto } from './messages.dto';
import { Subject } from 'rxjs';
import { EventEmitter } from 'events';

@Injectable()
export class MessagesService {
  private ee = new EventEmitter();
  private chatSubscribers: { [chat_id: number]: Subject<MessageEvent>[] } = {};

  constructor(
    @Inject('MESSAGES_REPOSITORY')
    private messages: typeof Message
  ) {}

  async findAll(chat_id: number): Promise<Message[] | undefined> {
    return await this.messages.findAll({
      where: {
        chat_id: chat_id,
        deleted: false,
      },
    });
  }

  async edit(editMessageDto: EditMessageDto) {
    if (editMessageDto.sender_id == editMessageDto.user_id) {
      console.log(editMessageDto);
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

      this.ee.emit(
        editMessageDto.chat_id.toString(),
        JSON.stringify({
          message: editMessageDto,
          type: 'editMsg',
        })
      );
    } else {
      return ForbiddenException;
    }
  }

  async delete(message_id: number) {
    await this.messages.update(
      {
        deleted: true,
      },
      {
        where: {
          message_id: message_id,
        },
      }
    );
  }

  subscribeToChat(chat_id: string, subscriber: any) {
    if (!this.chatSubscribers[chat_id]) {
      this.chatSubscribers[chat_id] = new Set();
    }
    this.chatSubscribers[chat_id].add(subscriber);

    const handler = (message: Message) => {
      subscriber.next(message);
    };

    this.ee.on(chat_id, handler);
  }

  async create(
    createMessageDto: CreateMessageDto
  ): Promise<Message | undefined> {
    createMessageDto.deleted = false;
    const message = await this.messages.create(createMessageDto);

    this.ee.emit(
      createMessageDto.chat_id.toString(),
      JSON.stringify({
        message: message,
        type: 'newMsg',
      })
    );
    return message;
  }
}
