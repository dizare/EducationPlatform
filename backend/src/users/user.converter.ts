import { UserDTO } from "./user.dto";
import { User } from "./user.entity";
import * as bcrypt from 'bcrypt';


export async function mapDTOtoDomain(userDTO: UserDTO): Promise<User> {
    var hashedPassword = bcrypt.hash(userDTO.password, 12);
    return new User(userDTO.firstName, userDTO.lastName, userDTO.email, await hashedPassword, userDTO.role);
}

export async function mapDomainToDTO(user: User): Promise<UserDTO> {
    return new UserDTO(user.firstName, user.lastName, user.email, user.password, user.role);
}