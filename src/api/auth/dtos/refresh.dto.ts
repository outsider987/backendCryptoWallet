import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

/**
 * Refresh token DTO.
 * @class
 * @implements {RefreshTokenDto}
 * @param {string} refreshToken - The refresh token.
 */
export class RefreshTokenDto {
  @ApiProperty({
    example: '',
    description: 'refreshtoken'
  })
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}
