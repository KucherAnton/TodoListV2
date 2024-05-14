import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
export class User {
  @Prop({ unique: true, required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop([{ type: Types.ObjectId, ref: 'Todo' }])
  todos: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  friends: Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
