// src/wallet/wallet.controller.ts

import { Controller, Get } from '@nestjs/common';
import { WalletService } from './wallet.service';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Get('create')
  async createWallet(): Promise<{ address: string }> {
    const address = await this.walletService.createWallet();
    return { address };
  }
}
