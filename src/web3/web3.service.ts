import { Inject, Injectable } from '@nestjs/common';
import Web3 from 'web3';

@Injectable()
export class Web3Service {
  constructor(
    @Inject('Web3')
    private readonly web3: Web3,
    @Inject('Config')
    private readonly config: { wallet: string; privateKey: string }
  ) {}

  async createWallet(): Promise<string> {
    // Create a new wallet
    const account = await this.web3.eth.accounts.create();

    // Return the address of the new wallet
    return account.address;
  }
  async transfer(toWallet: string, value: number) {
    const nonce = await this.web3.eth.getTransactionCount(
      this.config.wallet,
      'latest'
    );

    const transaction = {
      to: toWallet,
      value,
      gas: 21000,
      nonce
    };

    const signedTx = await this.web3.eth.accounts.signTransaction(
      transaction,
      this.config.privateKey
    );

    const tx = await this.web3.eth.sendSignedTransaction(
      signedTx.rawTransaction
    );

    return tx.transactionHash;
  }

  async getBlockNumber() {
    // const res = await this.web3.eth.getBlock('latest');
    const res2 = await this.web3.eth.getBlockNumber();
    return res2;
  }

  async getBalance(address: string) {
    const balance = await this.web3.eth.getBalance(address);

    return this.web3.utils.fromWei(balance, 'ether');
  }
}
