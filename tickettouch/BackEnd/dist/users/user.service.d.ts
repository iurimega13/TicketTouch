import { CreateUserDto } from './dtos/createUser.dto';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: Repository<UserEntity>);
    createUser(createUserDto: CreateUserDto): Promise<UserEntity>;
    getAllUsers(): Promise<UserEntity[]>;
    findById(id: string): Promise<UserEntity>;
    findByName(name: string): Promise<UserEntity>;
    findByRegistration(registration: string): Promise<UserEntity>;
    findByEmail(email: string): Promise<UserEntity>;
    findByRole(role: string): Promise<UserEntity>;
    findByPhoneNumber(phone_number: string): Promise<UserEntity>;
}
