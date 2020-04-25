#import "React/RCTBridgeModule.h"

@interface RCT_EXTERN_REMAP_MODULE(Web3, RNWeb3, NSObject)

RCT_EXTERN_METHOD(
  loadWallet: (NSDictionary)keystore
  password: (NSString)password
  resolve: (RCTPromiseResolveBlock)resolve
  reject: (RCTPromiseRejectBlock)reject
)

RCT_EXTERN_METHOD(
  sendFunds: (NSDictionary)wallet
  url: (NSString)url
  toAddress: (NSString)toAddress
  amount: (NSString)amount
  units: (NSString)units
  resolve: (RCTPromiseResolveBlock)resolve
  reject: (RCTPromiseRejectBlock)reject
)
  
@end
