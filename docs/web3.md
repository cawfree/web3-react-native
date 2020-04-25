# `Web3`
  - [1. Connecting to a Network](#connecting)
    - [1.1 `Web3`](#web3)

## <a name="connecting"></a>1. Connecting to a Network

Every transaction you make using `Web3` is required to take place on a designated ethereum network. This is how addresses on the network can send funds to one-another.

In the example below, we show how to initialize a connection.

```javascript
import { Web3 } from "web3-react-native";

(async () => {
  await Web3('https://ropsten.infura.io/v3/<your-token>');
})();
```

The network `url` dictates where all of your transactions will take place. In this documentation, we'll frequently be using the [Ropsten](https://ropsten.etherscan.io/) test network, which ensures that all of the transactions we perform will be made using **test ether**.

However, with a simple switch it's easy to start using the same code to make transactions using **real ether**, with real monetary value.

In the example below, we demonstrate one way of how we could dynamically swap between production and test networks:

```javascript
import { Web3 } from "web3-react-native";

(async () => {
  const test = 'https://ropsten.infura.io/v3/<your-token>';
  const production = '';
  await Web3(__DEV__ ? test : production);
})();
```

> ⚠️ This kind of implementation is **not recommended**, because developers often switch between `development` and `production` bundler modes to test certain features and may not necessarily wish to use real currency. You should make ethereum network `url`s a function of [environment config](https://github.com/zetachang/react-native-dotenv) to prevent mistakes or misuse. You can find a demonstration of this in the [example application](../example/App.js).

It is also possible to instantiate multiple simultaneous connections. These are guaranteed not to interfere with one-another:

```javascript
import { Web3 } from "web3-react-native";

(async () => {
  const [...connections] = await Promise.all([
    Web3('https://ropsten.infura.io/v3/<your-token>'),
    Web3('https://ropsten.infura.io/v3/<another-token>'),
  ]);
})();
```

## <a name="web3"></a>1.1 `web3(url:String)`

**`url:String`**

The address of the ethereum network you'd like to make the transaction. In the previous example, we use the Ropsten test network. The structure of this call allows the same [`Wallet`](./wallet.md) instance to be reused across different ethereum networks.

A successful invocation of `Web3()` will resolve with a `Promise` which returns the functionality of `web3-react-native` scoped to the specified `url`.

In the example below, we show how to access the [`Wallet`](./wallet.md) and [`Keystore`](./keystore.md) objects:

```javascript
import { Web3 } from "web3-react-native";

(async () => {
  const { Wallet, Keystore } = await Web3('https://ropsten.infura.io/v3/<your-token>');
})();
```
