# `Keystore`
  - [1. Creating a Keystore](#creating)
    - [1.1 `create`](#create)

## <a name="creating"></a>1. Creating a Keystore

The `Keystore` is our gateway to accessing an Ethereum [`Wallet`](./wallet.md), which can be used to make transactions on the network.

Sometimes, a user may not have an existing keystore, and will need to create a new one from scratch. To do this, we can use the `Keystore` object exported from a call to [`Web3`](./web3.md):

```javascript
import { Web3 } from "web3-react-native";

(async () => {
  const { Keystore } = await Web3('https://ropsten.infura.io/v3/<your-token>');
})();
```

To create a `Keystore`, we need to specify a password. This can be whatever non-null, non-empty `String` you like, but the standard password allocation rules apply; they should be significantly complex to reduce the likelihood of theft.

New keystores can be created using the `Keystore.create(password:String)` method:

```javascript
import { Web3 } from "web3-react-native";

(async () => {
  const password = 'S3cr3tPassw0rd!';
  const { Keystore } = await Web3('https://ropsten.infura.io/v3/<your-token>');
  const { ...keystoreJson } = await Keystore.create(password);
})();
```

In the example below, we show how a dynamically allocated `Keystore` can be used to generate a new `Wallet` object:

```javascript
import { Web3 } from "web3-react-native";

(async () => {
  const password = 'S3cr3tPassw0rd!';
  const { Keystore, Wallet } = await Web3('https://ropsten.infura.io/v3/<your-token>');
  const ks = await Keystore.create(password);
  // Here, we generate a new wallet using the generated keystore.
  const { address, sendFunds } = await Wallet.create(ks, password);
})();
```

For more information on making transactions, please head over to the `Wallet` [documentation](./wallet.md).

## <a name="create"></a>1.1 `create(password:String)`

**`password:String`**

The password to use when encrypting the keystore data. This should be significantly complex, such as the result of a call to [`uuidv4()`](https://www.npmjs.com/package/uuid).
