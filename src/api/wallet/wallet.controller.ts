// src/wallet/wallet.controller.ts

import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { WalletService } from './wallet.service';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Get('create')
  async createWallet(): Promise<{ address: string }> {
    const address = await this.walletService.createWallet();
    return { address };
  }
  @Get()
  getBalance(@Param('address') address: string) {
    return this.walletService.getBalance(address);
  }

  @Post()
  setTransfer(
    @Body('toWallet') toWallet: string,
    @Body('value') value: number
  ) {
    return this.walletService.setTransfer(toWallet, value);
  }

  @Get('block')
  getBlockNumber() {
    return this.walletService.getBlockNumber();
  }
}
