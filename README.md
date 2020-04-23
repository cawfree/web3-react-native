<p align="center">
  <a href="https://github.com/cawfree/web3-react-native" alt="web3-react-native">
    <img src="./public/logo.png" width="640" height="452" />
  </a>
</p>

# web3-react-native
[**Web3**](https://web3js.readthedocs.io/en/v1.2.6/) Native Modules for [**React Native**](https://reactnative.dev/).

## 🚀 Getting Started

Using [`npm`]():

```bash
npm install --save web3-react-native
```

Using [`yarn`]():

```bash
yarn add web3-react-native
```

For versions less than [**React Native 0.60**](https://reactnative.dev/blog/2019/07/03/version-60), be sure to execute `react-native link` to make the native library dependencies visible to your compiled application.

### iOS
After installing, [you'll need to append](https://github.com/cawfree/web3-react-native/blob/cb8f80178caa43022e42e6ca67245918ccb7dfeb/web3-react-native.podspec#L26) the following lines to your app's `ios/Podfile` then execute `pod install`:

```
# web3-react-native
pod 'secp256k1.swift', :modular_headers => true
pod 'Web3', :modular_headers => true
```

### Android
Perform a rebuild of your compiled application by calling `react-native run-android`.

For usage details, please see the [**documentation**](./docs).

## 🌠 Donations

If you want to help keep this project alive,  please consider making a donation of [**ETH**](https://ethereum.org/) to the following address:

<p align="center">
  <a href="https://github.com/cawfree/web3-react-native" alt="web3-react-native">
    <img src="./public/qr.png" width="128" height="128" />
  </a>
  <br />
  0x4b567985E550f004D3255C54083D90206BD14672
</p>

## ✌️ License
[**MIT**](./LICENSE)
