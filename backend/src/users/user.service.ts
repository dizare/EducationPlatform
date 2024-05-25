import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
      throw new ConflictException(`User with email=${user.email} already exists`)
    try {
      return await mapDTOtoDomain(user)
        .then((value) => this.usersRepository.save(value))
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException(`Unexpected server error occured`)
    }
  }
}