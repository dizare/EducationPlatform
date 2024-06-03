import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { mapDTOtoDomain } from './user.converter';
import { UserDTO } from './user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findOneById(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id })
  }

  private existsByEmail(email: string): Promise<boolean> {
    return this.usersRepository.existsBy({email})
  }

  findByEmail(email: string): Promise<User> {
    return this.usersRepository.findOneBy({email: email})
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id)
  }

  async save(user: UserDTO): Promise<User> {
    if (await this.existsByEmail(user.email)) 
      throw new ConflictException(Array.of(`Пользователь с почтой ${user.email} уже существует`))
    try {
      return await mapDTOtoDomain(user)
        .then((value) => this.usersRepository.save(value))
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException(Array.of(`Непредвиденная ошибка на стороне сервера`))
    }
  }

  async updateEmail(currentEmail: string, newEmail: string): Promise<void> {
    const user = await this.usersRepository.findOneBy({ email: currentEmail });
    if (!user) {
      // Handle user not found error
      throw new Error(`User with email ${currentEmail} not found`);
    }
    user.email = newEmail;
    await this.usersRepository.save(user);
  }
}