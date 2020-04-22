import { NativeModules } from 'react-native';
import { typeCheck } from 'type-check';

const { Web3 } = NativeModules;

const sanitizeKeystore = (k) => {
  if (typeCheck("Object", k)) {
    return k;
  } else if (typeCheck("String", k)) {
    return JSON.parse(k);
  }
  throw new Error(`Expected Object|String keystore, encountered ${keystore}.`);
};

const sanitizePassword = (p) => {
  if (typeCheck("String", p) && p.length > 0) {
    return p;
  }
  throw new Error(`Expected non-null non-empty String password, encountered ${typeof p}.`);
};

export const Wallet = Object.freeze({
  load: (k, p) => Web3.loadWallet(
    sanitizeKeystore(k),
    sanitizePassword(p),
  ),
});
