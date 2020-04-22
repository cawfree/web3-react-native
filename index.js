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

const sanitizeUnits = (units) => {
  if (units === "wei" || units === "WEI") {
    return "WEI";
  } else if (units === "kwei" || units === "KWEI") {
    return "KWEI";
  } else if (units === "mwei" || units === "MWEI") {
    return "MWEI";
  } else if (units === "gwei" || units === "GWEI") {
    return "GWEI";
  } else if (units === "szabo" || units === "SZABO") {
    return "SZABO";
  } else if (units === "finney" || units === "FINNEY") {
    return "FINNEY";
  } else if (units === "ether" || units === "ETHER") {
    return "ETHER";
  } else if (units === "kether" || units === "KETHER") {
    return "KETHER";
  } else if (units === "mether" || units === "METHER") {
    return "METHER";
  } else if (units === "gether" || units === "GETHER") {
    return "GETHER";
  }
  throw new Error(`Unsupported unit of eth, \"${units}\".`);
};

export const Wallet = Object.freeze({
  load: (k, p) => Web3.loadWallet(
    sanitizeKeystore(k),
    sanitizePassword(p),
  )
    .then(
      (wallet) => ({
        sendFunds: (url, toAddress, amount, units) => Web3
          .sendFunds(
            wallet,
            url,
            toAddress,
            amount,
            sanitizeUnits(units),
          ),
      }),
    ),
});
