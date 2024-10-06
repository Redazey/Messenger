import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './modules/database.module';
import { ControllersController } from './controllers/controllers.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [AppController, ControllersController],
  providers: [AppService],
})
export class AppModule {}
