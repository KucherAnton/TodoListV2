import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoDto } from './dto/Todo.dto';
import { Todo } from 'src/schemas/Todo.schema';

@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Post()
  async create(@Body() todoDto: TodoDto): Promise<Todo> {
    return this.todoService.create(todoDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Todo> {
    return this.todoService.findOne(id);
  }
}
