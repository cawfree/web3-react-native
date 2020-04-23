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
After installing, append the following lines to your app's `ios/Podfile`, then execute `pod install`:

```
# web3-react-native
pod 'secp256k1.c', '0.1.2', :modular_headers => true
pod 'web3swift', '2.2.1', :modular_headers => true
```

> This is a workaround for defintion constraints in the  [Podspec](https://github.com/cawfree/web3-react-native/blob/63664f366c436aed73083b6b0a5cbf0b7374bfd3/web3-react-native.podspec#L26).

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
