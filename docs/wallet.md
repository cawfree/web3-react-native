# `Wallet`
  - [1. Loading a Wallet](#loading-a-wallet)
  - [2. Using a Wallet](#using-a-wallet)
    - [2.1 `sendFunds`](#sending-funds)
    - [2.2 `{ ...extras }`](#wallet-extras)

## <a name="loading-a-wallet"></a>1. Loading a Wallet

A wallet is a public address which can be used to participate in ethereum transactions. You can use a wallet to both send and receive funds. Under the hood, a wallet represents your unique address on the ethereum network and the digital fingerprint which guarantees its authenticity.

Wallets are created by calling `load()` on the `Wallet` object that is produced from a call to [`Web3(url)`](./web3.md).

To load a wallet, you need to provide two required parameters:
  - The JSON keystore.
    - You can easily create and download a new keystore over at [MyEtherWallet](https://www.myetherwallet.com/create-wallet). Just be sure to specify you'd like to create one `By Keystore File`, and be sure to keep the password created for you in a safe place. 
  - The keystore password.
    - This is the [`String`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) which is used to unlock the keystore and grant access to the wallet and all of the funds it holds. Never share this with anybody!

In the example below, we call the promisified function `load(keystore:Object, password:String)` on the `Wallet` object to unlock our ethereum wallet.

```javascript
import React, { useEffect, useState } from "react";
import { Web3 } from "web3-react-native";

// You should consider safe handling of sensitive keystore information
// such as serving it to the application via a https api.
import keystore from "./keystore.json";

export default () => {
  const [wallet, setWallet] = useState(null);
  // When the component is mounted, attempt to load the ethereum wallet.
  useEffect(
    () => Web3('https://ropsten.infura.io/v3/<your-token>')
      // XXX: Pass the keystore JSON.
      .then(({ Wallet }) => Wallet.load(
        keystore,
        "my-keystore-password",
      ))
      .then(setWallet)
      // XXX: If the password is wrong, or the keystore is malformed,
      //      an Error will be thrown in the Promise chain.
      .catch(console.warn),
    [],
  );
};
```

> You must consider using [environment variables](https://github.com/zetachang/react-native-dotenv) to safely manage your configuration. This will greatly reduce your risks of loss or misuse.

## <a name="using-a-wallet"></a>2. Using a Wallet

The`Wallet` object returned from the call to [`Wallet.load()`](#loading-a-wallet) exposes all of the functionality to interact with the ethereum network.

For demonstration, the `Wallet` object can be interacted with as follows:

```javascript
(async () => {
  // XXX: Wallet operations can be accessed like this:
  const { sendFunds, ...extras } = await Wallet.load(keystore, password);
})();
```

In the following sections, we outline the usage of all properties of the `Wallet` object.

### <a name="sending-funds"></a>2.1 `sendFunds`

`sendFunds` is a high-level function which can be used to easily send funds to another address on the ethereum network.

In the following example, we show how to send funds from the wallet to another address on the [`ropsten`](https://ropsten.etherscan.io/) public test network, or "testnet".

Your wallet will first need some ethereum to be able to make a transaction. You can have test ether sent to your wallet via the [Ropsten Faucet](https://faucet.ropsten.be/). Just specify your wallet's address (don't forget the `0x` hexadecimal prefix) to receive `1 ETH`.

Creating a transaction takes the following form:

```javascript
import { Web3 } from "web3-react-native";
import { Linking } from "react-native";

(async () => {
  const { Wallet } = await Web3('https://ropsten.infura.io/v3/<your-token>');
  const { sendFunds } = await Wallet.load(keystore, password);
  // XXX: You can view your transaction by navigating to: https://ropsten.etherscan.io/tx/<your-transaction-hash>
  const { transactionHash } = await sendFunds(
    '0x19e03255f667bdfd50a32722df860b1eeaf4d635', // address of wallet you'd like to send to
    '1', // amount
    'wei', // 1 wei = 10^-18 Ether
  );
  // Finally, view your transaction!
  const url = `https://ropsten.etherscan.io/tx/${transactionHash}`;
  await Linking.canOpenURL(url)
    .then(canOpen => (!!canOpen) && Linking.openURL(url));
})();
```

#### `sendFunds(url:String, toAddress:String, amount:String, units:String)`

**`toAddress:String`**

The wallet address where to send funds to. Previously, we used this [example address](https://github.com/web3j/sample-project-gradle/blob/5b935d42b0f52d97b72029881990aa60cd38a312/src/main/java/org/web3j/sample/Application.java#L76).

**`amount:String`**

The amount to send to the address. Although we're representing a numeric quantity, we use a `String` to avoid rounding errors which occur due to limits [floating point precision](https://docs.python.org/3/tutorial/floatingpoint.html). This way, you can be _exact_ about the amounts involved.

**`units:String`**

The units of the amount to send to the `toAddress`. This can be one of the following units:

| Unit      | Wei Value     | Wei                           |
|---------- |-----------    |---------------------------    |
| `"wei" `      | 1 wei         | 1                             |
| `"kwei" `     | 1e3 wei       | 1,000                         |
| `"mwei"`      | 1e6 wei       | 1,000,000                     |
| `"gwei" `     | 1e9 wei       | 1,000,000,000                 |
| `"finney"`    | 1e15 wei      | 1,000,000,000,000,000         |
| `"eth"`     | 1e18 wei      | 1,000,000,000,000,000,000     |

### <a name="wallet-extras"></a>2.2 `{ ...extras }`

In addition to functionality, a `Wallet` also defines useful properties.

**`address:String`**

The address of the `Wallet`.
