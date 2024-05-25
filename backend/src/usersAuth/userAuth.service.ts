import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
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

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id)
  }

  async save(user: UserDTO): Promise<User | string> {
    if (await this.existsByEmail(user.email)) 
      throw new BadRequestException(`User with email=${user.email} already exists`) 
    try {
      let savedUser = await mapDTOtoDomain(user).then((value) => this.usersRepository.save(value))
      return savedUser
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException(`Unexpected server error occured`)
    }
  }

  existsByEmailAndPassword(email: string, password: string) : Promise<boolean>{
    return this.usersRepository.findOneBy({email: email})
      .then(user => user.password)
      .then(foundPassword => bcrypt.compare(password, foundPassword));
    }
}