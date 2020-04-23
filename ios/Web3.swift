//
//  Web3.swift
//  Web3
//
//  Created by Alex Thomas on 23/04/2020.
//  Copyright © 2020 Facebook. All rights reserved.
//

import Foundation

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
        resolve("done");
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
        resolve("done2");
    }
}
