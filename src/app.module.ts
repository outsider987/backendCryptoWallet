import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from './api/auth/auth.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { LocaleMiddleware } from './middleware/local.middleware';
import { HealthChecksModule } from './api/health-checks/health-checks.module';
import { UserModule } from './api/user/user.module';
import { Web3Module } from './web3/web3.module';
import { WalletModule } from './api/wallet/wallet.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [configuration]
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => config.get('defaultConnection'),
      inject: [ConfigService]
    }),
    HealthChecksModule,
    AuthModule,
    UserModule,
    WalletModule
  ],
  controllers: [],
  providers: [JwtService]
})

/**
 * The root module of the application.
 * @module AppModule
 * @implements {NestModule}
 */
export class AppModule implements NestModule {
  /**
   * Configures the middleware.
   * @param {MiddlewareConsumer} consumer - The middleware consumer.
   * @return {void}
   */
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(LoggerMiddleware, LocaleMiddleware)
      .exclude({ path: '/health-check', method: RequestMethod.GET })
      .forRoutes('*');
  }
}
