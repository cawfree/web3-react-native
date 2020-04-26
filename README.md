<div align="center">
  <a href="https://github.com/cawfree/web3-react-native" alt="web3-react-native">
    <img src="./public/logo.png" width="320" height="226" />
  </a>
</div>

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

> ⚠️ This is an ugly workaround for existing definition constraints in the  [Podspec](https://github.com/cawfree/web3-react-native/blob/63664f366c436aed73083b6b0a5cbf0b7374bfd3/web3-react-native.podspec#L26). ([View Issue](https://github.com/cawfree/web3-react-native/issues/1)).

### Android
In your app's `AndroidManifest.xml`, [you need to](https://github.com/web3j/web3j/issues/915) enable [`android:largeHeap`](https://developer.android.com/guide/topics/manifest/application-element) under the `<application>` tag:

```diff
  <application
+   android:largeHeap="true"
  />
```

Perform a rebuild of your compiled application by calling `react-native run-android`.

For usage details, please see the [**documentation**](./docs).

## ✌️ License
[**MIT**](./LICENSE)
