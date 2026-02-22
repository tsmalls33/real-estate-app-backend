import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { SignInDto } from './signin.dto';
import { CreateUserDto, UserRoles } from '@RealEstate/types';

export class SignUpDto extends SignInDto implements Omit<CreateUserDto, 'email' | 'password'> {
  @IsString()
  @IsOptional()
  firstName?: string | null;

  @IsString()
  @IsOptional()
  lastName?: string | null;

  @IsString()
  @IsOptional()
  @IsEnum(UserRoles)
  role?: UserRoles | null;

  @IsString()
  @IsOptional()
  @IsUUID()
  id_tenant?: string | null;
}
