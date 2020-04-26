import { NativeModules, Platform } from 'react-native';
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

const ethUnits = Object.freeze(
  {
    wei: 'WEI',
    kwei: 'KWEI',
    mwei: 'MWEI',
    gwei: 'GWEI',
    finney: 'FINNEY',
    eth: 'ETHER',
  },
);

const sanitizeUnits = (units) => {
  const { [units]: u } = ethUnits;
  if (typeCheck("String", u)) {
    return u;
  }
  throw new Error(`Unsupported unit of eth, \"${units}\".`);
};

const sanitizeUrl = (url) => {
  if (typeCheck("String", url) && url.length > 0) {
    return url;
  }
  throw new Error(`Expected non-null, non-empty String, encountered ${url}.`);
};

const createWallet = ({ ...wallet }, url, password) => Object.freeze({
  ...wallet,
  sendFunds: (toAddress, amount, units) => RNWeb3
    .sendFunds(
      wallet,
      url,
      password,
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
        Keystore: Object.freeze({
          create: (p) => Promise
            .resolve([sanitizePassword(p)])
            .then(
              ([p]) => RNWeb3.createKeystore(
                p,
              ),
            ),
        }),
        Wallet: Object.freeze({
          load: (k, p) => Promise
            .resolve([sanitizeKeystore(k), sanitizePassword(p)])
            .then(
              ([k, p]) => RNWeb3.loadWallet(
                k,
                p,
              )
              .then(wallet => createWallet(wallet, url, p)),
            ),
        })
      },
    ),
  );
