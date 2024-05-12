import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongo:27017/Cluster0'),
    ConfigModule.forRoot(),
    UserModule,
    TodoModule,
  ],
})
export class AppModule {}
