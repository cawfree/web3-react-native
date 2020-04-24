//
//  Web3.swift
//  Web3
//
//  Created by Alex Thomas on 23/04/2020.
//  Copyright © 2020 Facebook. All rights reserved.
//

import Foundation
import web3swift

enum Web3Error: Error {
  case runtimeError(String)
}

@objc(Web3)
class Web3: NSObject {
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
      let wallet = ["address": ks?.getAddress()?.address];
      resolve(wallet);
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
//    guard let web3 = Web3(url: URL(string: url)!) else {
//      reject(Web3Error.runtimeError("Failed to load Web3."));
//      return;
//    }
//    return web3
    resolve("done2");
  }
    
  @objc
  static func requiresMainQueueSetup() -> Bool {
    return true
  }
  
}
