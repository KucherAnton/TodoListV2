import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/User.schema';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from 'src/auth/dto/SignUp.dto';
import { SignInDto } from 'src/auth/dto/SignIn.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
    const { username, password } = signUpDto;

    const hashedPassword = await bcrypt.hash(password, 5);

    const user = await this.userModel.create({
      username,
      password: hashedPassword,
    });

    const token = this.jwtService.sign({ id: user._id });

    return { token };
  }

  async signIn(signInDto: SignInDto): Promise<{ token: string }> {
    const { username, password } = signInDto;

    const user = await this.userModel.findOne({ username });
    if (!user) throw new UnauthorizedException('Invalid username or password');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      throw new UnauthorizedException('Invalid username or password');

    const token = this.jwtService.sign({ id: user._id });

    return { token };
  }
}
