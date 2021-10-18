import * as fs from 'fs';

class Logger {
  private date: string;
  private history: string;
  private successes: string;
  
  
  constructor() {
    this.date = new Date().toISOString();
    this.history = `./logs/${this.date}-history.txt`;
    this.successes = `./logs/${this.date}-successes.txt`;
  }
  
  private logger = (fileName: string, text: any) => {
    try {
      fs.appendFileSync(fileName, text + '\n');
    } catch (err) {
      console.log(err);
    }
  }
  public logHistory = (text: any) => {
    return this.logger(this.history, text);
  }
  
  public logSuccess = (text: any) => {
    return this.logger(this.successes, text);
  }
}

export const log = new Logger();






