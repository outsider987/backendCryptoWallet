import { Module } from '@nestjs/common';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';

@Module({
  imports: [],
  controllers: [WalletController],
  providers: [WalletService],
  exports: [WalletService]
})

/**
 * USER module.
 */
export class UserModule {}
