# draino
Drain crypto wallets that are randomly generated. Mining's a lot more efficient lol. 

Uses ethers random wallet generation to create a wallet. Then, we check its balance, and if there is a balance we transfer it to the user-specified destination wallet. This runs continually in a while loop until the user stops. 

Initialize `.env` with a provider URL (Infura or Alchemy for example) and public address you want funds to go to. See `.envexample` for an example.

Run `yarn setup` to install dependences and create the `./logs` folder. Then `yarn dev`. To stop, press `CTRL + C`. To clear logs, run `yarn clear`.

Enjoy! 
