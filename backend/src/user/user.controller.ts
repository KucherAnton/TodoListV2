import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from 'src/user/dto/User.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/register')
  signUp(@Body() signUpDto: UserDto): Promise<{ token: string }> {
    return this.userService.signUp(signUpDto);
  }

  @Post('/login')
  signIn(@Body() signInDto: UserDto): Promise<{ token: string }> {
    return this.userService.signIn(signInDto);
  }

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Post('/:username/friends/:friendUsername')
  async addFriend(
    @Param('username') username: string,
    @Param('friendUsername') friendUsername: string,
  ): Promise<void> {
    await this.userService.addFriend(username, friendUsername);
  }

  @Delete('/:userId/friends/:friendId')
  async deleteFriend(
    @Param('userId') userId: string,
    @Param('friendId') friendId: string,
  ): Promise<void> {
    await this.userService.deleteFriend(userId, friendId);
  }
}
