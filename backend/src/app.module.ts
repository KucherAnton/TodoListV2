import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongo:27017/Cluster0'),
    ConfigModule.forRoot(),
    AuthModule,
    TodoModule,
  ],
})
export class AppModule {}
