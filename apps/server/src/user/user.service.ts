import { Injectable } from '@nestjs/common';
import { AppDataSource, User, UserRepository } from 'db';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'dto';

@Injectable()
export class UserService {
  async create(createUserDto: CreateUserDto) {
    const newUser = new User();
    newUser.username = createUserDto.username;
    newUser.email = createUserDto.email;
    newUser.password = bcrypt.hashSync(createUserDto.password, 10);

    const userAlreadyExist = await this.findOneByEmail(createUserDto.email);
    if (userAlreadyExist) return Error('user already exist');

    await AppDataSource.manager.save(newUser);

    return 'user registered';
  }

  // findAll() {
  //   return `This action returns all user`;
  // }

  async findOne(id: string) {
    return await UserRepository.findOneBy({ id });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }

  // special method
  async findOneByEmail(email: string) {
    return await UserRepository.findOneBy({ email });
  }
}
