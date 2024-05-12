import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoSchema } from 'src/schemas/Todo.schema';
import { UserSchema } from 'src/schemas/User.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Todo', schema: TodoSchema }]),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
