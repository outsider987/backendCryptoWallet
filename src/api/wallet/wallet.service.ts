// src/wallet/wallet.service.ts

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Web3Service } from '@/web3/web3.service';
import Web3 from 'web3';

@Injectable()
export class WalletService {
  private web3: Web3;

  constructor(
    // private readonly config: ConfigService,
    private readonly web3Service: Web3Service
  ) {
    // Connect to a local Ethereum node (you can replace this URL with your own Ethereum node)
    // this.web3 = new Web3('http://localhost:8545');
    // const url =
    //   'https://mainnet.infura.io/v3/' + this.config.get('infuraApiKey');
    // this.web3 = new Web3(url);
  }

  async createWallet(): Promise<string> {
    // Create a new wallet
    const account = await this.web3.eth.accounts.create();

    // Return the address of the new wallet
    return account.address;
  }

  async getBalance(address: string) {
    const balance = await this.web3.eth.getBalance(address);
    return balance;
  }

  async setTransfer(toWallet: string, value: number) {
    return this.web3Service.transfer(toWallet, value);
  }

  async getBlockNumber() {
    // const res = await this.web3.eth.getBlock('latest');
    const res2 = await this.web3Service.getBlockNumber();
    console.log(res2);
    return res2;
  }
}
