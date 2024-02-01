import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards
} from '@nestjs/common';
import { ChangeNameDto } from './dto/changeName.dto';
import { UserService } from './user.service';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { ApplicationErrorException } from 'src/exceptions/application-error.exception';
import { ConfigService } from '@nestjs/config';
import { successResponse } from 'src/utils/response';
import { Response } from 'express';
import { AuthService } from '../auth/auth.service';
import { ApiTags } from '@nestjs/swagger';
import { ChangeNameDecorator } from './decorator/changeName';
import { DashboardDecorator } from './decorator/dashboard';
import { StatisticsDecorator } from './decorator/statistics';
@UseGuards(JwtGuard)
@Controller('user')
@ApiTags('User')
/**
 * Controller for handling authentication related requests.
 */
export class UserController {
  /**
   * UserController constructor.
   * @param {UserService} userService - The injected UserService instance.
   */
  constructor(
    private readonly userService: UserService,
    private readonly config: ConfigService,
    private readonly authService: AuthService
  ) {}

  /**
   * Login endpoint for generating a JWT token.
   * @param {Req} req - The request object.
   * @param {LoginDto} dto - The login DTO.
   * @param {Response} res - The response object.
   * @return {Promise<{ accessToken: string }>} - The generated JWT token.
   */
  @Post('changeName')
  @UseGuards(JwtGuard)
  @ChangeNameDecorator()
  async modifiName(
    @Req() req,
    @Body() dto: ChangeNameDto,
    @Res({ passthrough: true }) res: Response
  ) {
    const { email, provider, confirmed } = req.user;

    if (!req.user) {
      throw new ApplicationErrorException('4007');
    }
    const { newName } = await this.userService.modifiName(dto, email);
    const { accessToken, refreshToken } = await this.authService.generateTokens(
      {
        email: email,
        confirmed,
        userName: newName,
        provider: provider
      }
    );
    await res.cookie('accessToken', accessToken);
    await res.cookie('refreshToken', refreshToken);
    return successResponse({ accessToken, refreshToken });
  }

  /**
   * Login endpoint for generating a JWT token.
   * @param {Req} req - The request object.
   */
  @Get('dashboard')
  @DashboardDecorator()
  async getUsers() {
    return successResponse(await this.userService.getUsersDashboard());
  }

  /**
   * Login endpoint for generating a JWT token.
   */
  @Get('statistics')
  @StatisticsDecorator()
  async getStatistics() {
    return successResponse(await this.userService.getStatistics());
  }
}
