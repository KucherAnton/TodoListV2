import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Todo {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
