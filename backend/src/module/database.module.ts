import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'backend',
      password: 'backend1!',
      database: 'stud_db',
      models: [__dirname + '/../**/*.entity.ts'],
    }),
    ConfigModule.forRoot(),
  ],
  exports: [SequelizeModule],
})
export class DatabaseModule {}
