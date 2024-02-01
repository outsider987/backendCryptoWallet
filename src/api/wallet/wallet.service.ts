// src/wallet/wallet.service.ts

import { Injectable } from '@nestjs/common';
import Web3 from 'web3';

@Injectable()
export class WalletService {
  private web3: Web3;

  constructor() {
    // Connect to a local Ethereum node (you can replace this URL with your own Ethereum node)
    this.web3 = new Web3('http://localhost:8545');
  }

  async createWallet(): Promise<string> {
    // Create a new wallet
    const account = await this.web3.eth.accounts.create();

    // Return the address of the new wallet
    return account.address;
  }
}
