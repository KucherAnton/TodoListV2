import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { User } from './User.schema';
import { Types } from 'mongoose';

@Schema()
export class Todo {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  author: Types.ObjectId;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
