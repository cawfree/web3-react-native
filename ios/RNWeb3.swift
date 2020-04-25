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

  func unitsFor(_ units: String) throws -> web3swift.Web3.Utils.Units {
    switch (units) {
        case "WEI": return Web3.Utils.Units.wei;
        case "KWEI": return Web3.Utils.Units.Kwei;
        case "MWEI": return Web3.Utils.Units.Mwei;
        case "GWEI": return Web3.Utils.Units.Gwei;
        case "FINNEY": return Web3.Utils.Units.Finney;
        case "ETHER": return Web3.Utils.Units.eth;
      default:
      throw Web3Error.runtimeError("some message");
    }
  }

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
      let ks : EthereumKeystoreV3 = EthereumKeystoreV3.init(jsonStr!)!;
      let address : String = ks.getAddress()!.address;
      
      creds[address] = ks;
      resolve(["address": address]);
    } catch {
      reject("E_KEYSTORE", "\(error)", error);
    }
  }

  @objc
  func createKeystore(
    _
    password: NSString,
    resolve: RCTPromiseResolveBlock,
    reject: RCTPromiseRejectBlock
  ) -> Void {
    do {
      let keystore = try! EthereumKeystoreV3(password: (password as String))!
      let data = try! keystore.serialize();
      let d2 = (try! JSONSerialization.jsonObject(with: data!));
      resolve(d2);
    } catch {
      reject("E_CREATEW", "\(error)", error);
    }
  } 
  
  @objc
  func sendFunds(
    _
    wallet: NSDictionary,
    url: NSString,
    password: NSString,
    toAddress: NSString,
    amount: NSString,
    units: NSString,
    resolve: RCTPromiseResolveBlock,
    reject: RCTPromiseRejectBlock
  ) -> Void {
    do {
      let address = (wallet["address"] as? String)!;
      
      let ks = creds[address];
      let w  = web3(provider: Web3HttpProvider(URL(string: (url as String))!)!);
      let keystoreManager = KeystoreManager([ks!]);
      w.addKeystoreManager(keystoreManager);
      
      let walletAddress = EthereumAddress(address)!;
      let at = EthereumAddress((toAddress as String));
      
      let contract = w.contract(Web3.Utils.coldWalletABI, at: at, abiVersion: 2);
      let value = try Web3.Utils.parseToBigUInt((amount as String), units: self.unitsFor(units as String));
      
      var options = TransactionOptions.defaultOptions;
      options.value = value;
      options.from = walletAddress;
      options.gasPrice = .automatic;
      options.gasLimit = .automatic;
        
      let tx = contract!.write("fallback", parameters: [AnyObject](), extraData: Data(), transactionOptions: options)!
        
      let res = try tx.send(password: (password as String));
        
      resolve(["transactionHash": res.hash]);
    } catch {
      reject("E_SENDFUNDS", "\(error)", error);
    }
  }
    
  @objc
  static func requiresMainQueueSetup() -> Bool {
    return true
  }
  
}
