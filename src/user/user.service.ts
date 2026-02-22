
import {
  Injectable,
  ConflictException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { UserResponseDto, PrivateUserResponseDto } from './dto/user-response.dto';

@Injectable()
export class UserService {
  private readonly saltOrRounds: number;

  constructor(
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService,
  ) {
    const raw = this.configService.get<string>('BCRYPT_SALT_ROUNDS') || '10';
    const rounds = Number(raw);
    if (isNaN(rounds) || rounds < 4 || rounds > 15) {
      throw new Error(
        `Invalid BCRYPT_SALT_ROUNDS value: ${raw}. It must be a positive integer between 4 and 15.`,
      );
    }
    this.saltOrRounds = rounds;
    console.log(`BCRYPT_SALT_ROUNDS set to: ${this.saltOrRounds}`);
  }

  async createUser(input: CreateUserDto): Promise<UserResponseDto> {
    // Check if user already exists
    const isUserExists = await this.userRepository.existsByEmail(input.email);
    if (isUserExists) {
      throw new ConflictException('User already exists');
    }

    // Hash password
    const hashedPassword = await this.hashPassword(input.password);

    const { email, fullName, role, id_tenant } = input;

    return await this.userRepository.create({
      email,
      fullName,
      role,
      passwordHash: hashedPassword,
      tenant: id_tenant ? { connect: { id_tenant } } : undefined,
    });
  }

  async findAll(): Promise<UserResponseDto[]> {
    return await this.userRepository.findAll();
  }

  async findOne(id_user: string): Promise<UserResponseDto> {
    const foundUser = await this.userRepository.findById(id_user);

    if (!foundUser) {
      throw new NotFoundException('User not found');
    }

    return foundUser;
  }

  async findByEmail(
    email: string,
    includePrivate: boolean = false,
  ): Promise<PrivateUserResponseDto> {
    const foundUser = await this.userRepository.findByEmail(email, includePrivate);

    if (!foundUser) {
      throw new NotFoundException('User not found');
    }

    return foundUser as PrivateUserResponseDto;
  }

  async update(id_user: string, input: UpdateUserDto): Promise<UserResponseDto> {
    // Check if at least one field is provided for update
    if (
      input.email === undefined &&
      input.fullName === undefined &&
      input.role === undefined &&
      input.id_tenant === undefined
    ) {
      throw new BadRequestException('No fields to update');
    }

    // If email is being updated, check if it already exists
    if (input.email) {
      const emailExists = await this.userRepository.existsByEmail(input.email);
      if (emailExists) {
        throw new ConflictException(`User email '${input.email}' already exists`);
      }
    }

    // Check if user exists
    const userExists = await this.userRepository.existsById(id_user);
    if (!userExists) {
      throw new NotFoundException('User not found');
    }

    // Update user with provided fields
    return await this.userRepository.update(id_user, input);
  }

  async remove(id_user: string): Promise<UserResponseDto> {
    // Check if user exists
    const userExists = await this.userRepository.existsById(id_user);
    if (!userExists) {
      throw new NotFoundException('User not found');
    }

    // Delete user
    return await this.userRepository.delete(id_user);
  }

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, this.saltOrRounds);
  }

  async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
  }
}

