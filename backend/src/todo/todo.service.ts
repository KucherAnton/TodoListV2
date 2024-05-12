import { Injectable, NotFoundException } from '@nestjs/common';
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

  async update(id: string, todoDto: TodoDto): Promise<Todo> {
    const updatedTodo = await this.todoModel.findByIdAndUpdate(id, todoDto, {
      new: true,
    });
    if (!updatedTodo) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }
    return updatedTodo;
  }

  async delete(id: string): Promise<Todo> {
    const deletedTodo = await this.todoModel.findByIdAndDelete(id).exec();
    if (!deletedTodo) {
      throw new Error('Todo not found');
    }
    // Удаление идентификатора тудушки из массива todos пользователя
    await this.userModel.updateMany(
      { todos: { $in: [deletedTodo._id] } },
      { $pull: { todos: deletedTodo._id } },
    );
    return deletedTodo;
  }
}
