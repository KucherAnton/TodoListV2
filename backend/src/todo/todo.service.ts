import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo } from 'src/schemas/Todo.schema';
import { TodoDto } from './dto/Todo.dto';
import { User } from 'src/schemas/User.schema';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel(Todo.name) private todoModel: Model<Todo>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async create(todoDto: TodoDto): Promise<Todo> {
    const user = await this.userModel.findOne({ username: todoDto.author });
    if (!user) {
      throw new Error('User not found');
    }

    const createdTodo = new this.todoModel({ ...todoDto, author: user._id });
    const savedTodo = await createdTodo.save();

    await this.userModel.findByIdAndUpdate(user._id, {
      $push: { todos: savedTodo._id },
    });

    return savedTodo;
  }

  async findOne(id: string): Promise<Todo> {
    return this.todoModel.findById(id).exec();
  }
}
