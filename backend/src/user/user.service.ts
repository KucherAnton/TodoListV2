import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/User.schema';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from 'src/user/dto/User.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: UserDto): Promise<{ token: string }> {
    const { username, password } = signUpDto;

    const hashedPassword = await bcrypt.hash(password, 5);

    const user = await this.userModel.create({
      username,
      password: hashedPassword,
    });

    const token = this.jwtService.sign({ id: user._id });

    return { token };
  }

  async signIn(signInDto: UserDto): Promise<{ token: string }> {
    const { username, password } = signInDto;

    const user = await this.userModel.findOne({ username });
    if (!user) throw new UnauthorizedException('Invalid username or password');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      throw new UnauthorizedException('Invalid username or password');

    const token = this.jwtService.sign({ id: user._id });

    return { token };
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }
}
