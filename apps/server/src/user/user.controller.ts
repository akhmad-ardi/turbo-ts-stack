import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  Param,
  // Delete,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateUserDto } from 'dto';
import { UserService } from './user.service';
import { Public } from 'src/lib/Public.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post('sign-up')
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    const { password, confirmPassword } = createUserDto;

    try {
      if (password !== confirmPassword) throw new Error('password is invalid');

      const userService = await this.userService.create(createUserDto);
      if (userService instanceof Error) throw userService;

      res.json({ code: 201, message: userService });
    } catch (error) {
      if (error instanceof Error)
        res.json({ code: 400, message: error.message });

      console.log(error);
      res.send('something error');
    }
  }

  // @Get()
  // findAll() {
  //   return this.userService.findAll();
  // }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const data = await this.userService.findOne(id);
      if (!data) throw new Error('user not found');

      return res.json({ code: 200, data });
    } catch (error) {
      if (error instanceof Error)
        return res.json({ code: 404, message: error.message });

      return res.send('something error');
    }
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}
