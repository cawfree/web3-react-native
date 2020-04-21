import { NativeModules } from 'react-native';
import { typeCheck } from 'type-check';

const { Web3 } = NativeModules;
const { init } = Web3;

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

export default (k, p) => init(
  sanitizeKeystore(k),
  sanitizePassword(p),
);
