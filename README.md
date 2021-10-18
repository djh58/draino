# draino
Drain crypto wallets that are randomly generated

Uses ethers random wallet generation to create a wallet. Then, we check its balance, and if there is a balance we transfer it to the user-specified destination wallet. This runs continually in a while loop until the user stops. 

Initialize `.env` with a provider URL (Infura or Alchemy for example) and public address you want funds to go to. See `.envexample` for an example.

Run `yarn` to install dependences. Then `yarn dev`. To stop, press `CTRL + C`