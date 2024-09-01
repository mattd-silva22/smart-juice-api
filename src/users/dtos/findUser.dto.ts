import { IsOptional, IsString, IsUUID } from 'class-validator';

export class FindUserDto {
  @IsString()
  @IsUUID()
  @IsOptional()
  id?: string;

  @IsOptional()
  @IsString()
  username?: string;
}
