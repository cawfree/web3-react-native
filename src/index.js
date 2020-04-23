import { NativeModules } from 'react-native';
import { typeCheck } from 'type-check';

const { Web3: RNWeb3 } = NativeModules;

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

const sanitizeUrl = (url) => {
  if (typeCheck("String", url) && url.length > 0) {
    return url;
  }
  throw new Error(`Expected non-null, non-empty String, encountered ${url}.`);
};

const createWallet = ({ ...wallet }, url) => Object.freeze({
  ...wallet,
  sendFunds: (toAddress, amount, units) => RNWeb3
    .sendFunds(
      wallet,
      url,
      toAddress,
      amount,
      sanitizeUnits(units),
    ),
});

export const Web3 = url => Promise
  .resolve()
  // TODO: Could attempt to cache the associated HttpService here.
  .then(() => sanitizeUrl(url))
  .then(
    url => Object.freeze(
      {
        Wallet: Object.freeze({
          load: (k, p) => RNWeb3.loadWallet(
            sanitizeKeystore(k),
            sanitizePassword(p),
          )
            .then(wallet => createWallet(wallet, url)),
        })
      },
    ),
  );
