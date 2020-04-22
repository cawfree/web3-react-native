## Table of Contents
  - [1. Loading a Wallet](#loading-a-wallet)
  - [2. Using a Wallet](#using-a-wallet)
    - [2.1 sendFunds](#sending-funds)

## <a name="loading-a-wallet"></a>1. Loading a Wallet

A wallet is a public address which can be used to participate in ethereum transactions. You can use a wallet to both send and receive funds. Under the hood, a wallet represents your unique address on the ethereum network and the digital fingerprint which guarantees its authenticity.

Wallets are created by calling `load()` on the `Wallet` object that is exported from `react-native-web3`.

To load a wallet, you need to provide two required parameters:
  - The JSON keystore.
    - You can easily create and download a new keystore over at [MyEtherWallet](https://www.myetherwallet.com/create-wallet). Just be sure to specify you'd like to create one `By Keystore File`, and be sure to keep the password created for you in a safe place. 
  - The keystore password.
    - This is the [`String`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) which is used to unlock the keystore and grant access to the wallet and all of the funds it holds. Never share this with anybody!

In the example below, we call the promisified function `load(keystore:Object, password:String)` on the `Wallet` object to unlock our ethereum wallet.

```javascript
import React, { useEffect } from "react";
import { Wallet } from "web3-react-native";

// You should consider safe handling of sensitive keystore information
// such as serving it to the application via a https api.
import keystore from "./keystore.json";

export default () => {
  const [wallet, setWallet] = useState(null);
  // When the component is mounted, attempt to load the ethereum wallet.
  useEffect(
    // XXX: Pass the keystore JSON.
    () => Wallet.load(
      keystore,
      "my-keystore-password",
    )
      .then(setWallet)
      // XXX: If the password is wrong, or the keystore is malformed,
      //      an Error will be thrown in the Promise chain.
      .catch(console.warn),
    [],
  );
};
```

## <a name="using-a-wallet"></a>2. Using a Wallet

The`Wallet` object returned from the call to [`Wallet.load()`](#loading-a-wallet) exposes all of the functionality to interact with the ethereum network.

For demonstration, the `Wallet` object can be interacted with as follows:

```javascript
(async () => {
  // XXX: Functions can be accessed like this.
  const { sendFunds, ...extras } = await loadWallet(keystore, password);
})();
```

### <a name="sending-funds"></a>2.1 sendFunds
