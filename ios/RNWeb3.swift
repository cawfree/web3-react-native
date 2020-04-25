//
//  RNWeb3.swift
//  RNWeb3
//
//  Created by Alex Thomas on 23/04/2020.
//  Copyright © 2020 Facebook. All rights reserved.
//

import Foundation
import web3swift

enum Web3Error: Error {
  case runtimeError(String)
}

@objc(RNWeb3)
class RNWeb3: NSObject {
  var creds : [String : EthereumKeystoreV3] = [:];
  @objc
  func loadWallet(
    _
    keystore: NSDictionary,
    password: NSString,
    resolve: RCTPromiseResolveBlock,
    reject: RCTPromiseRejectBlock
  ) -> Void {
    do {
      let data = try JSONSerialization.data(withJSONObject: keystore, options: []);
      let jsonStr = String(data: data, encoding: .ascii);
      let ks = EthereumKeystoreV3.init(jsonStr!);
      let address = ks?.getAddress()?.address;
      
      creds[address!] = ks;
      resolve(["address": address]);
    } catch {
      reject("E_KEYSTORE", "Failed to deserialize keystore.", error);
    }
  }
  
  @objc
  func sendFunds(
    _
    wallet: NSDictionary,
    url: NSString,
    toAddress: NSString,
    amount: NSString,
    units: NSString,
    resolve: RCTPromiseResolveBlock,
    reject: RCTPromiseRejectBlock
  ) -> Void {
    do {
      let address = (wallet["address"] as? String)!;
      let ks = creds[address];
      let w  = web3(provider: Web3HttpProvider(URL(string: url as String)!)!);
      let keystoreManager = KeystoreManager([ks!]);
      w.addKeystoreManager(keystoreManager);
      resolve(["transactionHash": "you got this far"]);
    } catch {
      reject("E_SENDFUNDS", "Failed to open wallet.", error);
    }
  }
    
  @objc
  static func requiresMainQueueSetup() -> Bool {
    return true
  }
  
}
