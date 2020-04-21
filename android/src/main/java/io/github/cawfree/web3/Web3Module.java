package io.github.cawfree.web3;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;

import java.math.BigDecimal;

import org.web3j.crypto.Credentials;
import org.web3j.crypto.WalletUtils;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import org.web3j.protocol.http.HttpService;
import org.web3j.sample.contracts.generated.Greeter;
import org.web3j.tx.Transfer;
import org.web3j.tx.gas.ContractGasProvider;
import org.web3j.tx.gas.DefaultGasProvider;
import org.web3j.utils.Convert;
import org.web3j.utils.Numeric;

// Heavily influenced by (thanks guys!):
// https://github.com/web3j/sample-project-gradle/blob/master/src/main/java/org/web3j/sample/Application.java
public final class Web3Module extends ReactContextBaseJavaModule {

  /* Member Variables. */
  private final ReactApplicationContext mReactApplicationContext;
  private       Web3j                   mWeb3j;
  private       Credentials             mCredentials;

  /** Constructor */
  public Web3Module(final ReactApplicationContext pReactApplicationContext) {
    super(pReactApplicationContext);
    // Initialize Member Variables.
    this.mReactApplicationContext = pReactApplicationContext;
    this.mWeb3j                   = null;
    this.mCredentials             = null;
  }

  @Override
  public String getName() {
    return "Web3";
  }

  // XXX: Where to get wallet? Where to get password?
  @ReactMethod
  public final void create(final String pService, final String pPassword, final Promise pPromise) {
    // Ensure we're being passed a valid service, such as "https://rinkeby.infura.io/<your token>"
    if (pService != null && pService.length > 0) {
      this.setWeb3j(Web3j.build(new HttpService(pService)));
      // TODO: How to pass a wallet buffer? Where to get a wallet from? Anyone?!
      this.setCredentials(WalletUtils.loadCredentials(pPassword, "/path/to/<walletfile>"));
      // TODO: Can we return interesting properties, like the address of the wallet?
      pPromise.resolve(Arguments.createMap());
    } else {
      pPromise.reject(new Exception("Calls to create() expect a non-null, non empty service name."));
    }
  }

  // TODO: Validate parameters.
  @ReactMethod
  public final void sendFunds(final String pAddress, final String pAmount, final String pUnits, final Promise pPromise)  {
    try {
      this.throwIfMissingDependencies();
      // TODO: Verify this transaction value propagates through.
      final Transaction t = Transfer.sendFunds(this.getWeb3j(), this.getCredentials(), pAddress, new BigDecimal(pAmount), Convert.Unit.valueOf(pUnits));
      // TODO: Propagate useful information.
      // final String transactionHash = t.getTransactionHash();
      pPromise.resolve(Arguments.createMap());
    } catch (final Exception pException) {
      pPromise.reject(pException);
    }
  }

  @ReactMethod
  public final void destroy(final Promise pPromise) {
    try {
      this.throwIfMissingDependencies();
      this.setWeb3j(null);
      this.setCredentials(null);
      pPromise.resolve(Arguments.createMap());
    } catch (final Exception pException) {
      pPromise.reject(pException);
    }
  }

  /** Throws an Exception if the Service has not been configured. */
  private final void throwIfMissingDependencies() {
    if (this.getWeb3j() == null || this.getCredentials() == null) {
      throw new IllegalStateException("You must call create() before attempting to interact with a service.");
    }
  }

  /* Getters and Setters */
  private final void setWeb3j(final Web3j pWeb3j) {
    this.mWeb3j = pWeb3j;
  }

  private final Web3j getWeb3j() {
    return this.mWeb3j;
  }

  private final void setCredentials(final Credentials pCredentials) {
    this.mCredentials = pCredentials;
  }

  private final Credentials getCredentials() {
    return this.mCredentials;
  }

  //@ReactMethod
  //public void sampleMethod(String stringArgument, int numberArgument, Callback callback) {
  //    // TODO: Implement some actually useful functionality
  //    callback.invoke("Received numberArgument: " + numberArgument + " stringArgument: " + stringArgument);
  //}
}
