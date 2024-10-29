import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { ContactsModule } from './contacts/contacts.module';

@Module({
  imports: [DatabaseModule, AuthModule, ContactsModule],
})
export class AppModule {}
